import { ReactNode, createContext, useContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type VariantProps<T> = Exclude<
  keyof T extends number | 'get'
    ? `${keyof T}`
    : keyof T extends 'true' | 'false' | 'get'
    ? boolean
    : keyof T,
  'get'
>

export function createStyle<
  const T extends { [k in string]: ViewStyle | TextStyle | ImageStyle },
>(variants: T) {
  const pairs = {
    ...variants,
    get(
      pair?: keyof T extends number
        ? `${keyof T}`
        : keyof T extends 'true' | 'false'
        ? boolean
        : keyof T,
    ) {
      if (!pair) return
      return this[pair as unknown as keyof T]
    },
  }
  return pairs
}

export function createTheme<T>(theme: T) {
  const Context = createContext(theme)

  function useTheme() {
    return useContext(Context)
  }

  function ThemeProvider(props: { children: ReactNode }) {
    return <Context.Provider value={theme}>{props.children}</Context.Provider>
  }

  return {
    theme,
    useTheme,
    ThemeProvider,
  }
}
