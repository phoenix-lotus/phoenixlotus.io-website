export interface Skill {
  name: string
  plain: string
}

export interface SkillGroup {
  title: string
  theme: 'phoenix' | 'lotus' | 'pool' | 'ember' | 'magenta'
  skills: Skill[]
}

// Every `plain` line is capability-framed on purpose: what the tool does, never
// a claim about what this studio has already run in production for someone.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    theme: 'phoenix',
    skills: [
      {
        name: 'React 18 / 19',
        plain: 'Builds the interactive parts of a page. When a visitor picks a date or moves to the next form step, that piece changes without the whole page reloading.',
      },
      {
        name: 'TypeScript',
        plain: 'A stricter version of the site’s code language. Misspell a field or use the wrong kind of value and it shows up while the code is written, not after the site is live.',
      },
      {
        name: 'Vite',
        plain: 'The build step that turns the site’s code into the files a browser downloads. It trims and splits them so a visitor’s phone pulls down less on the first visit.',
      },
      {
        name: 'Tailwind CSS',
        plain: 'Handles the site’s look: spacing, color, lettering, and layout. The styling sits next to the piece it applies to, and the build sends only the classes a page uses.',
      },
      {
        name: 'Framer Motion',
        plain: 'Motion on a page. A menu opening, a section fading in on scroll, or the change from one page to the next gets a defined animation instead of a hard jump.',
      },
      {
        name: 'Zustand',
        plain: 'Holds what a visitor has in progress and shares it across the site. Dates picked or items added to a cart are still there on the next page during that visit.',
      },
      {
        name: 'React Router',
        plain: 'Every section gets its own web address a visitor can bookmark or send to someone. Moving from one to the next loads the new page without a full reload.',
      },
      {
        name: 'PWA',
        plain: 'Short for progressive web app. The site can be saved to a phone’s home screen, and pages already stored on the phone still open when the signal drops.',
      },
    ],
  },
  {
    title: 'Backend & Data',
    theme: 'pool',
    skills: [
      {
        name: 'Node.js',
        plain: 'Runs a site’s code on a server instead of on a visitor’s phone or laptop. It’s how a form reaches your inbox or a page checks what’s still available.',
      },
      {
        name: 'Netlify Functions',
        plain: 'When someone sends a contact form, a small piece of server code runs for that moment and then stops. Nothing sits running around the clock for you to keep updated.',
      },
      {
        name: 'Supabase',
        plain: 'Stores the live information behind a site, such as bookings or current inventory. Logins and file uploads come with it, and there’s no database server to run yourself.',
      },
      {
        name: 'PostgreSQL / PL/pgSQL',
        plain: 'PostgreSQL is the database that holds your records, and a multi-step change either finishes completely or not at all. Rules written in PL/pgSQL run inside it.',
      },
      {
        name: 'Stripe',
        plain: 'Takes card payments and pays out to your bank account. The card fields on the page are Stripe’s own, so the number goes to Stripe rather than through your site.',
      },
      {
        name: 'REST APIs',
        plain: 'A common way for two systems to trade information over the web. A booking calendar can show up on your site, and an order can land in software you already use.',
      },
      {
        name: 'Auth & RLS',
        plain: 'Accounts and login, plus rules on the records about who can read or change what. The database enforces them itself (row-level security), not only the page a visitor loads.',
      },
    ],
  },
  {
    title: 'AI Engineering',
    theme: 'magenta',
    skills: [
      {
        name: 'Anthropic Claude',
        plain: 'The AI model behind a site’s assistant. A visitor asks a question in plain language, and the model is given your own information to answer from.',
      },
      {
        name: 'Vision extraction',
        plain: 'A photo or a scanned page goes to an AI model and comes back as text in labeled fields. A picture of an invoice turns into line items and totals you can search.',
      },
      {
        name: 'Tiered model routing',
        plain: 'Smaller AI models cost less to run. Routine requests go to a smaller one, and the larger model is saved for work that needs it.',
      },
      {
        name: 'Eval harnesses',
        plain: 'Test questions with answers already known to be right. Change the AI’s instructions and the new answers get scored against them, so a drop in quality shows up early.',
      },
      {
        name: 'Prompt design',
        plain: 'The standing instructions a model is given on every request. They set the wording it uses and tell it when to hand a question to a person instead of guessing.',
      },
      {
        name: 'AI product design',
        plain: 'Before any code gets written, deciding where an AI feature earns its place on a site and where a plain form or a phone number serves the visitor better.',
      },
    ],
  },
  {
    title: 'Mobile & Native',
    theme: 'ember',
    skills: [
      {
        name: 'Capacitor (iOS + Android)',
        plain: 'Packages the site’s own code into an iPhone and Android app people can install. One set of code covers the website and both phone apps.',
      },
      {
        name: 'ML Kit',
        plain: 'Google’s toolkit for reading a barcode or pulling text out of a photo. The reading happens on the phone itself, so it works with no signal and the photo stays there.',
      },
      {
        name: 'OneSignal push',
        plain: 'Sends push notifications to a phone’s lock screen, such as a booking reminder or an order update. A customer has to allow them first, and can switch them off later.',
      },
      {
        name: 'Offline-first',
        plain: 'Work keeps going when there’s no signal. Anything entered while offline is stored on the phone and syncs once the connection comes back.',
      },
      {
        name: 'App Store builds',
        plain: 'The app gets packaged and submitted to Apple and Google for review. Once it clears, people can find and install it from the App Store and Play Store.',
      },
    ],
  },
  {
    title: 'Craft',
    theme: 'lotus',
    skills: [
      {
        name: 'Accessibility (WCAG)',
        plain: 'Someone using a screen reader or navigating by keyboard alone can still get through the site. WCAG is the published standard that spells out what that takes.',
      },
      {
        name: 'SEO & JSON-LD',
        plain: 'Getting found in search. JSON-LD is a labeled listing of your hours, address, and services, written into the page in a form search engines read directly.',
      },
      {
        name: 'Playwright',
        plain: 'Automated tests that open the site in a real browser and click through it. A booking form or a contact page can be walked through by machine before a change goes live.',
      },
      {
        name: 'Leaflet maps',
        plain: 'Puts a map on your contact page without embedding Google Maps. The mapping code is free and open source, and the map images come from a provider you choose.',
      },
      {
        name: 'Performance',
        plain: 'How quickly the page comes up on a phone with one bar of service. Images get sized for the screen they land on, and code a page doesn’t need isn’t sent with it.',
      },
      {
        name: 'Design systems',
        plain: 'One written-down set of colors, lettering, buttons, and page pieces that every page draws from. Add a page a year from now and it still matches the rest of the site.',
      },
    ],
  },
]

