/**
 * @todo: layout
 */
import React from 'react'
import styled from 'styled-components'
import { Button, Layout } from 'antd'
import Stack, { Gutter } from 'components/Stack'

interface Props {
  setReset: (reset: boolean) => void
}

const { Header } = Layout

const Navbar: React.FC<Props> = ({ setReset }) => {
  return (
    <HeaderContainer>
      <Stack
        fillParentHeight
        justifyContent="flex-end"
        alignItems="center"
        gutter={Gutter.SMALL}
      >
        <Button onClick={() => setReset(true)}>Reset</Button>
        <Button danger>Stop</Button>
      </Stack>
    </HeaderContainer>
  )
}

const HeaderContainer = styled(Header)`
  background: #fff;
  color: #000;
  height: 55px;
`

export default Navbar
