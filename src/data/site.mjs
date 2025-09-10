/** @typedef {import('@lib/links').Link} Link */

/**
 * @typedef {Object} SiteConfig
 * @property {string} SiteConfig.title
 * @property {string} SiteConfig.description
 * @property {URL} SiteConfig.domain
 * @property {string} [SiteConfig.ogImage]
 * @property {string} [SiteConfig.favicon]
 */

/** @type {SiteConfig} */
export const SITE = {
  title: 'Horse Radish',
  // description: 'Brooklyn folk rock group',
  description: 'New album: Stimulus Response',
  domain: new URL('https://example.com'),
  ogImage: undefined,
  favicon: '/favicon.svg',
}

/** @type {(string | URL)[]} */
export const SOCIALS = []
