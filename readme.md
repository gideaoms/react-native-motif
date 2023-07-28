# React Native Motif

React Native Motif is a React Native Library to build UI components. It is inspired by [Stitches](https://stitches.dev/), but created from scratch using [StyleSheet](https://reactnative.dev/docs/stylesheet).

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
// src/app.tsx

import { View, Text } from 'react-native'
import { styled, ThemeProvider, theme } from '@/motif'

const box = styled(theme => ({
  base: {
    width: '100%',
  },
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

const text = styled(theme => ({
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

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        style={box({
          background: 'secondary',
          style: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          },
        })}
      >
        <Text
          style={text({
            color: 'primary',
            fontSize: 'md',
            style: {
              margin: 20,
            },
          })}
        >
          Hello world
        </Text>
      </Box>
    </ThemeProvider>
  )
}
```

### Soon:

- `defaultVariants`
- `VariantProps<typeof component>`
