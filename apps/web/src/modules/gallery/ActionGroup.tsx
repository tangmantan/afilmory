import { useAtom, useSetAtom } from 'jotai'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Drawer } from 'vaul'

import { gallerySettingAtom } from '~/atoms/app'
import { FilterPanel } from '~/components/gallery/FilterPanel'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Slider } from '~/components/ui/slider'
import { useMobile } from '~/hooks/useMobile'
import { clsxm } from '~/lib/cn'

const SortPanel = () => {
  const { t } = useTranslation()
  const [gallerySetting, setGallerySetting] = useAtom(gallerySettingAtom)

  const setSortOrder = (order: 'asc' | 'desc') => {
    setGallerySetting({
      ...gallerySetting,
      sortOrder: order,
    })
  }
  return (
    <div className="pb-safe flex flex-col gap-2 p-0 lg:gap-0 lg:pt-0 lg:pb-0 lg:text-sm">
      <h3 className="flex h-6 items-center px-2 text-sm font-medium lg:h-8">
        {t('action.sort.mode')}
      </h3>
      <div className="bg-border mx-2 my-1 h-px" />
      <div
        className={clsxm(
          'hover:bg-accent/50 flex cursor-pointer items-center gap-2 rounded-md bg-transparent px-2 py-3 transition-colors hover:backdrop-blur-3xl lg:py-1',
        )}
        onClick={() => setSortOrder('desc')}
      >
        <i className="i-mingcute-sort-descending-line" />
        <span>{t('action.sort.newest.first')}</span>
        {gallerySetting.sortOrder === 'desc' && (
          <i className="i-mingcute-check-line ml-auto" />
        )}
      </div>
      <div
        className={clsxm(
          'hover:bg-accent/50 flex cursor-pointer items-center gap-2 rounded-md bg-transparent px-2 py-3 transition-colors hover:backdrop-blur-3xl lg:py-1',
        )}
        onClick={() => setSortOrder('asc')}
      >
        <i className="i-mingcute-sort-ascending-line" />
        <span>{t('action.sort.oldest.first')}</span>
        {gallerySetting.sortOrder === 'asc' && (
          <i className="i-mingcute-check-line ml-auto" />
        )}
      </div>
    </div>
  )
}

const ColumnsPanel = () => {
  const { t } = useTranslation()
  const [gallerySetting, setGallerySetting] = useAtom(gallerySettingAtom)
  const isMobile = useMobile()

  const setColumns = (columns: number | 'auto') => {
    setGallerySetting({
      ...gallerySetting,
      columns,
    })
  }
  useEffect(() => {
    if (gallerySetting.columns === 'auto') {
      setGallerySetting(prev => ({ ...prev, columns: 4 }));
    }
  }, []);
  // 根据设备类型提供不同的列数范围
  const columnRange = isMobile
    ? { min: 2, max: 4 } // 移动端适合的列数范围
    : { min: 2, max: 8 } // 桌面端适合的列数范围

  return (
    <div className="pb-safe lg:pb-safe-2 w-full lg:w-80 lg:p-2">
      <h3 className="mb-3 px-2 text-sm font-medium">
        {t('action.columns.setting')}
      </h3>

      <div className="px-2">
        <Slider
          value={gallerySetting.columns}
          onChange={setColumns}
          min={columnRange.min}
          max={columnRange.max}
          autoLabel={t('action.auto')}
        />
      </div>
    </div>
  )
}

// 通用的操作按钮组件
const ActionButton = ({
  icon,
  title,
  badge,
  onClick,
  ref,
  ...props
}: {
  icon: string
  title: string
  badge?: number | string
  onClick: () => void
  ref?: React.RefObject<HTMLButtonElement>
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative h-10 w-10 rounded-full border-0 bg-gray-100 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      title={title}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      <i
        className={clsxm(icon, 'text-base text-gray-600 dark:text-gray-300')}
      />
      {badge && (
        <span className="bg-accent absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white shadow-sm">
          {badge}
        </span>
      )}
    </Button>
  )
}

