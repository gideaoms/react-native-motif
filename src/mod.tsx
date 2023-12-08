import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native'

type Style = TextStyle | ViewStyle | ImageStyle

export function styled<
  const Config extends {
    [K in keyof Config]: {
      [U in keyof Config[K]]: Style
    }
  },
>(config: Config) {
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
  'variant'
>

export const style = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  itemsCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  textCenter: {
    textAlign: 'center',
  },
})
