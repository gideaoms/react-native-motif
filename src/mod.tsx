import { ReactNode, createContext, useContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type CombinedStyle = ImageStyle | TextStyle | ViewStyle

type Config<Variants, DefaultVariants> = {
  base?: CombinedStyle
  variants?: Variants
  defaultVariants?: DefaultVariants
}

export type ExtractProps<T> = Omit<{ [K in keyof T]: keyof T[K] }, 'base'>

export function createTheme<T>(theme: T) {
  const Context = createContext(theme)

  function useTheme() {
    return useContext(Context)
  }

  function ThemeProvider(props: { children: ReactNode; theme: T }) {
    return (
      <Context.Provider value={props.theme}>{props.children}</Context.Provider>
    )
  }

  function styled<
    Variants extends Record<string, Record<string, CombinedStyle>>,
    DefaultVariants extends { [K in keyof Variants]?: keyof Variants[K] },
  >(config: Config<Variants, DefaultVariants>) {
    return { base: config.base, ...config.variants! }
  }

  return {
    useTheme,
    ThemeProvider,
    styled,
    theme,
  }
}
