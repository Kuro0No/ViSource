import React from 'react'
import { Layout } from 'antd';
import '../style/Header.scss'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Header = () => {
  const { Header } = Layout;
  const { user, signOut } = useAuth()
  const menu = (
    <Menu
      items={[
        {
          label: 'Submit and continue',
          key: '1',
        },
      ]}
    />
  );
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
        {user && <li onClick={signOut} style={{ cursor: 'pointer' }}>
          Sign Out
        </li>}
        
      </ul>
    </Header>
  )
}

export default Header