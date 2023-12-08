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

export type TitleProps = {
  children: string | string[]
} & VariantProps<typeof title>

export function Title(props: TitleProps) {
  return (
    <Text
      style={[
        title.variant('color', props.color),
        title.variant('fontSize', props.fontSize),
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
        style.flex.$1,
        style.alignItems.center,
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
