import React from 'react'
import { Layout } from 'antd';
import ContentHome from '../components/ContentHome';
// import LeftSide from '../components/LeftSide';




const HomePage = () => {
    const { Sider } = Layout;




    return (

        <Layout>
            {/* <Sider theme='light'>
                <LeftSide />
            </Sider> */}
            <ContentHome />

        </Layout>

    )
}

export default HomePage