export const facts = [
  // Four checkable numbers, and nothing else. "shipped" once stood where
  // "built" does now: it overstated every entry's actual status (see
  // projects.ts — mvp/prototype/in-development/pre-launch/archived, not
  // one launched and currently live) and had already been corrected once for
  // exactly this class of error (commit 62b562f, re: DrafTech — since
  // removed from the shelf; the lesson predates and outlives the tile).
  // "Built" is true of all 6 regardless of stage, so it doesn't need
  // re-verifying as each project moves. The count tracks projects.ts and
  // must be recounted whenever the shelf changes — it went 9 -> 6 on
  // 2026-08-28 when Inkloom, Typewriter, and GigaPet came off.
  //
  // 2020 is the first PAID client work — Evan Fowler and Sarai, under the
  // earlier PhoenixLotus Media name, git-dated 2020-11 in
  // ~/Code/DevOps/PhoenixLotusMedia/clients/. It is NOT a founding year and
  // must never be rendered as one; there is no founding year on record.
  // Labels attribute these to Robert BY NAME since 2026-08-20: the About
  // section now speaks as the studio, and under studio voice unattributed
  // tiles read as studio milestones — implying a founding date, which is
  // exactly what the note above forbids.
  { value: '2019', label: "Robert's first site built" },
  { value: '2020', label: "Robert's first paying clients" },
  { value: '6', label: 'projects Robert built' },
  { value: 'Family', label: 'owned & operated' },
]
