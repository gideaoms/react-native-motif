import React from 'react'
import { View, ViewComponent, ViewProps } from 'react-native'

type GetProps<C> = C extends React.ComponentType<infer P> ? P : never

// type A<B> = B extends ViewComponent ? B['props']['style']

export function createTheme<Theme>(theme: Theme) {
  return function createComponent<Component extends React.ComponentType>(
    component: Component,
    createStyle: (theme: Theme) => Component,
  ) {
    const style = createStyle(theme)
    return React.forwardRef<Component, GetProps<Component>>((_props, ref) =>
      React.createElement<ViewProps>(component, { ref, style } as any),
    )
  }
}

const result = React.createElement(View)
//       ^?
