/**
 * @todo: layout
 */
import React from 'react'

import Navbar from 'components/Navbar'
import SidePanel from 'components/SidePanel'

import RealTimeChart from './RealTimeChart'
import { Layout } from 'antd'

const Analytics: React.FC<{}> = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Navbar />
      <Layout>
        <SidePanel />
        <Layout style={{ padding: '0 24px 24px' }}>
          <h1>qw qweqwe qw </h1>
          <h1>qw qweqwe qw </h1>
          <RealTimeChart />
          <h1>qw qweqwe qw </h1>
          <h1>qw qweqwe qw </h1>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Analytics
