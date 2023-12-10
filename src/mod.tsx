import { TextStyle, ViewStyle, ImageStyle } from 'react-native'

type Style = TextStyle | ViewStyle | ImageStyle

type Base = {
  base?: Style
}

type Variants = {
  [k in string]: {
    [k in string]: Style
  }
}

export function styled<const T extends Base | Variants>(config: T) {
  return config
}

export function variant<T, K extends keyof T>(
  variants: T,
  variant: (K extends 'true' | 'false' ? boolean : K) | undefined,
) {
  if (variant === undefined) {
    return
  }
  return variants[variant as K]
}

export type VariantProps<T> = Omit<
  {
    [K in keyof T]?: keyof T[K] extends 'true' | 'false' ? boolean : keyof T[K]
  },
  'variant' | 'base'
>
