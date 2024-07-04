import { TextStyle, ViewStyle, ImageStyle } from 'react-native'

type Style = TextStyle & ViewStyle & ImageStyle

export type VariantProps<T> = {
  [K in keyof T]?: keyof T[K] extends 'true' | 'false' ? boolean : keyof T[K]
}

export function styled<
  const T extends {
    [K in keyof Style]?: {
      [k in string]: Style[K]
    }
  },
>(config: T) {
  return config
}

export function variant<T, const K extends keyof T>(
  variants: T,
  key: (K extends 'true' | 'false' ? boolean : K) | undefined,
) {
  if (key === undefined) {
    return
  }
  return variants[key as K]
}
