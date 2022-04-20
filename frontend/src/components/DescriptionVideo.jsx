import React, { useRef, useState } from 'react'
import '../style/DescriptionVideo.scss'
import { Divider, Tag } from 'antd';
import moment from 'moment'
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { Row, Col } from 'antd';
import { Button, Modal } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { InfoCircleOutlined } from '@ant-design/icons'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const DescriptionVideo = ({ detail }) => {
    const { user } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()


    const [isSeemore, setIsSeeMore] = useState(false)
    const handleOkDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/list-videos/${id}/`)
            setIsModalVisible(false)
            navigate('/')
        } catch {
            alert('Failed to delete this video')
        }
    }
    const handleSubscribe =async () => {
        const res = await axios.post(`http://127.0.0.1:8000/api/list-subcriber/${detail.author.id}/`, {
            username: user.name,
            id: user.user_id,
            avatar: user.avatar,
            subcriber: user.subcriber
        })
    }

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

                            description={
                                <>
                                    <p style={{color: '#606060', marginTop: '-10px'}}>{detail?.author?.subcriber} {detail?.author?.subcriber < 2 ?'Subcriber' : 'Subcribers' }</p>
                                    <p style={isSeemore ? { display: 'inherit' } : { display: '-webkit-box' }}>
                                        {detail?.description}
                                    </p>
                                </>
                            }

                        />

                        <h6 onClick={() => setIsSeeMore(!isSeemore)} >{isSeemore ? 'See More' : 'See Less'}</h6>




                    </Card>
                </Col>
                <Col style={{ textAlign: 'right' }} span={6}>
                    {user.user_id == detail?.author?.id ?
                        <>

                            <Button onClick={() => setIsModalVisible(true)} type="primary" danger>
                                Delete Video
                            </Button>
                            <Modal title="You are trying to delete this video." visible={isModalVisible} onOk={handleOkDelete} onCancel={() => setIsModalVisible(false)}>
                                <>
                                    <InfoCircleOutlined className='me-2' style={{ fontSize: '40px' }} />
                                    <span>Are you sure to delete this video?</span>
                                </>
                            </Modal>
                        </>
                        : <>
                            <Button onClick={handleSubscribe} type="primary" >
                                Subscribe
                            </Button>
                        </>

                    }

                </Col>
            </Row>
        </div >

    )
}

export default DescriptionVideo