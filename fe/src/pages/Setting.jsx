import React, { useContext, useEffect, useState } from 'react';
import '../style/Setting.scss'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';




const Setting = () => {
    const { user, authTokens ,setAvatar} = useAuth()
    const [username, setUsername] = useState(user.name)
    const [active, setActive] = useState(-1)
    const [userAvatar, setUserAvatar] = useState(user.avatar)

    const [passwordValue, setpasswordValue] = useState()
    const [confirmPasswordValue, setconfirmPasswordValue] = useState()

    // Change password
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()


    //loading
    const [loading, setLoading] = useState(false)
    // photoUrl
    const [photo, setPhoto] = useState(null)
    const [fileAvatar, setFileAvatar] = useState(null)
    const handleChangeAva = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setUserAvatar(file)
        setFileAvatar(file)
    }

    const handleSaveAvatar = async () => {

        let form_data = new FormData();
        form_data.append('avatar', fileAvatar, fileAvatar.name);



        try {
            const res = await axios.put(`https://visourcebe.herokuapp.com/api/user/update_avatar/${user.user_id}/`, form_data, {
                headers: {
                    Authorization: `Bearer ${String(authTokens.access)}`,
                    'Content-Type': 'multipart/form-data;boundary=----dfasdadsadq3qw--' //; boundary=something
                }
            })
            setUserAvatar(res.data.avatar)
            
            setAvatar(res.data.avatar.slice(12))
            alert('Success')

        }catch(error){
            alert(error)
        }
    

    }

    const handleClick = (id) => {
        setActive(id)
    }

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(userAvatar)
        }
    }, [userAvatar])

    useEffect(() => {
        async function getAvatar() {
            const res = await axios.get(`https://visourcebe.herokuapp.com/api/user/profile/${user.user_id}/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })
            setUserAvatar(res.data.avatar)
        }
        getAvatar()
    }, [])

    const onFinish = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`https://visourcebe.herokuapp.com/api/user/update_name/${user.user_id}/`, {
                name: username,
                password: passwordValue
            }, {
                headers: {
                    Authorization: `Bearer ${String(authTokens.access)}`
                }
            })
            console.log(res)
            setLoading(false)
            alert('success')
        } catch (error) {
            alert(error)
        }

    }
    const onFinishNewPass = async () => {
        setLoading(true)
        try {
            if (newPassword !== confirmNewPassword) {
                alert(`Current and Confirm password doesn't match `)
            } else {
                await axios.put(`https://visourcebe.herokuapp.com/api/user/change_password/${user.user_id}/`, {
                    old_password: currentPassword,
                    password: newPassword,
                    password2: confirmNewPassword
                },
                    {
                        headers: {
                            Authorization: `Bearer ${String(authTokens.access)}`,

                        }
                    }
                )
                alert('Success')
            }
        } catch {
            alert('Smt wrong')

        }
        setLoading(false)
    }



    return <div className=' container-setting'>
        <div className='title-setting'><h3>
            General Account Settings
        </h3></div>

        <div className='setting-group' >
            {active === 1 ?
                <div className='setting-group-child active1'  >

                    <div className='title-option-setting col-sm-3 col-2'>Name</div>
                    <div className='title-update-displayname col-sm-9 col-10'>

                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}

                        >
                            <div className='d-flex'>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                    valuePropName
                                    initialValue={username}

                                >
                                    <Input onChange={(e) => setUsername(e.target.value)}  value={username} prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>
                            </div>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: passwordValue, }]}
                                valuePropName
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    value={passwordValue}
                                    onChange={e => setpasswordValue(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                                valuePropName
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPasswordValue}
                                    onChange={e => setconfirmPasswordValue(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button loading={loading} disabled={loading} type="primary submitUpdateName" htmlType="submit" className="login-form-button">
                                    Confirm
                                </Button>

                            </Form.Item>
                        </Form>
                        <div >
                            <Button type="primary" danger>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>


                :
                <div className='setting-group-child' onClick={() => handleClick(1)} >

                    <div className='title-option-setting col-sm-3 col-2'>Name</div>
                    <div className='title-option-content col-sm-9 col-10' >
                        <div className='description-setting' >{user.name}</div>
                        <div className='title-option-action'>Edit</div>


                    </div>
                </div>

            }


        </div>
        {active === 2 ?
            <div>
                <div className='setting-group' >
                    <div className='setting-group-child' >
                        <div className='title-option-setting col-2 col-sm-3'>Avatar</div>
                        <div className='title-option-content-ava col-sm-9 col-10'>
                            <img src={userAvatar.preview || `http://localhost:8000${userAvatar} `} alt="" />


                            <div>
                                <input onChange={handleChangeAva} type="file" id='updateAva' hidden />
                                <label className='button-updateAva btn btn-light' htmlFor="updateAva">
                                    <span>Update Avatar</span>
                                    <div className='icon-update-avatar'>

                                        <UploadOutlined />
                                    </div>
                                </label>


                            </div>
                            <button onClick={handleSaveAvatar} className=' btn btn-primary' style={{ cursor: 'pointer' }} >
                                Confirm
                            </button>


                        </div>

                    </div>
                </div>
            </div>
            :
            <div onClick={() => handleClick(2)} className='setting-group' >
                <div className='setting-group-child' >
                    <div className='title-option-setting col-sm-3 col-2'>Avatar</div>
                    <div className='title-option-content col-sm-9 col-10'>
                        <div className='description-setting' >Update your Avatar.</div>
                        <div className='title-option-action'>Edit</div>

                    </div>

                </div>
            </div>
        }
        {active === 3 ?
            <>
                <div className='setting-group' >
                    <div className='setting-group-child active3' >
                        <div className='title-option-setting  col-sm-3 col-2'>Password</div>

                        <div className='field-change-pass '>
                            <div className='title-option-content-new-pass'>
                                <div className='description-setting description-new text-center' > Change your password.</div>

                                <div className='description-setting description-new-pass' >It's a good idea to use a strong password that you're not using elsewhere</div>

                            </div>
                            <Form onFinish={onFinishNewPass}>
                                <Form.Item
                                    name="currentPassword"
                                    rules={[{ required: true, message: passwordValue, }]}
                                    valuePropName
                                >
                                    <Input
                                        prefix={<EditOutlined />}
                                        type="password"
                                        placeholder="Current password"
                                        value={currentPassword}
                                        onChange={e => setCurrentPassword(e.target.value)}


                                    />
                                </Form.Item>
                                <Form.Item
                                    name="newPassword"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                    valuePropName
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Confirm password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}

                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirmNewPassword"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                    valuePropName
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmNewPassword}
                                        onChange={e => setConfirmNewPassword(e.target.value)}


                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button loading={loading} disabled={loading} type="primary submitUpdateName" htmlType="submit" className="login-form-button">
                                        Confirm
                                    </Button>

                                </Form.Item>
                                <div >
                                    <Button type="primary" danger>
                                        Close
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </>
            :
            <div onClick={() => handleClick(3)} className='setting-group' >
                <div className='setting-group-child' >
                    <div className='title-option-setting col-sm-3 col-2'>Password</div>
                    <div className='title-option-content col-sm-9 col-10'>

                        <div className='description-setting ' >Change your password? Click here!</div>
                        <div className='title-option-action'>Edit</div>
                    </div>

                </div>
            </div>}

    </div>;
};

export default Setting;