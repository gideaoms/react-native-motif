# React Native Motif

Have fun creating UI for React Native.

```cmd
npm install react-native-motif
```

```tsx
// src/motif.tsx

import { createTheme } from 'react-native-motif'

export const { ThemeProvider, useTheme, theme, styled } = createTheme({
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
// src/title.tsx

import { VariantProps } from 'react-native-motif'
import { Text } from 'react-native'
import { styled, theme } from './motif'

const title = styled({
  base: {
    textAlign: 'center',
  },
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
  },
  defaultVariants: {
    fontSize: 'md',
  },
})

type TitleVariants = VariantProps<typeof title>

export type TitleProps = TitleVariants & {
  children: string
}

export function Title(props: TitleProps) {
  return (
    <Text
      style={[
        title.base,
        title.color.get(props.color),
        title.fontSize.get(props.fontSize),
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
import { Title } from './title'

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
