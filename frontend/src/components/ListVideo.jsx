import React from 'react'
import { Card } from 'antd';
import UseFetch from '../hooks/UseFetch';
import { Row, Col, Divider } from 'antd';
import '../style/ListVideo.scss'
import { Link } from 'react-router-dom'

const ListVideo = () => {
    const { Meta } = Card;
    const { list } = UseFetch(`http://127.0.0.1:8000/api/list-videos/`)
    console.log(list)

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
                                    <Meta title={item?.title} description={item.description} />
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