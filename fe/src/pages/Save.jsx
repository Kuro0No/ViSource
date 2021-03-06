import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { DeleteOutlined, FolderOpenOutlined } from '@ant-design/icons'
import '../style/Save.scss'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Avatar, Button } from 'antd';
import Meta from 'antd/lib/card/Meta'
import axios from 'axios'


const Save = () => {
    const { user, authTokens } = useAuth()
    const [savedList, setSavedList] = useState([])

     useEffect(() => {
        if(user){

            async function getData() {
                const res = await axios.get(`https://visourcebe.herokuapp.com/api/user/saved-video/${user?.user_id}/`, {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`
                    }
                })
                
                setSavedList(res.data)
            }
            getData()
        }
    }, [])
    const handleDeleteSave = async(item,id) => {
        const res = await axios.delete(`https://visourcebe.herokuapp.com/api/user/saved-video/${user?.user_id}/?delete=${item.saved.uuid}`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
            
        })
        setSavedList( savedList.filter(item => item.id !== id))
       
    }


    return (
        <div className='save-container'>
            {user && savedList.length ===0 && <h5>Empty Video</h5>}
            {!user ?
                <div className='save-bef-loggin'>

                    <div >
                        <FolderOpenOutlined style={{ fontSize: 100 }} />
                        <h5>You need to Login to see your saved video</h5>

                    </div>
                </div>
                :
                <>
                    <div>
                        <Row gutter={[16, 24]}>
                            {savedList.map(item =>
                                <Col  xs={12} sm={8} lg={6}  style={{position:'relative'}} key={item.id} span={6}>
                                    <Button onClick={() => handleDeleteSave(item,item.id)} style={{ position: 'absolute', zIndex: 5, right: '8px'}} type="primary" icon={<DeleteOutlined />} danger >

                                    </Button>
                                    <Link to={`/watch/${item.saved.uuid}`}>
                                        <Card
                                            hoverable

                                            cover={


                                                <img alt="example" src={`http://localhost:8000${item.saved.image}`} />


                                            }

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