import React from 'react'
import { Card } from 'antd';
import { Layout } from 'antd';
import ListVideo from './ListVideo';

const ContentHome = () => {
    const {Content} = Layout
  return (
    <Content>
        <ListVideo/>
    </Content>
  )
}

export default ContentHome