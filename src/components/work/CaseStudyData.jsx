export const caseStudies = [
  {
    id: 'somany',
    name: 'Somany Ceramics',
    role: 'Full-Stack Developer',
    stack: ['Laravel', 'Vue.js', 'MySQL', 'AWS'],
    problem:
      'Somany needed a scalable web platform to manage a large industrial product catalogue and investor-relations content, without every new product line requiring a code change.',
    contributions: [
      'Built a Product Information Management (PIM) module driven entirely by dynamic attribute groups, so new product lines and specs can be added without touching code.',
      'Designed responsive product listing and detail pages with 3D previews, image sliders and variant selectors for the Construction Chemicals range.',
      'Implemented an Investor Relations portal with structured governance-report routing and document management.',
      'Added session-persisted pagination and filtering so users keep their place while browsing a large catalogue.',
    ],
    impact: [
      'Cut time-to-publish for new product lines by removing hardcoded attribute logic.',
      'Modernized the mobile product-browsing experience across the storefront.',
    ],
    link: 'https://www.somanyceramics.com/',
    linkLabel: 'View site',
  },
  {
    id: 'jurix',
    name: 'Jurix Legal Apps',
    role: 'Flutter Developer',
    stack: ['Flutter', 'Riverpod', 'Speech-to-Text'],
    problem:
      'Jurix needed a suite of mobile apps to help users log safety concerns through guided, voice-assisted flows, working reliably across multiple locales.',
    contributions: [
      'Built a voice-consent flow that listens for specific spoken phrases before allowing sensitive actions to proceed.',
      'Fixed cross-locale crashes so the apps work reliably for non-English speaking users.',
      'Resolved Android audio-focus conflicts between speech recognition and audio recording running together.',
      'Implemented onboarding flows shared across a multi-app monorepo with a consistent design system.',
    ],
    impact: [
      'Shipped accessible, voice-guided safety features across a five-app monorepo.',
      'Reduced locale-related crash reports through defensive localization fixes.',
    ],
    link: 'https://play.google.com/store/apps/details?id=com.jurix.jurix_mobile&hl=en_IN',
    linkLabel: 'View on Play Store',
  },
  {
    id: 'aptronix',
    name: 'Aptronix India',
    role: 'Shopify & Hydrogen Developer',
    stack: ['Shopify Liquid', 'Hydrogen', 'Remix', 'Node.js'],
    problem:
      'Aptronix needed a modern storefront plus a custom event-registration flow with no off-the-shelf Shopify app fitting the requirement.',
    contributions: [
      'Built a custom event registration form using Hydrogen/Remix API routes talking directly to the Shopify Admin API.',
      'Solved cross-origin request handling and admin-token authentication for the custom submission endpoint.',
      'Built schema-driven banner sections so store admins can update homepage promos without a developer.',
    ],
    impact: [
      'Delivered a fully custom registration flow beyond stock Shopify capabilities.',
      'Gave store admins self-serve control over homepage content.',
    ],
    link: 'https://www.aptronixindia.com/',
    linkLabel: 'View site',
  },
];
