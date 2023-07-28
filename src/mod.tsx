import { ReactNode, createContext, useContext } from 'react'
import { ComponentStyleProps, ExtractPropsFromStyledComponent } from './types'

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

  function styled<StyledComponent extends ComponentStyleProps>(
    styleComponent: (theme: Theme) => StyledComponent,
  ) {
    const { base, variants } = styleComponent(theme)
    return function (props?: ExtractPropsFromStyledComponent<StyledComponent>) {
      if (!props || !variants) {
        return base
      }
      const { style, ...chosenVariants } = props
      const transformed = Object.keys(chosenVariants).reduce(function (
        acc,
        variant,
      ) {
        const style = variants[variant][chosenVariants[variant] as string]
        return { ...acc, ...style }
      },
      {})
      return { ...base, ...transformed, ...style }
    }
  }

  return {
    useTheme,
    ThemeProvider,
    styled,
  }
}
