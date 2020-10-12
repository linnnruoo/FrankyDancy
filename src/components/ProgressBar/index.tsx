import React from 'react'
import { Progress } from 'antd'

import { BUTTERSCOTCH, DAISY_WHITE } from 'common/colors'
import { Text } from 'components/Typography'

interface Props {
  percent: number
  count: number
}

const ProgressBar: React.FC<Props> = ({ percent, count }) => {
  return (
    <Progress
      strokeColor={BUTTERSCOTCH}
      trailColor={DAISY_WHITE}
      percent={percent}
      format={(_) => <Text>{count}</Text>}
    />
  )
}

export default ProgressBar
