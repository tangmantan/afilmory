import { merge } from 'es-toolkit/compat'

import userConfig from './config.json'

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  accentColor: string
  author: Author
  social?: Social
  feed?: Feed
  map?: MapConfig
  mapStyle?: string
}

/**
 * Map configuration - can be either:
 * - A string for a single provider: 'maplibre'
 * - An array for multiple providers in priority order: ['maplibre']
 */
type MapConfig = 'maplibre'[]

interface Feed {
  folo?: {
    challenge?: {
      feedId: string
      userId: string
    }
  }
}
interface Author {
  name: string
  url: string
  avatar?: string
}
interface Social {
  twitter?: string
  github?: string
  gitee?: string
  douyin?: string
  rss?: boolean
}

const defaultConfig: SiteConfig = {
  name: "懒洋洋喝咖啡",
  title: "懒洋洋喝咖啡",
  description: "记录生活中的美好瞬间，通过我的镜头记录每日的温暖和情感。",
  url: 'https://pix.tanmantang.com/',
  accentColor: '#007bff',
  author: {
    name: 'tanmantang',
    url: 'https://tanmantang.com/',
    avatar: 'https://tanmantang.oss-cn-chengdu.aliyuncs.com/public/logo.png',
  },
}
export const siteConfig: SiteConfig = merge(defaultConfig, userConfig) as any

export default siteConfig
