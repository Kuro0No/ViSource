import React, { useEffect, useState } from 'react'
import { Comment, Avatar } from 'antd';
import moment from 'moment'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/Comments.scss'


const RepComments = ({ comment_id }) => {
    const [repCmt, setRepCmt] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://localhost:8000/api/get-rep-comments/${comment_id}`)
            setRepCmt(res.data)
        }
        getData()
    }, [])

    return <>
        {repCmt.map(rep =>
            <Comment
                key={rep.id}
                actions={[
                    <div className='actions-container'>
                        <span key="comment-list-reply-to-0">Reply to</span>
                    </div>
                ]}
                author={<h3>Han Solo</h3>}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <p>
                        {rep.content}
                    </p>
                }
                datetime={

                    <span>{moment(rep.created).fromNow()}</span>

                }
            />
        )}
    </>
}


const Comments = () => {
    const { id } = useParams()
    const [cmtList, setCmtList] = useState([])
    const [openRep, setOpenRep] = useState(-1)
    const [showRep, setShowRep] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://localhost:8000/api/get-comments/${id}`)
            setCmtList(res.data)
        }
        getData()
    }, [id])
    // const handleClickRep = (id) => {
    //     setOpenRep(id)
    //     setShowRep(prev => {
    //         return [...prev, id]
    //     })
    // }
    
    
    return (
        <div className='comments-container'>
            {cmtList.map(item => {
                

                return <Comment
                    key={item.id}
                    actions={[
                        <div className='actions-container'>
                            <span key="comment-list-reply-to-0">Reply to</span>
                            {/* <span onClick={() => handleClickRep(item.id)}> Show replies</span> */}
                        </div>
                    ]}
                    author={<h3>Han Solo</h3>}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                        <p>
                            {item.content}
                        </p>
                    }
                    datetime={
                        <span>{moment(item?.created).fromNow()}</span>


                    }
                >
                    { <RepComments comment_id={item.id} />}
                </Comment>
            })
            }
        </div>
    )
}

export default Comments