import { TextStyle, ViewStyle, ImageStyle } from 'react-native'

type Style = TextStyle | ViewStyle | ImageStyle

function styled<
  Config extends {
    [K in keyof Config]: {
      [U in keyof Config[K]]: Style
    }
  },
>(config: Config) {
  function variant<K extends keyof Config, U extends keyof Config[K]>(
    pairs: K,
    pair: (U extends 'true' | 'false' ? boolean : U) | undefined,
  ) {
    if (pair === undefined) {
      return
    }
    return config[pairs][pair as U]
  }
  return { ...config, variant }
}

type VariantProps<T> = {
  [K in keyof T]?: keyof T[K] extends 'true' | 'false' ? boolean : keyof T[K]
}

const style = styled({
  flex: {
    1: {
      flex: 1,
    },
    2: {
      flex: 2,
    },
    3: {
      flex: 3,
    },
  },
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
