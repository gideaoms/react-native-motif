import { ReactNode, createContext, useContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type CombinedStyle = ViewStyle | TextStyle | ImageStyle

type ConfigProps<T, U> = {
  base?: CombinedStyle
  variants?: T
  defaultVariants?: U
}

type ConfigVariantsResult<T> = {
  [K in keyof T]: {
    [U in keyof T[K]]: T[K][U]
  } & {
    get: <J extends keyof T[K]>(
      pair?: J extends 'true' | 'false' ? boolean : J,
    ) => T[K][J] | undefined
  }
}

type ConfigResult<T> = {
  style?: CombinedStyle
} & ConfigVariantsResult<T>

type ConfigVariantsProps<T> = {
  [K in keyof T]: {
    [U in keyof T[K]]: CombinedStyle
  }
}

type ConfigDefaultVariantsProps<T> = {
  [K in keyof T]?: keyof T[K]
}

export type VariantProps<T> = Omit<
  {
    [K in keyof T]?: keyof T[K] extends 'true' | 'false' | 'get'
      ? boolean
      : keyof Omit<T[K], 'get'>
  },
  'style'
>

export function createTheme<T>(theme: T) {
  const Context = createContext(theme)

  function useTheme() {
    return useContext(Context)
  }

  function ThemeProvider(props: { children: ReactNode }) {
    return <Context.Provider value={theme}>{props.children}</Context.Provider>
  }

  function styled<
    const T extends ConfigVariantsProps<T>,
    const U extends ConfigDefaultVariantsProps<T>,
  >(config: ConfigProps<T, U>) {
    if (!config.variants) {
      return { style: config.base } as ConfigResult<T>
    }
    const variants = {} as ConfigVariantsResult<T>
    for (const variant in config.variants) {
      variants[variant] = {
        ...config.variants[variant],
        get(pair) {
          if (pair === undefined) return
          // @ts-ignore
          return config.variants?.[variant][pair]
        },
      }
      const defaultVariant = config.defaultVariants?.[variant]
      if (defaultVariant && defaultVariant in config.variants[variant]) {
        config.base = {
          ...config.base,
          ...config.variants[variant][defaultVariant],
        }
      }
    }
    return { style: config.base, ...variants }
  }

  return {
    theme,
    styled,
    useTheme,
    ThemeProvider,
  }
}
