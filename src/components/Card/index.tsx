import styled from 'styled-components'

interface Props {
  maxWidth?: number
  minWidth?: number
  width?: string
}

const Card = styled.div<Props>`
  background: white;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 40px 30px;
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}px;`}
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}px;`}
  ${({ width }) => width && `width: ${width};`}
`

export default Card
