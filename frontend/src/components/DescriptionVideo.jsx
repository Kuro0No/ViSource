import React from 'react'
import '../style/DescriptionVideo.scss'
import { Divider, Tag } from 'antd';
import moment from 'moment'
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { Row, Col } from 'antd';


const DescriptionVideo = ({ detail }) => {
    console.log(detail)
    return (
        <div className='description-video-container '>
            {detail.length > 0 && detail.category.map((item, i) => {
                return <Tag key={i} color="#2db7f5">{item}</Tag>

            })

            }
            <Divider orientation="left" orientationMargin="0">
                {detail?.title}

            </Divider>
            <p style={{ color: '#606060' }}>{moment(detail?.created).subtract(10, 'days').calendar()}</p>
          
            <Row>
                <Col span={18}>
                    <Card
                        style={{ paddingTop: 20 }}
                        bordered={false}
                        className='description-detail '
                    >

                        <Card.Meta

                            avatar={<Avatar src={`http://localhost:8000${detail?.author?.avatar}`} />}
                            title={detail?.author?.name}
                            description={detail?.description}
                        />

                    </Card>
                </Col>
                <Col span={6}>

                </Col>
            </Row>
        </div >

    )
}

export default DescriptionVideo