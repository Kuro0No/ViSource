import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../style/RelatedVideo.scss'
import moment from 'moment';

const { Meta } = Card;

const RelatedDetail = ({ detail }) => {

    const [relatedVideo, setRelatedVideo] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const res = await axios.get(`http://localhost:8000/api/get-related/${id}/`)
            setRelatedVideo(res.data.results)
            setLoading(false)
        }
        getData()
    }, [id])


    return (
        <div className='related-container'>
            {relatedVideo.map(item => {
                return <Link key={item.uuid} to={`/watch/${item.uuid}`}>
                    <Card
                        
                        className='related-video-group'
                        hoverable
                        bordered={false}
                        style={{ width: '100%' }}
                        cover={<img alt="example" src={item.image} />}

                    >
                        <Meta
                            title={item.title}
                            description={<>
                                <strong>{item.author.name}</strong>
                                <p>{moment(item.created).fromNow()}</p>
                            </>} />

                    </Card>
                </Link>
            })}
        </div>
    )
}

export default RelatedDetail