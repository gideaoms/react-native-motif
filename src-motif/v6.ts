import React from 'react'
import Native from 'react-native'

type GetStyle<Props> = Props extends { style?: Native.StyleProp<infer Style> }
  ? Style
  : never

export function createTheme<Theme>(theme: Theme) {
  return function createComponent<
    Component extends React.ComponentType<any>,
    Props = Component extends React.ComponentType<infer Props> ? Props : never,
  >(component: Component, createStyle: (theme: Theme) => GetStyle<Props>) {
    const style = createStyle(theme)
    return React.forwardRef<Component, Props>((_props, ref) =>
      React.createElement(component, { ref, style }),
    )
  }
}
