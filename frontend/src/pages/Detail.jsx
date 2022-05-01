import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd';
import ReactPlayer from 'react-player'
import axios from 'axios';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Comments from '../components/Comments';
import { Input } from 'antd';
import { Avatar } from 'antd';
import { useAuth } from '../hooks/useAuth';
import DescriptionVideo from '../components/DescriptionVideo';
import RelatedDetail from '../components/RelatedDetail';
import '../style/Detail.scss'


const { TextArea } = Input;
const Detail = () => {
    const { id } = useParams()
    const [detail, setDetail] = useState({})
    const navigate = useNavigate()
    const [cmt, setCmt] = useState(null)
    const [loadSendCmt, setLoadSendCmt] = useState(false)
    const { user } = useAuth()
    const [cmtList, setCmtList] = useState([])
    const [width, setWidth] = useState()
    const [currentLoad, setCurrentLoad] = useState(1)

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://localhost:8000/api/list-videos/${id}/`)
            setDetail(res.data)
        }
        getData()
    }, [id])

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://localhost:8000/api/get-comments/${id}`)
            setCmtList(res.data)
        }
        getData()
    }, [id])
    const handleWriteCmt = () => {
        if (!user) {

            navigate('/login')
        }
    }
    const handleCmt = (e) => {
        setCmt(e.target.value)

    }
    const handleSubmitCmt = async () => {

        if (cmt) {
            setLoadSendCmt(true)
            const res = await axios.post(`http://localhost:8000/api/get-comments/${id}`, {
                content: cmt,
                user: {
                    name: user.name,
                    id: user.user_id,
                    avatar: `/base/media/${user.avatar}`
                },
                post_id: id

            })
            setCmtList([res.data, ...cmtList])
            setCmt(null)

        }

        setLoadSendCmt(false)
    }


    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
    }, [])



    return (
        <div>
            <Row>
                <Col xs={24} sm={24} lg={18} style={{ paddingRight: 20 }} span={18}>
                    <div className='videoDetail-container'>

                        <ReactPlayer  controls width={'100%'} url={`http://localhost:8000${detail?.video}`} />
                    </div>
                    <DescriptionVideo detail={detail} />

                    {(width || window.innerWidth) > 992 &&
                        <div>
                            < Col className='d-flex'>
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
                            <Comments loadSendCmt={loadSendCmt} onhandleSubmitCmt={handleSubmitCmt} setCmtList={setCmtList} cmtList={cmtList} detail={detail} />
                        </div>}
                </Col>
                <Col xs={24} sm={24} lg={6} span={6} style={{ marginBottom: '20px' }} >
                    <RelatedDetail currentLoad={currentLoad} detail={detail} />
                    {/* {(width || window.innerWidth) <=992 &&<Button  style={{width: '100%'}} danger>Load more</Button>} */}
                </Col>



                {(window.innerWidth || width) <= 992 &&
                    <div style={{ width: '100%' }}>
                        < Col span={24} className='d-flex'>
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
                        <Comments loadSendCmt={loadSendCmt} onhandleSubmitCmt={handleSubmitCmt} setCmtList={setCmtList} cmtList={cmtList} detail={detail} />
                    </div>}
            </Row>
        </div>
    )
}

export default Detail