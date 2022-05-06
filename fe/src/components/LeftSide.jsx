import { Menu, Button } from 'antd';
import { HomeOutlined, FolderOpenOutlined, HistoryOutlined, PlaySquareOutlined, LoginOutlined } from '@ant-design/icons';
import React from 'react';
import '../style/LeftSide.scss'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const LeftSide = ({ collapsed }) => {

    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className='menu-container'>
            <Menu >


                <Menu.Item icon={collapsed && <HomeOutlined />} key={1}>

                    <Link to='/' className='nav-side-group'>
                        {!collapsed && <HomeOutlined title='Your videos' />}
                        <span>Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item icon={collapsed && <FolderOpenOutlined />} key={2}>

                    <Link to='/saved' className='nav-side-group'>
                        {!collapsed && <FolderOpenOutlined title='Your videos' />}
                        <span>Saved</span>
                    </Link>
                </Menu.Item>
                {/* <Menu.Item icon={collapsed && <HistoryOutlined />} key={3} > */}

                    {/* <Link to='/history' className='nav-side-group'>
                        {!collapsed && <HistoryOutlined title='Your videos' />}
                        <span>Video watched</span>
                    </Link> */}
                {/* </Menu.Item> */}

                <Menu.Item icon={collapsed && <PlaySquareOutlined />} key={4}>

                    <Link to='/your-video' className='nav-side-group'>
                        {!collapsed && <PlaySquareOutlined title='Your videos' />}
                        <span>Your videos</span>
                    </Link>
                </Menu.Item>

                {!user &&
                    <Menu.Item icon={collapsed && <LoginOutlined />} key={5}>

                        <Link to='/login' className='nav-side-group' >
                            {!collapsed && <LoginOutlined title='Your videos' />}

                            <span>Login</span>

                        </Link>


                    </Menu.Item>
                }
            </Menu>
        </div >
    )
}


export default LeftSide