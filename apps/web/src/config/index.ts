import { merge } from 'es-toolkit/compat'

const defaultInjectConfig = {
  useApi: true,
  useNext: false,
}

export const injectConfig = merge(defaultInjectConfig, __CONFIG__)
