// The load-bearing, highest-risk module: applies LLM-drafted edits to the
// typed src/data/projects.ts WITHOUT corrupting it. Strategy: the LLM only
// ever returns a field-level patch of WHITELISTED fields; a deterministic,
// string-/comment-aware applier splices in just those values. Protected fields
// (slug/order/featured/colorTheme/title/category/media/links.github) are never
// in the patch and never located, so they cannot change by construction — and
// we re-verify that with a parse-based guard after every edit.

// --- Field policy ---

/** Fields the LLM may change. `links.live` is a virtual key → sets `links` to `{ live }`. */
export const EDITABLE = new Set([
  'tagline',
  'description',
  'longDescription',
  'role',
  'year',
  'location',
  'tech',
  'highlights',
  'status',
  'links.live',
])

/** Fields that must never change; re-checked post-edit. */
const PROTECTED = ['slug', 'order', 'featured', 'colorTheme', 'title', 'category']

const STATUS_VALUES = new Set([
  'live',
  'in-development',
  'mvp',
  'client',
  'concept',
  'pre-launch',
  'prototype',
  'archived',
])

const COLOR_THEMES = ['phoenix', 'lotus', 'pool', 'ember', 'aurora', 'magenta']

// --- Low-level string-/comment-aware brace matcher ---

/**
 * Given the index of an opening `{` or `[` in `src`, return the index of its
 * matching close, skipping over strings and comments.
 */
export function scanMatching(src, openIndex) {
  const open = src[openIndex]
  const close = open === '{' ? '}' : ']'
  let depth = 0
  let i = openIndex
  let state = 'code' // 'code' | 'sq' | 'dq' | 'tpl' | 'line' | 'block'
  for (; i < src.length; i++) {
    const c = src[i]
    const n = src[i + 1]
    if (state === 'code') {
      if (c === "'") state = 'sq'
      else if (c === '"') state = 'dq'
      else if (c === '`') state = 'tpl'
      else if (c === '/' && n === '/') state = 'line'
      else if (c === '/' && n === '*') state = 'block'
      else if (c === '{' || c === '[' || c === '(') {
        if (c === open) depth++
      } else if (c === '}' || c === ']' || c === ')') {
        if (c === close) {
          depth--
          if (depth === 0) return i
        }
      }
    } else if (state === 'sq') {
      if (c === '\\') i++
      else if (c === "'") state = 'code'
    } else if (state === 'dq') {
      if (c === '\\') i++
      else if (c === '"') state = 'code'
    } else if (state === 'tpl') {
      if (c === '\\') i++
      else if (c === '`') state = 'code'
    } else if (state === 'line') {
      if (c === '\n') state = 'code'
    } else if (state === 'block') {
      if (c === '*' && n === '/') {
        i++
        state = 'code'
      }
    }
  }
  throw new Error('scanMatching: no matching close bracket found')
}

/** Locate `export const projects: Project[] = [ ... ]` → { start:'[' index, end:']' index }. */
export function locateProjectsArray(src) {
  const m = /export\s+const\s+projects\s*:\s*Project\[\]\s*=\s*\[/.exec(src)
  if (!m) throw new Error('could not find `export const projects: Project[] = [`')
  const bracket = src.indexOf('[', m.index + m[0].length - 1)
  const end = scanMatching(src, bracket)
  return { start: bracket, end }
}

/** Locate a single project object by slug → { start:'{' index, end:'}' index }. */
export function locateEntry(src, slug) {
  const arr = locateProjectsArray(src)
  const esc = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`\\bslug:\\s*(['"])${esc}\\1`, 'g')
  re.lastIndex = arr.start
  const m = re.exec(src)
  if (!m || m.index > arr.end) throw new Error(`slug '${slug}' not found in projects array`)
  // Scan backward to this object's opening brace (slug is its first field).
  let braceStart = m.index
  while (braceStart > arr.start && src[braceStart] !== '{') braceStart--
  if (src[braceStart] !== '{') throw new Error(`opening brace for '${slug}' not found`)
  const end = scanMatching(src, braceStart)
  return { start: braceStart, end }
}

/**
 * Parse the TOP-LEVEL fields of an object-literal text (from `{` to `}`).
 * Returns [{ key, keyStart, valueStart, valueEnd, indent }] where valueEnd is
 * the index of the terminating comma or the closing brace (exclusive of value).
 */
