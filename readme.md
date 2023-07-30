# React Native Motif

Have fun creating UI for React Native.

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

export type TitleProps = VariantProps<typeof title> & {
  children: string
}

export function Title(props: TitleProps) {
  return (
    <Text
      style={[
        title.base,
        title.color[props.color!],
        title.fontSize[props.fontSize!],
      ]}
    >
      {props.children}
    </Text>
  )
}
```

```tsx
// src/app.tsx

import { ThemeProvider, theme } from './motif'
import { Title } from './title'

export function App() {
  return (
    <ThemeProvider theme={theme}>
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
