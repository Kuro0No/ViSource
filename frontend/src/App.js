import { Layout } from 'antd';
import { useCallback, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import LeftSide from './components/LeftSide';
import { useAuth } from './hooks/useAuth';
import Detail from './pages/Detail';
import History from './pages/History';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Save from './pages/Save';
import Search from './pages/Search';
import Setting from './pages/Setting';


function App() {
  const { Sider } = Layout
  const location = useLocation()
  const { id } = useParams()
  const { user } = useAuth()
  const [SearchList, setSearchList] = useState([])
  const navi = useNavigate()
  

  const onSearchHandle = useCallback((data) => {
    setSearchList(data)
  }, [])

  return (
    <div className="App">
      <Header onSearchHandle={onSearchHandle} />
      <Layout>
        {location.pathname == '/' &&
          <Sider theme='light'>
            <LeftSide />
          </Sider>}

        {location.pathname == '/saved' &&
          <Sider theme='light'>
            <LeftSide />
          </Sider>}

        {location.pathname == '/history' &&
          <Sider theme='light'>
            <LeftSide />
          </Sider>}


        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/watch/:id' element={<Detail />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/history' element={<History />} />
          <Route path='/saved' element={<Save />} />
          <Route path='/setting' element={user ? <Setting /> : <Navigate to='/login' />} />
          <Route path='/search' element={<Search SearchList={SearchList} onSearchHandle={onSearchHandle} />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