export function parseTopLevel(objText) {
  const fields = []
  let depth = 0
  let state = 'code'
  let expectKey = false
  let current = null
  for (let i = 0; i < objText.length; i++) {
    const c = objText[i]
    const n = objText[i + 1]
    if (state === 'code') {
      if (c === "'") {
        state = 'sq'
        continue
      }
      if (c === '"') {
        state = 'dq'
        continue
      }
      if (c === '`') {
        state = 'tpl'
        continue
      }
      if (c === '/' && n === '/') {
        state = 'line'
        continue
      }
      if (c === '/' && n === '*') {
        state = 'block'
        continue
      }
      if (c === '{' || c === '[' || c === '(') {
        depth++
        if (depth === 1 && c === '{') expectKey = true
        continue
      }
      if (c === '}' || c === ']' || c === ')') {
        if (depth === 1 && c === '}') {
          if (current) {
            current.valueEnd = i
            fields.push(current)
            current = null
          }
          depth--
          break
        }
        depth--
        continue
      }
      if (depth === 1) {
        if (expectKey) {
          if (/\s/.test(c) || c === ',') continue
          // start of a key identifier
          const km = /^[A-Za-z0-9_$]+/.exec(objText.slice(i))
          if (!km) continue
          const key = km[0]
          let j = i + key.length
          while (/\s/.test(objText[j])) j++
          if (objText[j] !== ':') {
            // not actually a key; skip
            i = j
            continue
          }
          j++ // past colon
          while (/\s/.test(objText[j])) j++
          const indent = lineIndent(objText, i)
          current = { key, keyStart: i, valueStart: j, valueEnd: -1, indent }
          expectKey = false
          i = j - 1
          continue
        }
        if (c === ',') {
          if (current) {
            current.valueEnd = i
            fields.push(current)
            current = null
          }
          expectKey = true
          continue
        }
      }
    } else if (state === 'sq') {
      if (c === '\\') i++
      else if (c === "'") state = 'code'
    } else if (state === 'dq') {
      if (c === '\\') i++
      else if (c === '"') state = 'code'
    } else if (state === 'tpl') {
      if (c === '\\') i++
      else if (c === '`') state = 'code'
    } else if (state === 'line') {
      if (c === '\n') state = 'code'
    } else if (state === 'block') {
      if (c === '*' && n === '/') {
        i++
        state = 'code'
      }
    }
  }
  return fields
}

function lineIndent(text, idx) {
  let s = idx
  while (s > 0 && text[s - 1] !== '\n') s--
  let n = 0
  while (text[s + n] === ' ') n++
  return ' '.repeat(n)
}

// --- Serialization ---

function serializeString(value) {
  // JSON double-quoted: always valid TS, immune to the file's smart-quote/apostrophe content.
  return JSON.stringify(String(value))
}

function serializeStringArray(value, fieldIndent) {
  if (!Array.isArray(value) || value.length === 0) return '[]'
  const itemIndent = fieldIndent + '  '
  const items = value.map((v) => `${itemIndent}${serializeString(v)},`).join('\n')
  return `[\n${items}\n${fieldIndent}]`
}

/** Serialize a single whitelisted field's VALUE (right-hand side only). */
function serializeFieldValue(field, value, fieldIndent) {
  switch (field) {
    case 'tagline':
    case 'description':
    case 'role':
    case 'year':
    case 'location':
    case 'status':
      return serializeString(value)
    case 'longDescription':
    case 'tech':
    case 'highlights':
      return serializeStringArray(value, fieldIndent)
    case 'links':
      // only ever { live } — github is never written
      return value?.live ? `{ live: ${serializeString(value.live)} }` : '{}'
    default:
      throw new Error(`serializeFieldValue: unsupported field '${field}'`)
  }
}

// --- Validation ---

function validatePatch(edits) {
  for (const key of Object.keys(edits)) {
    if (!EDITABLE.has(key)) {
      throw new Error(`patch contains non-editable field '${key}' (rejected)`)
    }
  }
  if ('status' in edits && !STATUS_VALUES.has(edits.status)) {
    throw new Error(`invalid status '${edits.status}'`)
  }
  if ('links.live' in edits) {
    const url = edits['links.live']
    if (typeof url !== 'string' || !/^https?:\/\//.test(url)) {
      throw new Error(`links.live must be an http(s) URL, got '${url}'`)
    }
  }
  for (const arrField of ['longDescription', 'tech', 'highlights']) {
    if (arrField in edits) {
      const v = edits[arrField]
      if (!Array.isArray(v) || !v.every((x) => typeof x === 'string')) {
        throw new Error(`${arrField} must be an array of strings`)
      }
    }
  }
  for (const strField of ['tagline', 'description', 'role', 'year', 'location']) {
    if (strField in edits && typeof edits[strField] !== 'string') {
      throw new Error(`${strField} must be a string`)
    }
  }
}

