/**
 * @todo: layout
 */
import React from 'react'
import styled from 'styled-components'
import { Button, Layout } from 'antd'
import Stack, { Gutter } from 'components/Stack'

const { Header } = Layout

const Navbar: React.FC<{}> = () => {
  return (
    <HeaderContainer>
      <Stack
        fillParentHeight
        justifyContent="flex-end"
        alignItems="center"
        gutter={Gutter.SMALL}
      >
        <Button>Reset</Button>
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
