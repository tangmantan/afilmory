import { atom } from 'jotai'

export type GallerySortBy = 'date'
export type GallerySortOrder = 'asc' | 'desc'

export const gallerySettingAtom = atom({
  sortBy: 'date' as GallerySortBy,
  sortOrder: 'desc' as GallerySortOrder,
  selectedTags: [] as string[],
  selectedCameras: [] as string[], // 已选择的相机显示名称
  selectedLenses: [] as string[], // 已选择的镜头显示名称
  selectedRatings: null as number | null, // 已选择的最低评分阈值
  tagSearchQuery: '' as string,
  cameraSearchQuery: '' as string, // 相机搜索查询
  lensSearchQuery: '' as string, // 镜头搜索查询
  ratingSearchQuery: '' as string, // 评分搜索查询
  isTagsPanelOpen: false as boolean,
  columns: 6 as number | 'auto', // 自定义列数，设置为6 默认auto
})

export const isExiftoolLoadedAtom = atom(false)
