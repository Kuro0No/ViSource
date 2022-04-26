import { Avatar, Card, Col, Image } from 'antd'
import React, { memo, useEffect } from 'react'
import { Empty } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../style/Search.scss'

const { Meta } = Card;

const Search = ({ SearchList, onSearchHandle, check }) => {
  const location = useLocation()
  let params = new URLSearchParams(location.search);
  let search = params.get('search')

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`http://localhost:8000/api/search-video/?search=${search}`)
      onSearchHandle(res.data)
    }
    getData()
  }, [search])
  return (
    <div className='search-container'>
      {SearchList.results && SearchList.results.map(item => {

        return <Card bordered={false} className='search-item-group' key={item.uuid} style={{ width: '100%', marginTop: 16 }}>

          <Meta

            avatar={
              <Image
                preview={false}
                src={item.image}

              />
           }
            title={item.title}
            description={<>
              <div style={{ display: 'flex', padding: '5px 0' }}>
                <Avatar src={item.author.avatar} />
                <strong style={{ padding: '0 7px', }}>{item.author.name}</strong>
              </div>
              <span className='description'>{item.description}</span>
            </>}
          />


        </Card>
      })}

      {SearchList.results && SearchList.results.length === 0 &&
        <Empty image={'https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png'}
          imageStyle={{ height: '500px', width: '100%' }}
          description='No data found'
        />}


    </div>
  )
}

export default memo(Search)