import { ReactNode, createContext, useContext } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type Style = ViewStyle | TextStyle | ImageStyle

type InputStyle = {
  base?: Style
  variants?: InputVariants
}

type InputVariants = {
  [K in string]: {
    [U in string]: Style
  }
}

type OutputVariants<T> = {
  [K in keyof T]: {
    [U in keyof T[K]]: T[K][U]
  } & {
    get<J extends keyof T[K]>(
      key?: J extends 'true' | 'false' ? boolean : J,
    ): T[K][J]
  }
}

type OutputStyle<T extends InputStyle> = {
  base?: T['base']
} & OutputVariants<T['variants']>

export type VariantProps<T> = Omit<
  {
    [K in keyof T]?: keyof T[K] extends 'true' | 'false' | 'get'
      ? boolean
      : keyof Omit<T[K], 'get'>
  },
  'style'
>

export function createStyle<const T extends InputStyle>(style: T) {
  const variants = {}
  for (const variant in style.variants) {
    // @ts-ignore
    variants[variant] = {
      ...style.variants[variant],
      // @ts-ignore
      get(key) {
        return this[key]
      },
    }
  }
  return style as OutputStyle<T>
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
