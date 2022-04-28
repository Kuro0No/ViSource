import { Menu, Button } from 'antd';
import { HomeOutlined, FolderOpenOutlined, HistoryOutlined, PlaySquareOutlined } from '@ant-design/icons';
import React from 'react';
import '../style/LeftSide.scss'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const LeftSide = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className='menu-container'>
            <Menu >


                <Menu.Item>

                    <Link to='/' className='nav-side-group'>
                        <HomeOutlined title='Home' />
                        <span>Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item>

                    <Link to='/saved' className='nav-side-group'>
                        <FolderOpenOutlined title='Saved' />
                        <span>Saved</span>
                    </Link>
                </Menu.Item>
                <Menu.Item  >

                    <Link to='/history' className='nav-side-group'>
                        <HistoryOutlined title='Watched' />
                        <span>Video watched</span>
                    </Link>
                </Menu.Item>

                <Menu.Item>

                    <Link to='/your-video' className='nav-side-group'>
                        <PlaySquareOutlined title='Your videos' />
                        <span>Your videos</span>
                    </Link>
                </Menu.Item>

                {!user && <div className='nav-side-group'>
                    <Menu.Item>

                        <Link type='button' className='btn btn-outline-primary' to='/login' danger >
                            Login
                        </Link>
                    </Menu.Item>
                </div>}
            </Menu>
        </div >
    )
}


export default LeftSide