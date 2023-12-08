import { TextStyle, ViewStyle, ImageStyle } from 'react-native'

type Style = TextStyle | ViewStyle | ImageStyle

type Config = {
  [K in string]: {
    [U in string]: Style
  }
}

function styled<const T extends Config>(config: T) {
  return config
}

type VariantProps<T extends Config> = {
  [K in keyof T]?: keyof T[K]
}

const style = styled({
  alignItems: {
    center: {
      alignItems: 'center',
    },
  },
  justifyContent: {
    center: {
      justifyContent: 'center',
    },
    flexEnd: {
      justifyContent: 'flex-end',
    },
  },
  flexDirection: {
    row: {
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
  },
})

export { styled }
export { VariantProps }
export { style }
