import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import UseFetch from '../hooks/UseFetch';
import { Row, Col, Divider, Avatar } from 'antd';
import '../style/ListVideo.scss'
import { Link } from 'react-router-dom'
import moment from 'moment';


const ListVideo = ({list}) => {
    const { Meta } = Card;
    

    

    




    return (
        <>
            <Row className='home-videos' gutter={[16, 14]}>
                {list.map(item => {

                    return (
                        <Col xs={24} sm={12} md={8} lg={6} key={item?.uuid} className="gutter-row" span={6}>
                            <Link to={`watch/${item?.uuid}`}>

                                <Card
                                    bordered={false}
                                    hoverable
                                    cover={<img alt="example" src={`http://localhost:8000${item.image}`} />}
                                >
                                    <Meta
                                        avatar={<Avatar src={`http://localhost:8000${item.author.avatar}`} />}
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

export default ListVideo