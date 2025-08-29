import { photoLoader } from '@afilmory/data'
import { siteConfig } from '@config'
import { repository } from '@pkg'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { useTranslation } from 'react-i18next'

import { clsxm } from '~/lib/cn'

import { ActionGroup } from './ActionGroup'

const data = photoLoader.getPhotos()

export const MasonryHeaderMasonryItem = ({
  style,
  className,
}: {
  style?: React.CSSProperties
  className?: string
}) => {
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  return (
    <div
      className={clsxm(
        'overflow-hidden border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
      style={style}
    >
      {/* Header section with clean typography */}
      <div className="px-6 pt-8 pb-6 text-center">
        <div className="flex items-center justify-center">
          <div className="relative">
            {siteConfig.author.avatar && (
              <AvatarPrimitive.Root>
                <AvatarPrimitive.Image
                  src={siteConfig.author.avatar}
                  className="size-16 rounded-full"
                />
                <AvatarPrimitive.Fallback>
                  <div className="bg-material-medium size-16 rounded-full" />
                </AvatarPrimitive.Fallback>
              </AvatarPrimitive.Root>
            )}
            {/* <div
              className={clsxm(
                'from-accent to-accent/80 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg',
                siteConfig.author.avatar
                  ? 'size-8 rounded absolute bottom-0 -right-3'
                  : 'size-16 mb-4',
              )}
            >
              <i className="i-mingcute-camera-2-line text-2xl text-white" />
            </div> */}
          </div>
        </div>

        <h2 className="mt-1 mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
          {siteConfig.name}
        </h2>

        {/* Social media links */}
        {siteConfig.social && (
          <div className="mt-1 mb-3 flex items-center justify-center gap-3">
            {siteConfig.social.github && (
              <a
                href={`https://github.com/${siteConfig.social.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#E7E8E8]"
                title="GitHub"
              >
                <i className="i-mingcute-github-fill text-sm" />
              </a>
            )}
            {siteConfig.social.github && (
              <a
                href={`${siteConfig.social.douyin}`}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#E7E8E8]"
                title={t('tmt.douyin')}
              >
                <i className="i-mingcute-tiktok-fill text-sm" />
              </a>
            )}
            {siteConfig.social.gitee && (
              <a
                href={`https://gitee.com/${siteConfig.social.gitee}`}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#E7E8E8]"
                title="Gitee"
              >
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M896.3052803 427.59336267H465.08398823c-20.69630173 0-37.49062554 16.79432382-37.49062556 37.49062555l-0.02636472 93.75292941c0 20.69630173 16.76795911 37.49062554 37.49062556 37.51699027h262.51347546c20.69630173 0 37.49062554 16.79432382 37.49062555 37.49062638v18.74531277a112.49824219 112.49824219 0 0 1-112.49824219 112.49824219H296.32344217a37.49062554 37.49062554 0 0 1-37.49062554-37.49062556V371.38378824a112.49824219 112.49824219 0 0 1 112.49824218-112.49824219L896.22618615 258.85918133c20.69630173 0 37.49062554-16.76795911 37.49062557-37.46426165L933.79590585 127.64199027h0.02636472A37.49062554 37.49062554 0 0 0 896.35800973 90.125h-0.02636471L371.38378824 90.15136472C216.06924714 90.15136472 90.15136472 216.06924714 90.15136472 371.38378824v524.94785678c0 20.69630173 16.79432382 37.49062554 37.49062555 37.49062555h553.07900829a253.101272 253.101272 0 0 0 253.10127201-253.10127201v-215.61064563c0-20.69630173-16.79432382-37.49062554-37.49062555-37.49062554z"></path></svg>
              </a>
            )}
            {siteConfig.social.twitter && (
              <a
                href={`https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#1da1f2]"
                title="Twitter"
              >
                <i className="i-mingcute-twitter-fill text-sm" />
              </a>
            )}
            {siteConfig.social.rss && (
              <a
                href="/feed.xml"
                target="_blank"
                className="text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#ec672c]"
                title="RSS"
              >
                <i className="i-mingcute-rss-2-fill text-sm" />
              </a>
            )}
          </div>
        )}

        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {t('gallery.photos', { count: data?.length || 0 })}
        </p>
      </div>

      {/* Controls section */}
      <div className="px-6 pb-6">
        <ActionGroup />
      </div>

      {/* Footer with build date */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <i className="i-mingcute-calendar-line text-sm" />
          <span>
            {/* {t('gallery.built.at')} */}
            {t('tmt.update.at')}
            {new Date(BUILT_DATE).toLocaleDateString(i18n.language, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {/* {GIT_COMMIT_HASH && (
              <span className="ml-1">
                (
                <a
                  href={`${repository.url}/commit/${GIT_COMMIT_HASH}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 dark:text-gray-400"
                >
                  {GIT_COMMIT_HASH.slice(0, 6)}
                </a>
                )
              </span>
            )} */}
          </span>
        </div>
      </div>
    </div>
  )
}
