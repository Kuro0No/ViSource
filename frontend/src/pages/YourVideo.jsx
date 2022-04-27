import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { FolderOpenOutlined, PlaySquareOutlined } from '@ant-design/icons'
import '../style/YourVideo.scss'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta'
import axios from 'axios'


const YourVideo = () => {
    const { user, authTokens } = useAuth()
    const [yourVideoListDetail, setYourVideoListDetail] = useState({})
    const [yourVideoList, setYourVideoList] = useState([])
    


    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://localhost:8000/api/user/your-videos/${user.user_id}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })
            setYourVideoListDetail(res.data)
            setYourVideoList(res.data.results)
        }
        getData()
    }, [])


    return (
        <div className='yours-container'>
            {!user ?
                <div className='yours-bef-loggin'>

                    <div >
                        <PlaySquareOutlined style={{ fontSize: 100, display: 'flex', justifyContent: 'center' }} />
                        <h5>You need to Login to see your your video</h5>

                    </div>
                </div>
                :
                <>
                    <div>
                        <Row gutter={[16, 24]}>
                            { yourVideoList.map(item => {

                                return <Col key={item.id} span={6}>
                                    <Link to={`/watch/${item.uuid}`}>
                                        <Card
                                            hoverable

                                            cover={<img alt="example" src={`http://localhost:8000${item.image}`} />}

                                        >
                                            <Meta title={item.title}
                                                description={item.description}
                                                avatar={<Avatar src={`http://localhost:8000${item.author.avatar}`} />}
                                            />
                                        </Card>
                                    </Link>
                                </Col>
                                
                            })}
                            
                        </Row>
                    </div>
                </>
            }
        </div>
    )
}

export default YourVideo