import React from 'react'

import Card from 'components/Card'

// import Chart from './ChartjsTest'
import Chart from './Chart'

interface Props {
  toReset: boolean
  setReset: (reset: boolean) => void
}

const RealTimeChart: React.FC<Props> = ({ toReset, setReset }) => {
  // TODO hardcode 3 datasets

  const fetchData = () => {}

  React.useEffect(fetchData, [])

  return (
    <Card width="100%">
      <Chart toReset={toReset} setReset={setReset} />
    </Card>
  )
}

export default RealTimeChart
