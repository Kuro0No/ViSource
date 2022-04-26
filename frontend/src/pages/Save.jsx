import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { FolderOpenOutlined } from '@ant-design/icons'
import '../style/Save.scss'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta'
import axios from 'axios'


const Save = () => {
    const { user, authTokens } = useAuth()
    const [savedList, setSavedList] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://localhost:8000/api/user/saved-video/${user.user_id}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })
            setSavedList(res.data)
        }
        getData()
    }, [])


    return (
        <div className='save-container'>
            {!user ?
                <div className='save-bef-loggin'>

                    <div >
                        <FolderOpenOutlined style={{ fontSize: 100 }} />
                        <h5>You need to Login to see your saved video</h5>
                        <Link type='button' className='btn btn-outline-primary' to='/login' danger >
                            Login
                        </Link>
                    </div>
                </div>
                :
                <>
                    <div>
                        <Row gutter={[16, 24]}>
                            {savedList.map(item =>
                                <Col key={item.id} span={6}>
                                    <Link to={`/watch/${item.saved.uuid}`}>
                                        <Card
                                            hoverable

                                            cover={<img alt="example" src={`http://localhost:8000${item.saved.image}`} />}

                                        >
                                            <Meta title={item.saved.title}
                                                description={item.saved.description}
                                                avatar={<Avatar src={`http://localhost:8000${item.saved.author.avatar}`} />}
                                            />
                                        </Card>
                                    </Link>
                                </Col>
                            )}
                        </Row>
                    </div>
                </>
            }
        </div>
    )
}

export default Save