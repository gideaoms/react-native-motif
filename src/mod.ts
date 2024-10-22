import type { TextStyle, ViewStyle, ImageStyle } from 'react-native'

type Style = TextStyle & ViewStyle & ImageStyle

export type VariantProps<T> = {
  [K in keyof T]?: T[K] extends (variant: infer U) => unknown ? U : never
}

export function styled<
  const T extends {
    [K1 in keyof Style]: {
      [K2 in string]: Style[K1]
    }
  },
  const K extends keyof T,
>(config: T) {
  const keys = Object.keys(config) as K[]
  const initial = {} as { [K in keyof T]: (variant: keyof T[K] | undefined) => T[K][keyof T[K]] | undefined }
  return keys.reduce((acc, key) => ({
    ...acc,
    [key]: (variant: keyof T[K] | undefined) => {
      if (variant === undefined) {
        return undefined
      }
      return config[key][variant]
    }
  }), initial)
}
