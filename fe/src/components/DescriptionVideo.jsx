import React, { useEffect, useRef, useState } from 'react'
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
    const { user, authTokens } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()

    const [isSeemore, setIsSeeMore] = useState(true)
    const handleOkDelete = async () => {
        try {
            await axios.delete(`https://visourcebe.herokuapp.com/api/list-videos/${id}/`)
            setIsModalVisible(false)
            navigate('/')
        } catch {
            alert('Failed to delete this video')
        }
    }
    const handleSaveVideo = async () => {
        if(user){
            try {
                const res = await axios.post(`https://visourcebe.herokuapp.com/api/user/saved-video/${user.user_id}/`, {
                    user: user,
                    saved: detail
                },
                    {
                        headers: {
                            'Authorization': `Bearer ${authTokens.access}`
                        }
                    }
                )
                if (res.status === 208) {
                    alert('This video already exist in your saved video')
                } else {
                    alert('success')
                }
            } catch (error) {
                alert(error)
            }
        } else {
            navigate('/login')
        }
    }

    const menu =(
        
        <Menu>
            {user && user.user_id === detail?.author?.id && <Menu.Item onClick={() => setIsModalVisible(true)}>
                Delete Video
            </Menu.Item>}
            <Menu.Item onClick={handleSaveVideo}>
                Save Video
            </Menu.Item>
        </Menu>
    );
    


    return (
        <div className='description-video-container '>
            {Object.keys(detail).length > 0 && detail.genres.map((item, i) => {
                return <Tag key={i} color="#2db7f5">{item.genres}</Tag>

            })
            }
            <Divider orientation="left" orientationMargin="0">
                {detail?.title}

            </Divider>
            <p style={{ color: '#606060' }}>{moment(detail?.created).subtract(10, 'days').calendar()}</p>

            <Row>
                <Col xs={15} span={18}>
                    <Card
                        // style={{ paddingTop: 20 }}
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
                <Col style={{ textAlign: 'right' }} xs={9} span={6}>
                    {user && user.user_id == detail?.author?.id &&
                        <Modal title="You are trying to delete this video." visible={isModalVisible} onOk={handleOkDelete} onCancel={() => setIsModalVisible(false)}>
                            <>
                                <InfoCircleOutlined className='me-2' style={{ fontSize: '40px' }} />
                                <span>Are you sure to delete this video?</span>
                            </>
                        </Modal>}



                    <Dropdown trigger={['click']} overlay={ menu}>
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