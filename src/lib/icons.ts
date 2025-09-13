import type { IconDefinition as FaIconDefinition } from '@fortawesome/fontawesome-common-types'
import type { IconifyIcon } from '@iconify/types'
import { toUrl } from '@lib/utils'

export type IconDefinition = FaIconDefinition | IconifyIcon

type IconDict = { default: IconDefinition } & Record<string, IconDefinition>

type IconUrlMatch = (url: URL, iconUrl: URL) => boolean

interface IconOpts {
  name: string
  url?: string | URL
  icons: IconDefinition | IconDict
  urlMatch?: IconUrlMatch
}

export class Icon {
  readonly name: string
  readonly icons: IconDict
  readonly url?: URL
  readonly urlMatch: IconUrlMatch

  static readonly urlMap = new Map<string, Icon>()
  static readonly customMatchers: Icon[] = []

  constructor({ name, url: urlString, urlMatch, icons }: IconOpts) {
    this.name = name
    this.icons = 'default' in icons ? icons : { default: icons }
    this.urlMatch = urlMatch || Icon.defaultUrlMatch

    if (urlMatch) {
      Icon.customMatchers.push(this)
    }

    if (urlString) {
      const url = toUrl(urlString)
      if (!url) throw new Error(`Bad url string in icon: ${name}`)
      this.url = url

      const urlKey = url.host || url.protocol
      Icon.urlMap.set(urlKey, this)
    }
  }

  getDefinition(id?: 'default'): IconDefinition
  getDefinition(id: string): IconDefinition | null
  getDefinition(id = 'default'): IconDefinition | null {
    return this.icons[id] || null
  }

  matchesUrl(url: URL): boolean {
    return this.url ? this.urlMatch(url, this.url) : false
  }

  static getIconFromUrl(urlString: string | URL): Icon | null {
    const url = toUrl(urlString)
    if (!url) return null
    const { protocol, host } = url
    return (
      Icon.urlMap.get(host) ||
      Icon.customMatchers.find((i) => i.matchesUrl(url)) ||
      Icon.urlMap.get(protocol) ||
      null
    )
  }

  static defaultUrlMatch(url: URL, iconUrl: URL): boolean {
    const { protocol, host } = url
    return iconUrl?.host ? host === iconUrl.host : protocol === iconUrl?.href
  }
}

export const faToIconify = (icon: FaIconDefinition): IconifyIcon => {
  const [width, height, , , svgPathData] = icon.icon
  const body = Array.isArray(svgPathData)
    ? `<g class="fa-duotone-group"><path class="fa-secondary" fill="currentColor" d="${svgPathData[0]}"></path><path class="fa-primary" fill="currentColor" d="${svgPathData[1]}"></path></g>`
    : `<path fill="currentColor" d=${svgPathData}></path>`
  return { width, height, body }
}
