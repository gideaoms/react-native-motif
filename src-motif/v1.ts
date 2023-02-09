// import { ColorValue, ViewProps, ViewStyle } from 'react-native'
// import styled, { css } from 'styled-components/native'

// styled.Image`
//   background-color: red;
//   color: red;
// `

// type DefaultTheme = {
//   colors?: {
//     [K in string]: string
//   }
// }

// export function createTheme<Theme extends DefaultTheme>(theme: Theme) {
//   const View = styled.View<
//     ViewProps & {
//       style: ViewStyle & {
//         backgroundColor?: 'primary'
//       }
//     }
//   >`
//     ${({ style }) =>
//       style.backgroundColor &&
//       theme.colors &&
//       style.backgroundColor in theme.colors &&
//       css`
//         background-color: ${theme.colors[style.backgroundColor]};
//       `}
//   `
//   return { View }
// }
