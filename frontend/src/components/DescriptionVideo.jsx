import React, { useRef, useState } from 'react'
import '../style/DescriptionVideo.scss'
import { Divider, Dropdown, Menu, Space, Tag } from 'antd';
import moment from 'moment'
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { Row, Col } from 'antd';
import { Button, Modal } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const DescriptionVideo = ({ detail }) => {
    const { user ,authTokens} = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()


    const [isSeemore, setIsSeeMore] = useState(true)
    const handleOkDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/list-videos/${id}/`)
            setIsModalVisible(false)
            navigate('/')
        } catch {
            alert('Failed to delete this video')
        }
    }
    const handleSaveVideo = () => {
        try {
            axios.post(`http://localhost:8000/api/user/saved-video/${user.user_id}/`, {
                user: user,
                saved:detail
            },
                {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                }
            )
            alert('Success')
        } catch(error){
            alert(error)
        }
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={() => setIsModalVisible(true)}>
                Delete Video
            </Menu.Item>
            <Menu.Item onClick={handleSaveVideo}>
                Save Video
            </Menu.Item>
        </Menu>
    );

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
                                    <p style={{ color: '#606060', marginTop: '-10px' }}> Author</p>
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
                    {user && user.user_id == detail?.author?.id &&
                        <Modal title="You are trying to delete this video." visible={isModalVisible} onOk={handleOkDelete} onCancel={() => setIsModalVisible(false)}>
                            <>
                                <InfoCircleOutlined className='me-2' style={{ fontSize: '40px' }} />
                                <span>Are you sure to delete this video?</span>
                            </>
                        </Modal>}



                    <Dropdown trigger={['click']} overlay={menu}>
                        <Button>
                            <Space>
                                Handle
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </Col>
            </Row>
        </div >
    )
}

export default DescriptionVideo