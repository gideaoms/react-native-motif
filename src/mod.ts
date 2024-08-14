import { TextStyle, ViewStyle, ImageStyle } from 'react-native'

type Style = TextStyle & ViewStyle & ImageStyle

type GetFn<T, K extends keyof T> = {
  readonly get: <U extends keyof T[K]>(key: (keyof T[K] extends 'true' | 'false' ? boolean : keyof T[K]) | undefined) => T[K][U] | undefined
}

export type VariantProps<T> = {
  [K in keyof T]?: keyof T[K] extends 'true' | 'false' | 'get' ? boolean : Exclude<keyof T[K], 'get'>
}

export function styled<
  const T extends {
    [K in keyof Style]: {
      [Y in string]: Style[K]
    }
  },
  K extends keyof T
>(config: T) {
  const entries = Object.entries(config) as [[K, T[K]]]
  const mapped = entries.map(([key, value]) => ({
    [key]: {
      ...value,
      get: (key: keyof T[K] | undefined) => {
        if (key === undefined) {
          return undefined
        }
        return value[key]
      }
    },
  }))
  return mapped.reduce((acc, curr) => ({ ...acc, ...curr }), {}) as { [U in K]: T[U] & GetFn<T, U> }
}
