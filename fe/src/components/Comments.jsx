import React, { useEffect, useState } from 'react'
import { Comment, Avatar, Button } from 'antd';
import moment from 'moment'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/Comments.scss'
import { Input } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { CloseOutlined } from '@ant-design/icons';


const { TextArea } = Input;

const RepComments = ({ comment_id, openRepCmt, setOpenRepCmt }) => {
    const { user } = useAuth()
    const [repCmt, setRepCmt] = useState([])
    const [repCmtContent, setRepCmtContent] = useState(null)
    useEffect(() => {
        async function getData() {
            const res = await axios.get(`https://visourcebe.herokuapp.com/api/get-rep-comments/${comment_id}`)
            setRepCmt(res.data)
        }
        getData()
    }, [])




    const handleSubmitRepCmt = async (id) => {
        if (repCmtContent) {

            const res = await axios.post(`https://visourcebe.herokuapp.com/api/get-rep-comments/${id}`, {
                content: repCmtContent,
                user: {
                    name: user.name,
                    id: user.user_id,
                    avatar: `/base/media/${user.avatar}`
                },
                comment_id: id

            })
            setRepCmt([...repCmt, res.data])
            setRepCmtContent(null)

        }

    }
    const handleDeleteRepCmt = async (id) => {

        try {
            const res = await axios.delete(`https://visourcebe.herokuapp.com/api/get-rep-comments/${id}`)
            const data = repCmt.filter(item => item.id !== id)
            setRepCmt(data)
        } catch {
            alert('Failed to delete rep comment')
        }
    }

    return <>
        {repCmt.map(rep =>
            <Comment

                key={rep.id}
                actions={[
                    <div className='actions-container'>
                        <span onClick={() => setOpenRepCmt(comment_id)} key="comment-list-reply-to-0">Reply </span>
                        {user && <span onClick={() => handleDeleteRepCmt(rep.id)}>{user.user_id === rep.user.id && 'Delete cmt'}</span>}

                    </div>
                ]}
                author={<strong>{rep.user.name}</strong>}
                avatar={<Avatar src={`http://localhost:8000${rep.user.avatar}`} alt={rep.user.name} />}
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
        {openRepCmt === comment_id &&
            <>
                <TextArea
                    value={repCmtContent}
                    onPressEnter={() => handleSubmitRepCmt(comment_id)}
                    onChange={(e) => setRepCmtContent(e.target.value)}
                    placeholder="Write a reply..."
                    autoSize={{ minRows: 2, maxRows: 5 }}
                />
                <Button onClick={() => handleSubmitRepCmt(comment_id)} className='my-2' shape='round' type='primary'>Send</Button>
            </>
        }
    </>
}


const Comments = ({ cmtList, setCmtList }) => {
    const { id } = useParams()
    const { user } = useAuth()
    const [openRepCmt, setOpenRepCmt] = useState(-1)
    const handleDeleteCmt = async (idCmt) => {

        try {
            const res = await axios.delete(`https://visourcebe.herokuapp.com/api/get-comments/${idCmt}`)
            const data = cmtList.filter(item => item.id !== idCmt)
            setCmtList(data)
        } catch {
            alert('Failed to delete comment')
        }
    }





    return (
        <div className='comments-container'>
            {cmtList.map((item, i) => {


                return <Comment
                    key={item.id}
                    actions={[
                        <div className='actions-container'>
                            {item.count_rep_comments > 0 && <span >{item.count_rep_comments} {item.count_rep_comments > 1 ? 'replies' : 'reply'}</span>}
                            <span onClick={() => setOpenRepCmt(item.id)} key="comment-list-reply-to-0">Reply </span>
                            {user && <span onClick={() => handleDeleteCmt(item.id)}>{user.user_id === item.user.id && 'Delete cmt'}</span>}
                        </div>
                    ]}
                    author={<strong>{item.user.name}</strong>}
                    avatar={<Avatar src={`http://localhost:8000${item.user.avatar}`} alt={item.user.name} />}
                    content={
                        <p>
                            {item.content}
                        </p>
                    }
                    datetime={
                        <>
                            <span>{moment(item?.created).fromNow()}</span>
                        </>
                    }

                >
                    {<RepComments setOpenRepCmt={setOpenRepCmt} openRepCmt={openRepCmt} comment_id={item.id} />}

                </Comment>
            })
            }
        </div>
    )
}

export default Comments