import React from 'react'
import { Layout } from 'antd';
import '../style/Header.scss'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { List, Typography, Divider } from 'antd';
import DropdownAvatar from './DropdownAvatar';


const Header = () => {
  const { Header } = Layout;
  const { user, signOut } = useAuth()
 
  return (
    <Header className='header-container'>
      <ul>
        <li>
          <Link to='/'>Header</Link>
        </li>
        {!user && <li>
          <Link to='/register'>Register</Link>
        </li>}
        {!user && <li>
          <Link to='/login'>Login</Link>
        </li>}
        
        {user &&
          <li className='user-header'>
            <DropdownAvatar />
          </li>}
        
      </ul>
    </Header>
  )
}

export default Header