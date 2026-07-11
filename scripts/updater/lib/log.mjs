// Tiny leveled logger. Everything goes to stderr except explicit report
// output, so `npm run updater:check` can be piped without noise interleaving.

const useColor = process.stderr.isTTY && !process.env.NO_COLOR
const c = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s)

export const log = {
  info: (...a) => console.error(c('36', 'ℹ'), ...a),
  step: (...a) => console.error(c('35', '▸'), ...a),
  ok: (...a) => console.error(c('32', '✔'), ...a),
  warn: (...a) => console.error(c('33', '!'), ...a),
  error: (...a) => console.error(c('31', '✖'), ...a),
  dim: (s) => c('2', s),
}

/** Print to stdout (the actual report / machine-facing output). */
export const out = (...a) => console.log(...a)
