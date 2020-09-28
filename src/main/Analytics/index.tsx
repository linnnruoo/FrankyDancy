/**
 * @todo: layout
 */
import React from 'react'
import { Layout } from 'antd'

import Navbar from 'components/Navbar'
import SidePanel from 'components/SidePanel'
import Stack, { Gutter } from 'components/Stack'

import RealTimeChart from './RealTimeChart'
import CurrentMove from './CurrentMove'
import CurrentPosition from './CurrentPosition'
import CorrectPositions from './CorrectPositions'
import CorrectMoves from './CorrectMoves'

const Analytics: React.FC<{}> = () => {
  /**
   * @todo: set up socket connections here?
   */
  return (
    <Layout style={{ height: '100vh' }}>
      <Navbar />
      <Layout>
        <SidePanel />
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Stack gutter={Gutter.SMALL} vertical>
            <Stack gutter={Gutter.SMALL}>
              <CurrentPosition />
              <CurrentMove />
            </Stack>
            <RealTimeChart />
            <Stack gutter={Gutter.SMALL}>
              <CorrectPositions />
              <CorrectMoves />
            </Stack>
          </Stack>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Analytics
