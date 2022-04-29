import {  Col,Meta,Row,Avatar,Card } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ListAnimation = ({ listAnimation }) => {
  const {Meta} = Card


  return (
    <>
      <Row className='home-videos' gutter={[16, 14]}>
        {listAnimation.map(item => {

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={item?.uuid} className="gutter-row" span={6}>
              <Link to={`watch/${item?.uuid}`}>

                <Card
                  bordered={false}
                  hoverable
                  cover={<img alt="example" src={`${item.image}`} />}
                >
                  <Meta
                    avatar={<Avatar src={`${item.author.avatar}`} />}
                    title={item?.title}
                    description={<>
                      <strong>{item.author.name}</strong>
                      <p>{moment(item.created).fromNow()}</p>
                    </>} />

                </Card>
              </Link>
            </Col>

          )
        })}
      </Row>

    </>
  )
}

export default ListAnimation