// 桌面端的下拉菜单按钮
const DesktopActionButton = ({
  icon,
  title,
  badge,
  children,
  contentClassName,
  open,
  onOpenChange,
}: {
  icon: string
  title: string
  badge?: number | string
  children: React.ReactNode
  contentClassName?: string
  open?: boolean
  onOpenChange?: (
    open: boolean,
    setGallerySetting: (setting: any) => void,
  ) => void
}) => {
  const setGallerySetting = useSetAtom(gallerySettingAtom)
  return (
    <DropdownMenu
      defaultOpen={open}
      onOpenChange={(open) => {
        onOpenChange?.(open, setGallerySetting)
      }}
    >
      <DropdownMenuTrigger asChild>
        <ActionButton
          icon={icon}
          title={title}
          badge={badge}
          onClick={() => { }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className={contentClassName}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// 移动端的抽屉按钮
const MobileActionButton = ({
  icon,
  title,
  badge,
  children,
  open,
  onOpenChange,
}: {
  icon: string
  title: string
  badge?: number | string
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <>
      <ActionButton
        icon={icon}
        title={title}
        badge={badge}
        onClick={() => onOpenChange(!open)}
      />
      <Drawer.Root open={open} onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />
          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-2xl border-t border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80">
            <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            {children}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

// 响应式操作按钮组件
const ResponsiveActionButton = ({
  icon,
  title,
  badge,
  children,
  contentClassName,
  globalOpen,
  onGlobalOpenChange,
}: {
  icon: string
  title: string
  badge?: number | string
  children: React.ReactNode
  contentClassName?: string
  globalOpen?: boolean
  onGlobalOpenChange?: (
    open: boolean,
    setGallerySetting: (setting: any) => void,
  ) => void
}) => {
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)

  if (isMobile) {
    return (
      <MobileActionButton
        icon={icon}
        title={title}
        badge={badge}
        open={open}
        onOpenChange={setOpen}
      >
        {children}
      </MobileActionButton>
    )
  }

  return (
    <DesktopActionButton
      icon={icon}
      title={title}
      badge={badge}
      contentClassName={contentClassName}
      open={globalOpen}
      onOpenChange={onGlobalOpenChange}
    >
      {children}
    </DesktopActionButton>
  )
}

export const ActionGroup = () => {
  const { t } = useTranslation()
  const [gallerySetting, setGallerySetting] = useAtom(gallerySettingAtom)
  const navigate = useNavigate()

  const onTagsPanelOpenChange = (open: boolean) => {
    setGallerySetting((prev: any) => ({
      ...prev,
      isTagsPanelOpen: open,
    }))
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {/* 地图探索按钮 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/explory')}
        className="h-10 w-10 rounded-full border-0 bg-gray-100 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        title={t('action.map.explore')}
      >
        <i className="i-mingcute-map-pin-line text-base text-gray-600 dark:text-gray-300" />
      </Button>

      {/* 过滤按钮 */}
      <ResponsiveActionButton
        icon="i-mingcute-filter-line"
        title={t('action.filter.title')}
        badge={
          gallerySetting.selectedTags.length +
            gallerySetting.selectedCameras.length +
            gallerySetting.selectedLenses.length >
            0
            ? gallerySetting.selectedTags.length +
            gallerySetting.selectedCameras.length +
            gallerySetting.selectedLenses.length
            : undefined
        }
        // 使用全局状态实现滚动时自动收起标签面板
        globalOpen={gallerySetting.isTagsPanelOpen}
        onGlobalOpenChange={onTagsPanelOpenChange}
      >
        <FilterPanel />
      </ResponsiveActionButton>

      {/* 列数调整按钮 */}
      <ResponsiveActionButton
        icon="i-mingcute-grid-line"
        title={t('action.columns.setting')}
        badge={
          gallerySetting.columns !== 'auto' ? gallerySetting.columns : undefined
        }
      >
        <ColumnsPanel />
      </ResponsiveActionButton>

      {/* 排序按钮 */}
      <ResponsiveActionButton
        icon={
          gallerySetting.sortOrder === 'desc'
            ? 'i-mingcute-sort-descending-line'
            : 'i-mingcute-sort-ascending-line'
        }
        title={t('action.sort.mode')}
        contentClassName="w-48"
      >
        <SortPanel />
      </ResponsiveActionButton>
    </div>
  )
}

const panelMap = {
  sort: SortPanel,
  tags: FilterPanel,
  columns: ColumnsPanel,
}

export type PanelType = keyof typeof panelMap
// 导出 ActionType 以保持与 FloatingActionButton 的一致性
export type ActionType = PanelType

export const ActionPanel = ({
  open,
  onOpenChange,
  type,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: PanelType | null
}) => {
  const Panel = type ? panelMap[type] : null
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-2xl border-t border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80">
          <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          {Panel && <Panel />}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
