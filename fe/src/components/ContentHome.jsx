import React from 'react'
import { Card } from 'antd';
import { Layout } from 'antd';
import ListVideo from './ListVideo';
import Music from './Music';
import UseFetch from '../hooks/UseFetch';
import ListAnimation from './ListAnimation';

const ContentHome = () => {
  const { Content } = Layout
  const { list, listMusic, listAnimation } = UseFetch(`https://visourcebe.herokuapp.com/api/list-videos/`, `https://visourcebe.herokuapp.com/api/search-video/?genres=1`, `https://visourcebe.herokuapp.com/api/search-video/?genres=3`)

  return (
    <Content >
      <>
        <h3>Newest</h3>
        <ListVideo list={list} />
      </>
      <>
        <h3>Music</h3>
        <Music listMusic={listMusic} />

      </>
      <>
        <h3>Animation</h3>
        <ListAnimation listAnimation={listAnimation} />
      </>
    </Content>
  )
}

export default ContentHome