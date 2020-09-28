import { Typography } from 'antd'
import styled from 'styled-components'

import { DARK_BLUE } from 'common/colors'

const AntText = Typography.Text

interface Props {
  color?: string
  fontWeight?: string | number
  fontSize?: number
  wordBreak?: string
}

const Text = styled(AntText)<Props>`
  color: ${({ color }) => color || DARK_BLUE};
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}px`};
  ${({ wordBreak }) => wordBreak && `word-break: ${wordBreak}`};
`

const Title = styled(Text)<Props>`
  color: ${({ color }) => color || DARK_BLUE};
  font-weight: 600;
  font-size: 18px;
`

export { Text, Title }
