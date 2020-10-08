import React from 'react'
import styled from 'styled-components'

import Stack from 'components/Stack'
import { Text } from 'components/Typography'

const Logo = () => {
  return (
    <LogoContainer>
      <LogoName>Dance Dance !</LogoName>
    </LogoContainer>
  )
}

const LogoContainer = styled(Stack)`
  padding: 80px 0px 0px;
`

const LogoName = styled(Text)`
  font-family: 'Bangers', cursive;
  font-size: 200px;
`

export default Logo
