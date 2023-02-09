import React from 'react'
import Native from 'react-native'

export type ReactNativeElements = {
  View: React.PropsWithChildren<Native.ViewProps>
}

type ReactNativeComponentProps<
  T extends 'View' | React.JSXElementConstructor<any>,
> = T extends React.JSXElementConstructor<infer P>
  ? P
  : T extends 'View'
  ? ReactNativeElements[T]
  : {}

type ReactNativeComponentPropsWithRef<T extends 'View'> =
  T extends React.ComponentClass<infer P>
    ? React.PropsWithoutRef<P> & React.RefAttributes<InstanceType<T>>
    : React.PropsWithRef<ReactNativeComponentProps<T>>

export function createTheme<Theme>(theme: Theme) {
  return function createComponent<Component = 'View'>(
    _component: Component,
    createStyle: (theme: Theme) => unknown,
  ) {
    const style = createStyle(theme)
    // return React.forwardRef<Native.ViewComponent, Native.ViewProps>(
    return React.forwardRef<
      Component extends 'View' | React.ComponentType<any>
        ? ReactNativeComponentPropsWithRef<'View'>
        : {},
      Native.ViewProps
    >((_props, ref) => {
      return React.createElement(Native.View, { ref, style })
    })
  }
}
