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
    const variants = {} as {
      [K in keyof Variants]: {
        [Y in keyof Variants[K]]: CombinedStyle
      } & {
        get: (
          key?: keyof Variants[K] extends 'true' | 'false'
            ? boolean
            : keyof Variants[K],
        ) => CombinedStyle
      }
    }
    for (const key in config.variants) {
      const pairs = {
        get(key: string) {
          return this[key]
        },
      } as {
        [K in keyof Variants]: CombinedStyle
      }
      for (const variant in config.variants[key]) {
        pairs[variant] = config.variants[key][variant]
      }
      //  @ts-ignore
      variants[key] = pairs
    }
    return { style: config.base, ...variants }
  }

  return {
    styled,
    theme,
    useTheme,
    ThemeProvider,
  }
}
