import {
  ComponentProps,
  ComponentType,
  createContext,
  createElement,
  forwardRef,
  ReactNode,
  useContext,
} from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type Style = ViewStyle & TextStyle & ImageStyle

type Variants = {
  [key: string]: {
    [key: string]: Style
  }
}

type StyleWithVariants = Style & {
  variants?: Variants
}

type AddVariantsToComponent<Props, Style, Variants> = Props & {
  style?: Style
} & {
  [K in keyof Variants]?: keyof Variants[K]
}

type GetProps<Component> = Component extends ComponentType<infer Props>
  ? Props
  : never

type GetVariants<Style> = Style extends { variants?: infer Variants }
  ? Variants
  : {}

export function createTheme<Theme>(theme: Theme) {
  const Context = createContext<Theme>(theme)

  function useTheme() {
    return useContext(Context)
  }

  function ThemeProvider(props: { children: ReactNode; theme: Theme }) {
    return (
      <Context.Provider value={props.theme}>{props.children}</Context.Provider>
    )
  }

  function createStyledVariants(
    props: ComponentProps<any>,
    variants?: Variants,
  ) {
    if (!variants || typeof variants !== 'object') {
      return {}
    }
    return Object.keys(props).reduce((prev, key) => {
      const pairs = variants[key]
      if (!pairs) {
        return prev
      }
      const variant = props[key]
      if (!variant) {
        return prev
      }
      const pair = pairs[variant]
      if (!pair) {
        return prev
      }
      return { ...prev, ...pair }
    }, {})
  }

  function styled<
    Component extends ComponentType<any>,
    Style extends StyleWithVariants,
  >(component: Component, createStyledTheme: (theme: Theme) => Style) {
    type PropsWithVariants = AddVariantsToComponent<
      GetProps<Component>,
      StyleWithVariants,
      GetVariants<Style>
    >
    const createdComponent = forwardRef<Component, PropsWithVariants>(
      (props, ref) => {
        const styledTheme = createStyledTheme(theme)
        const styledVariants = createStyledVariants(props, styledTheme.variants)
        const styledInline = props.style
        const style = { ...styledTheme, ...styledVariants, ...styledInline }
        return createElement(component, {
          ...props,
          ref,
          style,
        })
      },
    )
    createdComponent.displayName = component.displayName
    return createdComponent
  }

  return {
    styled,
    theme,
    useTheme,
    ThemeProvider,
  }
}
