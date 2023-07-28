import { ComponentType } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type ComponentStyle = ImageStyle & TextStyle & ViewStyle

export type VariantsProps = {
  [Key in string]: {
    [Key in string]: ComponentStyle
  }
}

export type ComponentStyleProps = {
  base?: ComponentStyle
  variants?: VariantsProps
}

export type ExtractPropsFromVariants<Variants> = {
  [Key in keyof Variants]?: keyof Variants[Key]
}

export type ExtractPropsFromStyledComponent<StyledComponent> =
  StyledComponent extends {
    variants?: infer Variants
  }
    ? ExtractPropsFromVariants<Variants> & {
        style?: ComponentStyle
      }
    : {
        style?: ComponentStyle
      }
