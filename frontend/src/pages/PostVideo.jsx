import React, { useEffect, useRef, useState } from 'react'
import { Form, Input } from 'antd';
import { Image } from 'antd';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player'
import { Select } from 'antd';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const { TextArea } = Input;

const PostVideo = () => {

    const [fileImg, setFileImg] = useState()
    const [fileVideo, setFileVideo] = useState()
    const { user } = useAuth()
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

            let form_image = new FormData();
            let form_video = new FormData();

            form_image.append('image', fileImg);
            form_video.append('video', fileVideo);

            try {
                const res = await axios.post(`http://localhost:8000/api/list-videos/`, {
                    author: user,
                    title: title,
                    description: desc,
                    genres: genres,
                    image: form_image,
                    video: form_video

                })
                console.log(res)
                alert("Sucess")

            } catch(err) {
                alert(err)
            }


        }
    }

    return (
        <div className='post-video-container'>


            <h5>Post Video</h5>
            <div>
                <label htmlFor="title">Title</label>
                <TextArea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter your title video" id='title' autoSize />
            </div>
            <div>
                <label htmlFor="Image">Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                    <Image
                        width={200}
                        height={200}
                        style={{ objectFit: 'cover' }}
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
            <div>
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
            <div >
                <label htmlFor="Description">Description</label>
                <Input.TextArea
                    className='Description'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Controlled autosize"
                    autoSize={{ minRows: 3, maxRows: 7 }}
                />
            </div>
            <div >
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