import React from 'react'
import { Layout } from 'antd';
import ContentHome from '../components/ContentHome';




const HomePage = () => {
    const { Header, Footer, Sider } = Layout;

    return (
        <div>
            <Layout>
                <Layout>
                    <Sider>Sider</Sider>
                    <ContentHome/>
                </Layout>
            </Layout>
        </div>
    )
}

export default HomePage