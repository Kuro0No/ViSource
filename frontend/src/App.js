import { Layout } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import './index.css'
import UseClickOutSide from './hooks/UseClickOutSide';
import Footer from './components/Footer';


function App() {
  const { Sider, Content } = Layout
  const { user } = useAuth()
  const [SearchList, setSearchList] = useState([])
  const [collapsed, setCollapsed] = useState(false)
  const [openMenu, setopenMenu] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const location = useLocation()
  const ref = useRef()

  const a = UseClickOutSide(ref, () => {
    if ((window.innerWidth || width) <= 768) {

      setCollapsed(true)
      setopenMenu(false)
    }

  })





  const onSearchHandle = useCallback((data) => {
    setSearchList(data)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  }, [])
  useEffect(() => {
    if (width >= 768) setCollapsed(false)
    else if (576 < width < 768) setCollapsed(true)



  }, [width])

  const onClickMenu = () => {

    setopenMenu(!openMenu)
    setCollapsed(!collapsed)


  }
  // useEffect(() => {
  //   (width || window.innerWidth) > 768 && setCollapsed(!collapsed)

  // }, [width])



  return (
    <div className="App">
      <Header onSearchHandle={onSearchHandle} openMenu={openMenu} onClickMenu={onClickMenu} />
      <Layout style={{ padding: '20px 0',minHeight: 'calc(100vh - 64px)' }}>

      <Layout >

          <Sider
            ref={ref}

            className={`${openMenu ? `sidebar-container-active` : ''}`}
            collapsedWidth={((width || window.innerWidth) < 576 ? 0 : 80)}
            collapsed={collapsed}
            theme='light'>
            <LeftSide collapsed={collapsed} />
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

        <Footer />
      </Layout>
    </div >
  );
}

export default App;
