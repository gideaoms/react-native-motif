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
  K extends keyof T,
  U extends keyof T[K]
>(config: T) {
  const mapped: any = {}
  for (const key in config) {
    mapped[key] = {
      ...config[key],
      get: (variant: U | undefined) => {
        if (variant === undefined) {
          return undefined
        }
        return config[key as unknown as K][variant]
      }
    }
  }
  return mapped as { [U in K]: T[U] & GetFn<T, U> }
}

