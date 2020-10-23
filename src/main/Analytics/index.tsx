/**
 * @todo: layout
 */
import React from 'react'
import { Layout } from 'antd'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'

import { endDanceSession } from 'store/dance/actions'
import {
  groupActiveDancerProfilesByDancerNo,
  mapDancerNamesToPositions,
} from 'store/dance/selector'
import Navbar from 'components/Navbar'
import SidePanel from 'components/SidePanel'
import Stack, { Gutter } from 'components/Stack'

import CurrentMove from './CurrentMove'
import CurrentPosition from './CurrentPosition'
import RealTimeChart from './RealTimeChart'
import CorrectPositions from './CorrectPositionsHitPanel'
import TotalMovesPanel from './TotalMovesPanel'

type Props = CombinedProps<typeof mapStateToProps, typeof mapDispatchToProps>

const Analytics: React.FC<Props> = ({
  dancerProfiles,
  dancerNames,
  endDanceSession,
}) => {
  // reset sensor data
  const [toReset, setReset] = React.useState(false)
  return (
    <Layout style={{ height: '100vh' }}>
      <Navbar setReset={setReset} endDanceSession={endDanceSession} />
      <Layout>
        <SidePanel />
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Stack gutter={Gutter.SMALL} vertical>
            <Stack gutter={Gutter.SMALL}>
              <CurrentPosition dancerProfiles={dancerProfiles} />
              <CurrentMove />
            </Stack>
            <RealTimeChart toReset={toReset} setReset={setReset} />
            <Stack gutter={Gutter.SMALL}>
              <CorrectPositions dancerNames={dancerNames} />
              <TotalMovesPanel />
            </Stack>
          </Stack>
        </Layout>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (s: RootState) => ({
  dancerProfiles: groupActiveDancerProfilesByDancerNo(s),
  dancerNames: mapDancerNamesToPositions(s),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      endDanceSession: endDanceSession,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
