import 'styled-component'

import { theme } from 'styles'

type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
