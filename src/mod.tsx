import { ReactNode, createContext, useContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type CombinedStyle = ImageStyle | TextStyle | ViewStyle

type Config<Variants, DefaultVariants> = {
  base?: CombinedStyle
  variants?: Variants
  defaultVariants?: DefaultVariants
}

export type VariantProps<T> = Omit<{ [K in keyof T]?: keyof T[K] }, 'style'>

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

  function mergeDefaultVariants(
    variants: Record<string, Record<string, object>>,
    defaultVariants: Record<string, PropertyKey | undefined>,
  ) {
    return Object.keys(defaultVariants)
      .map(function (key) {
        const variant = variants[key]
        const defaultVariant = defaultVariants[key] as string
        return variant[defaultVariant]
      })
      .reduce(function (acc, curr) {
        return { ...acc, ...curr }
      }, {})
  }

  function styled<
    const Variants extends Record<string, Record<string, CombinedStyle>>,
    const DefaultVariants extends { [K in keyof Variants]?: keyof Variants[K] },
  >(config: Config<Variants, DefaultVariants>) {
    const defaultVariants = mergeDefaultVariants(
      config.variants ?? {},
      config.defaultVariants ?? {},
    )
    const style = { ...config.base!, ...defaultVariants }
    return { style, ...config.variants! }
  }

  return {
    useTheme,
    ThemeProvider,
    styled,
    theme,
  }
}
