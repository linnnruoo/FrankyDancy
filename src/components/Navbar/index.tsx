/**
 * @todo: layout
 */
import React from 'react'
import styled from 'styled-components'
import { Button, Layout } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'

import * as routes from 'router/routes'
import Stack, { Gutter } from 'components/Stack'

const { Header } = Layout

type Props = OwnProps & RouteComponentProps

interface OwnProps {
  setReset: (reset: boolean) => void
  endDanceSession: () => void
}

const Navbar: React.FC<Props> = ({ setReset, endDanceSession, history }) => {
  const handleDanceSession = () => {
    // End the current dance session
    // Display go back home option?
    // set the session ended to be true?
    // stop listening to all the data
    // able to view the data ?
    // FOR NOW, navigate back to home page
    endDanceSession()
    history.push(routes.MAIN)
  }
  return (
    <HeaderContainer>
      <Stack
        fillParentHeight
        justifyContent="flex-end"
        alignItems="center"
        gutter={Gutter.SMALL}
      >
        <Button onClick={() => setReset(true)}>Reset</Button>
        <Button onClick={handleDanceSession} danger>
          Stop
        </Button>
      </Stack>
    </HeaderContainer>
  )
}

const HeaderContainer = styled(Header)`
  background: #fff;
  color: #000;
  height: 55px;
`

export default withRouter(Navbar)
