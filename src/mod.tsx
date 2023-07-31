import { ReactNode, createContext, useContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type CombinedStyle = ImageStyle | TextStyle | ViewStyle

interface Config<Variants, DefaultVariants> {
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

  function ThemeProvider(props: { children: ReactNode }) {
    return (
      <Context.Provider value={theme}>{props.children}</Context.Provider>
    )
  }

  function getDefaultVariantStyle<
    const Variants extends Record<PropertyKey, Record<PropertyKey, CombinedStyle>>,
    const DefaultVariants extends { [K in keyof Variants]: keyof Variants[K] },
  >(variants: Variants, defaultVariants: DefaultVariants): CombinedStyle {
    return Object.keys(defaultVariants)
      .map(function (key) {
        const variant = variants[key] ?? {}
        const defaultVariant = defaultVariants[key] ?? {}
        return variant[defaultVariant] ?? {}
      })
      .reduce(function (acc, curr) {
        return { ...acc, ...curr }
      }, {})
  }

  function styled<
    const Variants extends Record<PropertyKey, Record<PropertyKey, CombinedStyle>>,
    const DefaultVariants extends { [K in keyof Variants]?: keyof Variants[K] },
  >(
    config: Config<Variants, DefaultVariants>,
  ): { style: CombinedStyle } & { [K in keyof Variants]: Variants[K] } {
    const defaultVariantsStyle = getDefaultVariantStyle(
      config.variants ?? {},
      config.defaultVariants ?? {},
    )
    return { style: config.base!, ...defaultVariantsStyle, ...config.variants! }
  }

  return {
    useTheme,
    ThemeProvider,
    styled,
    theme,
  }
}
