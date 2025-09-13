/* eslint-disable no-duplicate-imports, @typescript-eslint/no-duplicate-imports */

import { faEnvelope } from '@fortawesome/pro-regular-svg-icons/faEnvelope'
import { faPhone } from '@fortawesome/pro-regular-svg-icons/faPhone'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faTiktok } from '@fortawesome/free-brands-svg-icons/faTiktok'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube'
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify'
import { faBandcamp } from '@fortawesome/free-brands-svg-icons/faBandcamp'
import { faItunes } from '@fortawesome/free-brands-svg-icons/faItunes'

import { Icon } from '@lib/icons'

const icons = {
  email: new Icon({ name: 'Email', url: 'mailto:', icons: faEnvelope }),
  phone: new Icon({ name: 'Phone', url: 'tel:', icons: faPhone }),
  twitter: new Icon({
    name: 'Twitter',
    url: 'https://twitter.com',
    icons: faTwitter,
  }),
  linkedin: new Icon({
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
    icons: faLinkedin,
  }),
  instagram: new Icon({
    name: 'Instagram',
    url: 'https://www.instagram.com/',
    icons: faInstagram,
  }),
  tiktok: new Icon({
    name: 'TikTok',
    url: 'https://www.tiktok.com/',
    icons: faTiktok,
  }),
  facebook: new Icon({
    name: 'Facebook',
    url: 'https://www.facebook.com/',
    icons: faFacebook,
  }),
  youtube: new Icon({
    name: 'YouTube',
    url: 'https://www.youtube.com/',
    icons: faYoutube,
  }),
  spotify: new Icon({
    name: 'Spotify',
    url: 'https://open.spotify.com/',
    icons: faSpotify,
  }),
  bandcamp: new Icon({
    name: 'Bandcamp',
    url: 'https://bandcamp.com/',
    urlMatch: (url, iconUrl) => url.hostname.endsWith(`.${iconUrl.hostname}`),
    icons: faBandcamp,
  }),
  itunes: new Icon({
    name: 'Apple Music',
    url: 'https://music.apple.com/',
    icons: faItunes,
  }),
} as const

export default icons

export type IconKey = keyof typeof icons
export const isIconKey = (str: string): str is IconKey => str in icons
export const getIconFromUrl: typeof Icon.getIconFromUrl = (...args) =>
  Icon.getIconFromUrl(...args)
