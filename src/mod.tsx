import { TextStyle, ViewStyle, ImageStyle } from 'react-native'

type S = TextStyle | ViewStyle | ImageStyle

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export function styled<
  const T extends {
    base?: S
    variants?: {
      [k in string]: {
        [k in string]: S
      }
    }
  },
>(config: T) {
  type R = Prettify<Omit<T, 'variants'> & T['variants']>
  if (config.base) {
    return { base: config.base, ...config.variants } as R
  }
  return config.variants as R
}

export function variant<const T, const K extends keyof T>(
  variants: T,
  key: (K extends 'true' | 'false' ? boolean : K) | undefined,
) {
  if (key === undefined) {
    return
  }
  return variants[key as K]
}

export type VariantProps<T> = Omit<
  {
    [K in keyof T]?: keyof T[K] extends 'true' | 'false' ? boolean : keyof T[K]
  },
  'base'
>
