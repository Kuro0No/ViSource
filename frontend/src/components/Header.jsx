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

const Header = ({ onSearchHandle ,onClickMenu,openMenu}) => {
  const { Header } = Layout;
  const { user } = useAuth()
  const navi = useNavigate()
  const [search, setSearch] = useState(null)

  const onSearch = async () => {
    if (search) {
      const res = await axios.get(`http://localhost:8000/api/search-video/?search=${search}`)
      onSearchHandle(res.data)

      navi(`search/?search=${search}`)

    }
  }
  
 



  return (
    <Header style={{padding: 0}} className='header-container'>
     
      <ul>
        {!openMenu && <li className='menu-header' onClick={onClickMenu}><MenuOutlined /></li>}
        {openMenu && <li className='menu-header'><CloseOutlined /> </li> }
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Search placeholder="input search text" value={search} onChange={(e) => setSearch(e.target.value)} onSearch={onSearch} />
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