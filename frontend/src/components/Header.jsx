import React from 'react'
import { Layout } from 'antd';
import '../style/Header.scss'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const Header = () => {
  const { Header } = Layout;
  const { user ,signOut} = useAuth()
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
        {user && <li onClick={signOut} style={{cursor: 'pointer'}}>
          Sign Out
        </li>}
      </ul>
    </Header>
  )
}

export default Header