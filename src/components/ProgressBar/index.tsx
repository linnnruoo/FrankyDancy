import React from 'react'
import { Progress } from 'antd'

import { BUTTERSCOTCH, DAISY_WHITE } from 'common/colors'
import { Text } from 'components/Typography'

interface Props {
  percent: number
}

const ProgressBar: React.FC<Props> = ({ percent }) => {
  return (
    <Progress
      strokeColor={BUTTERSCOTCH}
      trailColor={DAISY_WHITE}
      percent={percent}
      format={(_) => <Text>{percent}</Text>}
    />
  )
}

export default ProgressBar
