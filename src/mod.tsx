import { ReactNode, createContext, useContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type CombinedStyle = ViewStyle | TextStyle | ImageStyle

type Config<Variants, DefaultVariants> = {
  base?: CombinedStyle
  variants?: Variants
  defaultVariants?: DefaultVariants
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
    const Variants extends Record<
      PropertyKey,
      Record<PropertyKey, CombinedStyle>
    >,
    const DefaultVariants extends { [K in keyof Variants]?: keyof Variants[K] },
  >(config: Config<Variants, DefaultVariants>) {
    const mappedVariants = {} as {
      [K in keyof Variants]: {
        [Y in keyof Variants[K]]: CombinedStyle
      } & {
        get: (
          variant?: keyof Variants[K] extends 'true' | 'false'
            ? boolean
            : keyof Variants[K],
        ) => CombinedStyle | undefined
      }
    }
    for (const key in config.variants) {
      mappedVariants[key] = {
        ...config.variants[key],
        get(variant) {
          if (!variant) return
          return this[String(variant)]
        },
      }
      if (config.defaultVariants?.[key]) {
        config.base = {
          ...config.base,
          ...config.variants[key][config.defaultVariants[key] ?? ''],
        }
      }
    }
    return { style: config.base, ...mappedVariants }
  }

  return {
    styled,
    theme,
    useTheme,
    ThemeProvider,
  }
}
