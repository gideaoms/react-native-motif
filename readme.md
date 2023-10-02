# React Native Motif

Have fun creating UI for React Native.

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

const title = createStyle({
  variants: {
    color: {
      primary: {
        color: theme.colors.primary,
      },
      secondary: {
        color: theme.colors.secondary,
      },
    },
    fontSize: {
      md: {
        fontSize: theme.fontSizes.md,
      },
      sm: {
        fontSize: theme.fontSizes.sm,
      },
    },
  }
})

export type TitleProps = {
  children: string | string[]
} & VariantProps<typeof title>

export function Title(props: TitleProps) {
  return (
    <Text
      style={[
        title.color.get(props.color),
        title.fontSize.get(props.fontSize) ?? fontSize.sm,
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
