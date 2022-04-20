import React from 'react'
import { Card } from 'antd';
import UseFetch from '../hooks/UseFetch';
import { Row, Col, Divider,Avatar } from 'antd';
import '../style/ListVideo.scss'
import { Link } from 'react-router-dom'
import moment from 'moment';


const ListVideo = () => {
    const { Meta } = Card;
    const { list } = UseFetch(`http://127.0.0.1:8000/api/list-videos/`)

    return (
        <>
            <Row gutter={[16, 24]}>
                {list.map(item => {

                    return (
                        <Col key={item?.uuid} className="gutter-row home-videos" span={6}>
                            <Link  to={`watch/${item?.uuid}`}>

                                <Card
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