import React, { ReactNode, createContext, useContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type Style = ViewStyle | TextStyle | ImageStyle

type Config = {
  base?: Style
  variants?: {
    [k in string]: {
      [k in string]: Style
    }
  }
}

export function styled<T extends Config>(config: T) {
  return config
}

export function variant<T, K extends keyof T>(variants: T, key?: K | boolean) {
  if (key === undefined) {
    return
  }
  return variants[key as K]
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

export type VariantProps<T extends Config> = {
  [K in keyof T['variants']]?: keyof T['variants'][K] extends 'true' | 'false'
    ? boolean
    : keyof T['variants'][K]
}
