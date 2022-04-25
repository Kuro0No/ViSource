import React, { useCallback, useState } from 'react'
import { Layout } from 'antd';
import '../style/Header.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DropdownAvatar from './DropdownAvatar';
import { Input, } from 'antd';
import axios from 'axios';

const { Search } = Input;

const Header = ({ onSearchHandle }) => {
  const { Header } = Layout;
  const { user, signOut } = useAuth()
  const navi = useNavigate()
  const [search, setSearch] = useState(null)

  const onSearch =async () => {
    const res = await axios.get(`http://localhost:8000/api/search-video/?search=${search}`)
    onSearchHandle(res.data)
    navi(`search/?search=${search}`)
  }

  

  return (
    <Header className='header-container'>

      <Search placeholder="input search text" value={search} onChange={(e) => setSearch(e.target.value)} onSearch={onSearch} enterButton />
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