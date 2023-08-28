# React Native Motif

Have fun creating UI for React Native.

![2023-08-02 17-03-37](https://github.com/gideaoms/react-native-motif/assets/6031121/8e5150ea-3079-43c9-906a-63ed7f2ac612)

```cmd
npm install react-native-motif
```

```tsx
// src/motif.tsx

import { createTheme } from 'react-native-motif'

export const { ThemeProvider, useTheme } = createTheme({
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
  fontSizes: {
    sm: 15,
    md: 18,
  },
})
```

```tsx
// src/components/title.tsx

import { Text } from 'react-native'
import { VariantProps, createStyle } from 'react-native-motif'
import { theme } from '../motif'

const color = createStyle({
  primary: {
    color: theme.colors.primary,
  },
  secondary: {
    color: theme.colors.secondary,
  },
})

const fontSize = createStyle({
  md: {
    fontSize: theme.fontSizes.md,
  },
  sm: {
    fontSize: theme.fontSizes.sm,
  },
})

export type TitleProps = {
  children: string | string[]
  color?: VariantProps<typeof color>
  fontSize?: VariantProps<typeof fontSize>
}

export function Title(props: TitleProps) {
  return (
    <Text
      style={[
        color.get(props.color),
        fontSize.get(props.fontSize) ?? fontSize.sm,
      ]}
    >
      {props.children}
    </Text>
  )
}
```

```tsx
// src/app.tsx

import { ThemeProvider } from './motif'
import { Title } from './components/title'

export function App() {
  return (
    <ThemeProvider>
      <Title
        color="primary"
        fontSize="md"
      >
        Hello world
      </Title>
    </ThemeProvider>
  )
}
```
