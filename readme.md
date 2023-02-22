# React Native Motif

React Native Motif is a React Native Library to build UI components. It is inspired by [Stitches](https://stitches.dev/), but created from scratch using [StyleSheet](https://reactnative.dev/docs/stylesheet).
UI components are migrating to new way: UI declarative. eg: Stitches, ChakraUI, Flutter, Swift UI.
That is the best way I think we can create UI using React Native, there is no reason to separate style and logic.

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
  spaces: {
    sm: 5,
    md: 10,
  },
})
```

```tsx
// src/components/box.tsx

import { View } from 'react-native'
import { styled } from '../../motif'

export const Box = styled(View, theme => ({
  width: '100%',
  variants: {
    padding: {
      md: {
        padding: theme.spaces.md,
      },
      sm: {
        padding: theme.spaces.sm,
      },
    },
    background: {
      primary: {
        backgroundColor: theme.colors.primary,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
      },
    },
  },
}))
```

```tsx
// src/components/text.tsx

import { Text as BaseText } from 'react-native'
import { styled } from '../../motif'

export const Text = styled(BaseText, theme => ({
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
}))
```

```tsx
// src/app.tsx

import { ThemeProvider, theme } from './motif'
import { Box } from './components/box'
import { Text } from './components/text'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        background="secondary"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
      >
        <Text
          color="primary"
          fontSize="md"
        >
          Hello world
        </Text>
      </Box>
    </ThemeProvider>
  )
}
```

# Plans for the future

1. add default variants
2. style container