/** Evaluate an object-literal text into a real object (trusted, in-repo source). */
export function evalObjectLiteral(objText) {
  // eslint-disable-next-line no-new-func
  return new Function(`return (${objText})`)()
}

// --- Applying a patch to one entry ---

/**
 * Apply `edits` to the entry `slug` inside `src`. Returns the new source string.
 * Throws (leaving nothing partially written — caller writes the return value)
 * if the patch is invalid or a protected field would change.
 */
export function applyPatch(src, slug, edits) {
  validatePatch(edits)

  const { start, end } = locateEntry(src, slug)
  const before = evalObjectLiteral(src.slice(start, end + 1))

  // Turn the flat patch into concrete top-level field writes.
  // 'links.live' collapses onto the top-level `links` field.
  const writes = {}
  for (const [key, value] of Object.entries(edits)) {
    if (key === 'links.live') writes.links = { live: value }
    else writes[key] = value
  }

  let objText = src.slice(start, end + 1)
  for (const [field, value] of Object.entries(writes)) {
    objText = writeField(objText, field, value)
  }

  const after = evalObjectLiteral(objText)
  assertProtectedUnchanged(before, after, slug)

  return src.slice(0, start) + objText + src.slice(end + 1)
}

/** Replace (or insert) a single top-level field in an object-literal text. */
function writeField(objText, field, value) {
  const fields = parseTopLevel(objText)
  const existing = fields.find((f) => f.key === field)
  const fieldIndent = (existing || fields[0])?.indent ?? '    '
  const literal = serializeFieldValue(field, value, fieldIndent)

  if (existing) {
    return objText.slice(0, existing.valueStart) + literal + objText.slice(existing.valueEnd)
  }
  // Insert an absent optional field (e.g. `location`) right after `slug`.
  const anchor = fields.find((f) => f.key === 'slug') || fields[0]
  const insertAt = anchor.valueEnd + 1 // just past the anchor's trailing comma
  const insertion = `\n${fieldIndent}${field}: ${literal},`
  return objText.slice(0, insertAt) + insertion + objText.slice(insertAt)
}

function assertProtectedUnchanged(before, after, slug) {
  for (const f of PROTECTED) {
    if (JSON.stringify(before[f]) !== JSON.stringify(after[f])) {
      throw new Error(`protected field '${f}' changed on '${slug}' — aborting edit`)
    }
  }
  // github link must never appear
  if (after.links && 'github' in after.links) {
    throw new Error(`links.github must never be set (on '${slug}')`)
  }
  // media untouched
  if (JSON.stringify(before.media) !== JSON.stringify(after.media)) {
    throw new Error(`media changed on '${slug}' via patch path — aborting`)
  }
}

// --- Appending a brand-new entry (new-repo detection) ---

/**
 * Append a new project entry. The applier owns all identity/curation fields;
 * `text` supplies only descriptive fields drafted by the LLM.
 * @param {string} src
 * @param {object} text - { title, tagline, description, longDescription, role, year, location?, tech, highlights, status, category? }
 */
