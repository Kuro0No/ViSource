import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import ReactPlayer from 'react-player'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments';

const Detail = () => {
    const {id} =useParams()
    const [detail,setDetail] =useState(null)
    
    useEffect(() => {
        async function getData(){
            const res=await axios.get(`http://localhost:8000/api/list-videos/${id}/`)
            setDetail(res.data)
        }
        getData()
    },[id])
    // console.log(detail)


    return (
        <div>
            <Row>
                <Col span={18}>
                    <ReactPlayer height={'550px'} controls width={'100%'} url={`http://localhost:8000${detail?.video}`} />
                    <div style={{padding:'100px'}}></div>
                    <Comments detail={detail}/>
                </Col>
                <Col span={6}>col</Col>
            </Row>
        </div>
    )
}

export default Detail