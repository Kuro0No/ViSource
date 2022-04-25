import React from 'react'
import '../style/DropdownAvatar.scss'
import { List, Typography, Divider, Avatar } from 'antd';
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const DropdownAvatar = () => {
    const { user, signOut } = useAuth()


    return (
        <div className='DropdownAvatar-container'>
            <Dropdown


                trigger={['click']}
                overlay={
                    <>
                        <Menu>

                            <Menu.Item eventKey='1' key={1} icon={<ProfileOutlined style={{ fontSize: 17 }} />}>
                                <Link to='/profile'>
                                    Profile
                                </Link>
                            </Menu.Item>
                            <Menu.Item eventKey='2' icon={<SettingOutlined />}>
                                <Link to='/setting'>
                                    Setting
                                </Link>
                            </Menu.Item>
                            <Menu.Item eventKey='3' key={2} icon={<LogoutOutlined style={{ fontSize: 17 }} />} onClick={signOut}>
                                Sign out
                            </Menu.Item>

                        </Menu>

                    </>
                }

            >
                < Avatar
                    style={{ alignSelf: 'center' }}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80 }}
                    src={`http://localhost:8000/base/media/${user.avatar}`}
                />
            </Dropdown>


        </div >
    )
}

export default DropdownAvatar