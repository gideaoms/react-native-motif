# React Native Motif

Have fun creating UI for React Native.

```cmd
npm install react-native-motif
```

```tsx
// src/components/title.tsx

import { Text } from 'react-native'
import { VariantProps, styled } from 'react-native-motif'
import { theme } from '../motif'

const title = styled({
  color: {
    red: {
      color: 'red',
    },
    yellow: {
      color: 'yellow',
    },
  },
  fontSize: {
    sm: {
      fontSize: 15,
    },
    md: {
      fontSize: 18,
    },
  },
})

export type Props = {
  children: string | string[]
} & VariantProps<typeof title>

export function Title(props: Props) {
  return (
    <Text
      style={[
        variant(title.color, props.color),
        variant(title.fontSize, props.fontSize),
      ]}
    >
      {props.children}
    </Text>
  )
}
```

```tsx
// src/app.tsx

import { View } from 'react-native'
import { style } from 'react-native-motif'
import { Title } from './components/title'

export function App() {
  return (
    <View
      style={[
        style.flex1,
        style.itemsCenter,
      ]}
    >
      <Title
        color="primary"
        fontSize="md"
      >
        Hello world
      </Title>
    </View>
  )
}
```
