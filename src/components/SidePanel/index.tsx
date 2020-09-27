import React from 'react'
import { Layout } from 'antd'
import Stack from 'components/Stack'

const { Sider } = Layout

const SidePanel: React.FC = () => {
  return (
    <Sider theme="light" width={400}>
      <Stack></Stack>
    </Sider>
  )
}

export default SidePanel
