import { createElement, ComponentType, forwardRef } from 'react'

export function createTheme<Theme>(theme: Theme) {
  function styled<
    Style,
    T = any,
    Component extends ComponentType<T> = ComponentType<any> extends ComponentType<
      infer Props
    >
      ? ComponentType<Props>
      : never,
    Props = Component extends ComponentType<infer Props> ? Props : never,
  >(Component: Component, fn: (theme: Theme) => Style) {
    const style = fn(theme)
    return forwardRef<Component, Props>((_props, ref) =>
      createElement(Component, { style, ref }),
    )
  }
  return styled
}
