import React from 'react'
import Native from 'react-native'
import { F } from 'ts-toolbelt'

type GetComponentType<Component> = Component extends 'View'
  ? // | React.ComponentType<any>
    // | React.ComponentType<Native.ViewComponent>
    // ? React.ComponentType<Component>
    // React.ComponentType<Native.ViewComponent>
    Native.ViewComponent
  : // Native.propswith
    never

type GetComponentProps<Component> = Component extends
  | 'View'
  | React.ComponentType<infer Props>
  ? Props
  : never

export function createTheme<Theme>(theme: Theme) {
  return function createComponent<Component = 'View'>(
    component: F.Narrow<Component>,
    createStyle: (theme: Theme) => unknown,
  ) {
    const style = createStyle(theme)
    //                ^?
    return React.forwardRef<
      GetComponentType<F.Narrow<Component>>,
      // ^?
      // Native.ViewComponent,
      // Native.ViewComponent,
      GetComponentProps<F.Narrow<Component>>
    >((_props, ref) => {
      if (typeof component === 'string') {
        //          ^?
        // TODO
        return React.createElement(Native.View, { ref, style }) // ^?
        //            ^?
      }
      return null
    }) // ^?
  } // ^?
}

// ------------

function main<Component = 'View'>(component: F.Narrow<Component>) {
  return function fn<T = Component extends 'View' ? Component : never>(
    t: F.Narrow<T>,
  ) {
    return t
  }
}

const r = main('View')
// ^?
r('View')
// ^?
