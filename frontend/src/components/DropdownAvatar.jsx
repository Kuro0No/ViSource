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
                            <Link to='/profile'>

                                <Menu.Item key={1} icon={<ProfileOutlined style={{ fontSize: 17 }} />}>Profile</Menu.Item>
                            </Link>
                            <Link to='/setting'>
                                <Menu.Item icon={<SettingOutlined />}>Setting</Menu.Item>
                            </Link>
                            <Menu.Item key={2} icon={<LogoutOutlined style={{ fontSize: 17 }} />} onClick={signOut}>Sign out</Menu.Item>

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