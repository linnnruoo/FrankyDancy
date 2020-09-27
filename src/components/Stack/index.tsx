import styled from 'styled-components'

export enum Gutter {
  NONE = '0px',
  MINI = '4px',
  EXTRA_SMALL = '8px',
  SMALL = '12px',
  REGULAR = '18px',
  AVERAGE = '30PX',
  MEDIUM = '48px',
  LARGE = '56px',
  EXTRA_LARGE = '64px',
}

interface Props {
  vertical?: boolean
  gutter?: Gutter
  center?: boolean
  alignItems?: string
  justifyContent?: string
  fillParentWidth?: boolean
  fillParentHeight?: boolean
  width?: string
}

const Stack = styled.div<Props>`
  display: flex;
  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};

  ${({ fillParentHeight }) => fillParentHeight && 'height: 100%;'}
  ${({ fillParentWidth }) => fillParentWidth && 'width: 100%;'}
  ${({ width }) => width && `width: ${width}`}

  ${({ center }) => center && 'align-items: center; justify-content: center;'}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}

  & > * {
    margin-bottom: ${({ vertical, gutter }) =>
      !vertical ? Gutter.NONE : gutter};
    margin-right: ${({ vertical, gutter }) =>
      vertical ? Gutter.NONE : gutter};
  }

  & > *:last-child {
    ${({ vertical }) =>
      vertical
        ? `margin-bottom: ${Gutter.NONE};`
        : `margin-right: ${Gutter.NONE};`}
  }
`

export default Stack
