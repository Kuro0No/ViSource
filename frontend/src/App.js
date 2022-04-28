import { Layout } from 'antd';
import { useCallback, useEffect, useState } from 'react';
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
import YourVideo from './pages/YourVideo';


function App() {
  const { Sider, Content } = Layout
  const { user } = useAuth()
  const [SearchList, setSearchList] = useState([])
  const [collapsed,setCollapsed] = useState(false)
  const [width,setWidth] = useState(window.innerWidth)


  const onSearchHandle = useCallback((data) => {
    setSearchList(data)
  }, [])

  useEffect(() => {
     window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  },[])
  useEffect(() => {
    width >= 735 ? setCollapsed(false) : setCollapsed(true) 
  })
  return (
    <div className="App">
      <Header onSearchHandle={onSearchHandle} />
      <Layout>

        <Sider  collapsed={collapsed} theme='light'>
          <LeftSide />
        </Sider>



        <Content>

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/watch/:id' element={<Detail />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/history' element={<History />} />
            <Route path='/saved' element={<Save />} />
            <Route path='/setting' element={user ? <Setting /> : <Navigate to='/login' />} />
            <Route path='/your-video' element={<YourVideo />} />
            <Route path='/search' element={<Search SearchList={SearchList} onSearchHandle={onSearchHandle} />} />
          </Routes>
        </Content>
      </Layout>
    </div >
  );
}

export default App;
