import { ReactNode, createContext, useContext } from 'react'
import {
  ComponentStyleProps,
  ExtractPropsFromStyledComponent,
  VariantsProps,
} from './types'

export function createTheme<Theme>(theme: Theme) {
  const Context = createContext(theme)

  function useTheme() {
    return useContext(Context)
  }

  function ThemeProvider(props: { children: ReactNode; theme: Theme }) {
    return (
      <Context.Provider value={props.theme}>{props.children}</Context.Provider>
    )
  }

  function transformVariantsInStyle(
    chosenVariants: Record<string, string | undefined>,
    variants?: VariantsProps,
  ) {
    if (!variants || typeof variants !== 'object') {
      return {}
    }
    return Object.keys(chosenVariants).reduce(function (prev, key) {
      const pairs = variants[key]
      if (!pairs) {
        return prev
      }
      const variant = chosenVariants[key]
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

  function styled<StyledComponent extends ComponentStyleProps>(
    styleComponent: (theme: Theme) => StyledComponent,
  ) {
    const { base, variants } = styleComponent(theme)
    return function (props?: ExtractPropsFromStyledComponent<StyledComponent>) {
      if (!props) {
        return base
      }
      const { style: inline, ...chosenVariants } = props
      const transformed = transformVariantsInStyle(chosenVariants, variants)
      return { ...base, ...transformed, ...inline }
    }
  }

  return {
    useTheme,
    ThemeProvider,
    styled,
  }
}

// https://github.com/planttheidea/micro-memoize
