# Motif (beta)

This is the initial version of Motif, a React Native Library to style components.

src/motif.tsx

```tsx
import { createTheme } from '@/motif'

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

src/app.tsx

```tsx
export function App() {
  return <ThemeProvider value={theme}>...</ThemeProvider>
}
```

src/components/box.tsx

```tsx
import { View } from 'react-native'
import { styled } from '@/styled'

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
  },
}))
```

src/app.tsx

```
export function App() {
  return (
    <Box padding="md">
      <Text>Hello world</Text>
    </Box>
  )
}
```
