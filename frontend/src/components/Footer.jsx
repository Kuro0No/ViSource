import { FacebookOutlined, MessageOutlined } from '@ant-design/icons';
import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';
import '../style/Footer.scss'

const { TabPane } = Tabs;

const renderContent = (column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="Created">Mạnh Khải</Descriptions.Item>
    
    <Descriptions.Item label="Creation Time">April 25, 2022</Descriptions.Item>
    <Descriptions.Item label="Effective Time"> May 2, 2022</Descriptions.Item>
    
  </Descriptions>
);

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic
      title="Status"
      value="Completed"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="Price" prefix="$" value={0} />
  </div>
);

const Content = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

const Footer = () => (
  <PageHeader
    className="site-page-header-responsive"
 
    title="Footer"
    subTitle="This is a footer"
    extra={[
      <Button href='https://facebook.com/meoss.khai' icon={<FacebookOutlined  style={{verticalAlign: 'text-bottom'}}/>} type="primary" key="3"></Button>,
      <Button href='https://www.messenger.com/t/meoss.khai' icon={<MessageOutlined  style={{verticalAlign: 'text-bottom'}}/>} key="2"></Button>,
      
    ]}
    // footer={
    //   <Tabs defaultActiveKey="1">
    //     <TabPane tab="Details" key="1" />
    //     <TabPane tab="Rule" key="2" />
    //   </Tabs>
    // }
  >
    <Content extra={extraContent}>{renderContent()}</Content>
  </PageHeader>
);

export default Footer