export function appendEntry(src, { slug, text }) {
  const arr = locateProjectsArray(src)
  const existing = evalAllEntries(src)
  const maxOrder = existing.reduce((m, e) => Math.max(m, e.order || 0), 0)
  const usedThemes = new Set(existing.map((e) => e.colorTheme))
  const colorTheme = COLOR_THEMES.find((t) => !usedThemes.has(t)) || 'aurora'

  const status = STATUS_VALUES.has(text.status) ? text.status : 'concept'
  const category = Array.isArray(text.category) && text.category.length ? text.category : ['app']

  const fi = '    ' // field indent (4 spaces)
  const lines = []
  lines.push('  {')
  lines.push(`${fi}slug: ${serializeString(slug)},`)
  lines.push(`${fi}title: ${serializeString(text.title || slug)},`)
  lines.push(`${fi}featured: false,`)
  lines.push(`${fi}order: ${maxOrder + 1},`)
  lines.push(`${fi}tagline: ${serializeString(text.tagline || '')},`)
  lines.push(`${fi}description: ${serializeString(text.description || '')},`)
  lines.push(`${fi}longDescription: ${serializeStringArray(text.longDescription || [], fi)},`)
  lines.push(`${fi}role: ${serializeString(text.role || 'Solo full-stack engineer')},`)
  lines.push(`${fi}year: ${serializeString(text.year || String(new Date().getFullYear()))},`)
  if (text.location) lines.push(`${fi}location: ${serializeString(text.location)},`)
  lines.push(`${fi}tech: ${serializeStringArray(text.tech || [], fi)},`)
  lines.push(`${fi}highlights: ${serializeStringArray(text.highlights || [], fi)},`)
  lines.push(`${fi}status: ${serializeString(status)},`)
  lines.push(`${fi}category: [${category.map(serializeString).join(', ')}],`)
  lines.push(`${fi}links: {},`)
  lines.push(`${fi}colorTheme: ${serializeString(colorTheme)},`)
  lines.push(
    `${fi}media: [{ type: 'fallback', alt: ${serializeString((text.title || slug) + ' preview')}, frame: 'browser', aspect: '16/10' }],`,
  )
  lines.push('  },')
  const entryText = lines.join('\n') + '\n'

  const newSrc = src.slice(0, arr.end) + entryText + src.slice(arr.end)
  // Validate the appended entry parses.
  const { start, end } = locateEntry(newSrc, slug)
  evalObjectLiteral(newSrc.slice(start, end + 1))
  return newSrc
}

/** Parse every entry object in the projects array into real objects. */
export function evalAllEntries(src) {
  const arr = locateProjectsArray(src)
  const arrText = src.slice(arr.start, arr.end + 1)
  return evalObjectLiteral(arrText)
}

/** Read one entry's current object (for feeding the LLM its existing copy). */
export function readEntry(src, slug) {
  const { start, end } = locateEntry(src, slug)
  return { text: src.slice(start, end + 1), obj: evalObjectLiteral(src.slice(start, end + 1)) }
}

// --- Deterministic media edit (screenshot refresh, NOT LLM-driven) ---

function serializeMediaArray(entries, fieldIndent) {
  const ii = fieldIndent + '  '
  const iii = ii + '  '
  const objs = entries
    .map((e) => {
      const parts = [`${iii}type: ${serializeString(e.type)},`]
      if (e.src) parts.push(`${iii}src: ${serializeString(e.src)},`)
      parts.push(`${iii}alt: ${serializeString(e.alt)},`)
      parts.push(`${iii}frame: ${serializeString(e.frame)},`)
      if (e.aspect) parts.push(`${iii}aspect: ${serializeString(e.aspect)},`)
      if (e.url) parts.push(`${iii}url: ${serializeString(e.url)},`)
      return `${ii}{\n${parts.join('\n')}\n${ii}},`
    })
    .join('\n')
  return `[\n${objs}\n${fieldIndent}]`
}

/**
 * Flip a project's first media entry to a real screenshot (or overwrite its
 * src). Deterministic and applier-owned — never part of an LLM patch.
 * Returns the new source, unchanged if it already points at `srcPath`.
 */
export function flipMediaToScreenshot(src, slug, { srcPath, url }) {
  const { start, end } = locateEntry(src, slug)
  let objText = src.slice(start, end + 1)
  const obj = evalObjectLiteral(objText)
  const m0 = obj.media?.[0] || { alt: `${obj.title} preview`, frame: 'browser', aspect: '16/10' }

  if (m0.type === 'screenshot' && m0.src === srcPath) return src // file overwritten, no code change

  const entry = {
    type: 'screenshot',
    src: srcPath,
    alt: m0.alt || `${obj.title} preview`,
    frame: m0.frame || 'browser',
    aspect: m0.aspect || '16/10',
    url: url || m0.url || undefined,
  }
  const fields = parseTopLevel(objText)
  const mediaField = fields.find((f) => f.key === 'media')
  if (!mediaField) throw new Error(`no media field on '${slug}'`)
  const literal = serializeMediaArray([entry], mediaField.indent)
  objText = objText.slice(0, mediaField.valueStart) + literal + objText.slice(mediaField.valueEnd)

  // Guard: only media may have changed here.
  const after = evalObjectLiteral(objText)
  for (const f of PROTECTED) {
    if (JSON.stringify(obj[f]) !== JSON.stringify(after[f])) {
      throw new Error(`flipMedia unexpectedly changed protected '${f}' on '${slug}'`)
    }
  }
  return src.slice(0, start) + objText + src.slice(end + 1)
}
