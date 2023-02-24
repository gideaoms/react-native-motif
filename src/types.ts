import { ComponentType } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type RawStyle = ViewStyle & TextStyle & ImageStyle

export type Variants = {
  variants?: {
    [K in string]: {
      [K: string]: RawStyle
    }
  }
}

export type ComposeProps<Props, Variants> =
  | Props & {
      [K in keyof Variants]?: keyof Variants[K]
    } & {
      style?: RawStyle
    }

export type GetProps<C> = C extends ComponentType<infer P> ? P : never

export type GetVariants<S> = S extends { variants?: infer V } ? V : {}
