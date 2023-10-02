import { ReactNode, createContext, useContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type Style = ViewStyle | TextStyle | ImageStyle

type InputVariants = {
  [k in string]: {
    [k in string]: Style
  }
}

type OutputVariants<T> = {
  [K1 in keyof T]: {
    [K2 in keyof T[K1]]: T[K1][K2]
  } & {
    get<J extends keyof T[K1]>(
      key?: J extends 'true' | 'false' ? boolean : J,
    ): T[K1][J] | undefined
  }
}

type InputCustom = {
  base?: Style
}

export type VariantProps<T> = Omit<
  {
    [K in keyof T]?: keyof T[K] extends 'true' | 'false' | 'get'
      ? boolean
      : keyof Omit<T[K], 'get'>
  },
  'base'
>

export function createStyle<T extends InputVariants>(variants: T) {
  const variantsWithGetFn = Object.keys(variants).reduce(function (
    previous,
    current: keyof OutputVariants<T>,
  ) {
    return {
      ...previous,
      [current]: {
        ...variants[current],
        get(key?: string) {
          if (key === undefined) {
            return undefined
          }
          return this[key]
        },
      },
    }
  }, {} as OutputVariants<T>)
  return function <U extends InputCustom>(custom: U) {
    return Object.assign({ base: custom.base }, variantsWithGetFn) as U &
      OutputVariants<T>
  }
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
