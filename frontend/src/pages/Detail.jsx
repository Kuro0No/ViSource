import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd';
import ReactPlayer from 'react-player'
import axios from 'axios';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Comments from '../components/Comments';
import { Input } from 'antd';
import { Avatar } from 'antd';
import { useAuth } from '../hooks/useAuth';


const { TextArea } = Input;
const Detail = () => {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)
    const navigate = useNavigate()
    const [cmt, setCmt] = useState(null)
    const [loadSendCmt,setLoadSendCmt] = useState(false)
    const {user} = useAuth()
    console.log(user)

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://localhost:8000/api/list-videos/${id}/`)
            setDetail(res.data)
        }
        getData()
    }, [id])
    // console.log(detail)
    const handleWriteCmt = () => {
        if (!user) {

            navigate('/login')
        }
    }
    const handleCmt = (e) => {
        setCmt(e.target.value)

    }
    const handleSubmitCmt =async () => {
        setLoadSendCmt(true)
        const res = axios.post(`http://localhost:8000/api/get-comments/${id}`,{
            content: cmt,
            user:{
                name: user.name,
                id: user.user_id,
                avatar : `/base/media/${user.avatar}`
            },
            post_id: id

        })
        setLoadSendCmt(false)
    }
   


    return (
        <div>
            <Row>
                <Col span={18}>
                    <ReactPlayer height={'550px'} controls width={'100%'} url={`http://localhost:8000${detail?.video}`} />
                    <div style={{ padding: '100px' }}></div>
                    <Col className='d-flex'>

                        <Avatar className='me-3' src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwbGozsS9QP10p16rZiCrQD0koXVkI4c7LwUHab9dkmFRcN0VqCkB37f2y0EnySItwykg&usqp=CAU`} />

                        <div style={{ width: '100%' }}>
                            <TextArea
                                onPressEnter={handleSubmitCmt}
                            value={cmt}
                            onChange={handleCmt}
                            onFocus={handleWriteCmt}
                            placeholder="Autosize height with minimum and maximum number of lines"
                            autoSize={{ minRows: 2, maxRows: 5 }}
                            />
                            {user && <Button loading={loadSendCmt} onClick={handleSubmitCmt} className='my-2' shape='round' type='primary'>Send</Button>}
                        </div>
                    </Col>
                    <Comments detail={detail} />
                </Col>
                <Col span={6}>col</Col>
            </Row>
        </div>
    )
}

export default Detail