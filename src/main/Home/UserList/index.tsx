import { Avatar, List } from 'antd'
import { User } from 'common/models'
import Stack from 'components/Stack'
import React from 'react'
import _ from 'lodash'

interface Props {
  users: Dict<User>
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <Stack>
      <List
        dataSource={_.values(users)}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.name}</a>}
            />
            <div>Content</div>
          </List.Item>
        )}
      />
    </Stack>
  )
}

export default UserList
