import React from 'react'
import '../style/DropdownAvatar.scss'
import { List, Typography, Divider, Avatar } from 'antd';
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const DropdownAvatar = ({ avatar }) => {
    const { user, signOut } = useAuth()



    return (
        <div className='DropdownAvatar-container'>
            <Dropdown
                trigger={['click']}
                overlay={
                    <>
                        <Menu>
                            <Menu.Item key={1} icon={<SettingOutlined />}>
                                <Link to='/setting'>
                                    Setting
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={2} icon={<UploadOutlined style={{ fontSize: 17 }} />}>

                                <Link to='/post-video'>
                                    Upload Video
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={3} icon={<LogoutOutlined style={{ fontSize: 17 }} />} onClick={signOut}>
                                Sign out
                            </Menu.Item>

                        </Menu>
                    </>
                }

            >
                < Avatar
                    style={{ alignSelf: 'center' }}
                    size={'large'}
                    src={`https://visourcebe.herokuapp.com/base/media/${avatar}`}
                />
            </Dropdown>


        </div >
    )
}

export default DropdownAvatar