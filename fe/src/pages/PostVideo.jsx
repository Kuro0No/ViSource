import React, { useEffect, useRef, useState } from 'react'
import { Form, Input } from 'antd';
import { Image } from 'antd';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player'
import { Select } from 'antd';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import '../style/PostVideo.scss'

const { TextArea } = Input;

const PostVideo = () => {

    const [fileImg, setFileImg] = useState()
    const [fileVideo, setFileVideo] = useState()
    const { user ,authTokens} = useAuth()
    const [desc, setDesc] = useState('')
    const inputImageRef = useRef()
    const inputVideoRef = useRef()
    const [title, setTitle] = useState('')
    const options = ['Music', 'Nature', 'Animation', 'Video Game']
    const [genres, setGenres] = useState([])

    const changeImage = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setFileImg(file)

    }
    useEffect(() => {
        return () => {
            fileImg && URL.revokeObjectURL(fileImg)
            fileVideo && URL.revokeObjectURL(fileVideo)
        }
    }, [fileImg, fileVideo])
    const uploadVideo = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setFileVideo(file)
    }
    const handleChangeGenres = (e) => {
        setGenres(e)

    }
    const handleUpload = async () => {

        if (fileVideo && title && genres.length > 0) {
            let form_data = new FormData();

            // vì phải gửi file nên append
            form_data.append('image', fileImg);
            form_data.append('video', fileVideo);
            form_data.append('author', JSON.stringify(user));
            form_data.append('title', title);
            form_data.append('description', desc);
            form_data.append('genres', genres);

            try {
                const res = await axios.post(`https://visourcebe.herokuapp.com/api/list-videos/`,
                    form_data,
                    {
                        headers: {
                            Authorization: `Bearer ${String(authTokens.access)}`,
                            'Content-Type': 'multipart/form-data;boundary=----dfasdadsadq3qw--' //; boundary=something
                        }
                    })
                alert("Sucess")

            } catch (err) {
                alert(err)
            }


        } else {
            alert('Maybe some places you forgot to fill up form ')
        }
    }

    return (
        <div className='post-video-container'>



            <h5>Post Video</h5>
            <div className='group'>
                <label htmlFor="title">Title</label>
                <TextArea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter your title video" id='title' autoSize />
            </div>
            <div  className='group'>
                <label htmlFor="Image">Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                    <Image
                        width={200}
                        height={200}
                        style={{ objectFit: 'contain' }}
                        src={fileImg ? fileImg.preview : `http://aquaphor.vn/wp-content/uploads/2016/06/default-placeholder.png`}

                    />
                    <label style={{ width: 'fit-content' }} htmlFor="Image">
                        <Button onClick={() => inputImageRef.current.input.click()} icon={<UploadOutlined />} >
                            <span>Image</span>
                            <Input onChange={changeImage} ref={inputImageRef} hidden type='file' id="Image" />
                        </Button>
                    </label>
                </div>

            </div>
            <div  className='group'>
                <label htmlFor="Video">Video</label>
                <div>
                    {fileVideo && <ReactPlayer controls={true} url={fileVideo.preview} />}
                    {!fileVideo && <Image
                        preview={false}
                        width={200}
                        height={200}
                        style={{ objectFit: 'cover' }}
                        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYYStvhtjP25KavY2DzGGOqj-OJlf1w_6eLzGEXIrlUml32jdiyVEuObBhgONhCIM2XKk&usqp=CAU`}

                    />}
                </div>
                <label style={{ width: 'fit-content' }} htmlFor="Video">
                    <Button onClick={() => inputVideoRef.current.input.click()} icon={<UploadOutlined />} >
                        <span>Video</span>
                        <Input onChange={uploadVideo} ref={inputVideoRef} hidden type='file' id="Video" />
                    </Button>
                </label>


            </div>
            <div  className='group'>
                <label htmlFor="Description">Description</label>
                <Input.TextArea
                    className='Description'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Controlled autosize"
                    autoSize={{ minRows: 3, maxRows: 7 }}
                />
            </div>
            <div  className='group'>
                <label>Genres</label>
                <Select

                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleChangeGenres}

                >
                    {options.map((item, i) => {

                        return <Select.Option key={item}>
                            {item}
                        </Select.Option>

                    })}
                </Select>
                <div>
                    <Button onClick={handleUpload}>Upload</Button>
                </div>

            </div>

        </div >
    )
}

export default PostVideo