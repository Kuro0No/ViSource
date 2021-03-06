import React, { useCallback, useState } from 'react'
import { Layout, List } from 'antd';
import '../style/Header.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DropdownAvatar from './DropdownAvatar';
import { Input, } from 'antd';
import axios from 'axios';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

const { Search } = Input;

const Header = ({ onSearchHandle, onClickMenu, openMenu }) => {
  const { Header } = Layout;
  const { user, avatar } = useAuth()
  const navi = useNavigate()
  const [search, setSearch] = useState(null)

  const onSearch = async () => {
    if (search) {
      const res = await axios.get(`https://visourcebe.herokuapp.com/api/search-video/?search=${search}`)
      onSearchHandle(res.data)

      navi(`search/?search=${search}`)

    }
  }





  return (
    <Header style={{ padding: 0 }} className='header-container'>

      <ul>
        {!openMenu && <li className='menu-header' onClick={onClickMenu}><MenuOutlined /></li>}
        {openMenu && <li className='menu-header'><CloseOutlined /> </li>}
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Search placeholder="input search text" value={search} onChange={(e) => setSearch(e.target.value)} onSearch={onSearch} />
        </li>
        <div className='d-flex'>

          {!user && <li>
            <Link to='/register'>Register</Link>
          </li>}
          {!user && <li>
            <Link to='/login'>Login</Link>
          </li>}
        </div>

        {user &&
          <li className='user-header'>
            <DropdownAvatar avatar={avatar} />
          </li>}

      </ul>
    </Header>
  )
}

export default Header