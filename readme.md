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
import { VariantProps, styled, variant } from 'react-native-motif'
import { theme } from '../motif'

const title = styled({
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
})

export type TitleProps = {
  children: string | string[]
} & VariantProps<typeof title>

export function Title(props: TitleProps) {
  return (
    <Text
      style={[
        variant(title.variants.color, props.color),
        variant(title.variants.fontSize, props.fontSize),
      ]}
    >
      {props.children}
    </Text>
  )
}
```

```tsx
// src/components/button.tsx

import { TouchableOpacity } from 'react-native'
import { VariantProps, styled, variant } from 'react-native-motif'
import { theme } from '../motif'

const button = styled({
  base: {
    padding: 10,
    backgroundColor: theme.colors.primary,
  },
  variants: {
    full: {
      true: {
        width: '100%',
      },
    },
  },
})

export type ButtonProps = {
  children: ReactNode
  onPress: () => void
} & VariantProps<typeof button>

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[button.base, variant(button.variants.full, props.full)]}
    >
      {props.children}
    </TouchableOpacity>
  )
}
```

```tsx
// src/app.tsx

import { Text } from 'react-native'
import { ThemeProvider } from './motif'
import { Button } from './components/button'
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
      <Button>
        <Text>
          Press me
        </Text>
      </Button>
    </ThemeProvider>
  )
}
```
