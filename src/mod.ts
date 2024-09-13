import type { TextStyle, ViewStyle, ImageStyle } from 'react-native'

type Style = TextStyle & ViewStyle & ImageStyle

type Getter<T, K extends keyof T> = {
  readonly get: <U extends keyof T[K]>(
    variant: U | undefined
  ) => T[K][U] | undefined
}

export type VariantProps<T> = {
  [K in keyof T]?: keyof Omit<T[K], 'get'>
}

export function styled<
  const T extends { [K in keyof Style]: { [_ in string]: Style[K] } },
  const K extends keyof T,
  const U extends keyof T[K],
>(config: T) {
  const keys = Object.keys(config) as K[]
  const initial = {} as { [P in keyof T]: T[P] & Getter<T, P> }
  return keys.reduce((acc, key) => ({
    ...acc,
    [key]: {
      ...config[key],
      get: (variant: U | undefined) => {
        if (variant === undefined) {
          return undefined
        }
        return config[key][variant]
      },
    },
  }), initial)
}
