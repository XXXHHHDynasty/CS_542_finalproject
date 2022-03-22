import React from 'react'
import { useLocation } from 'react-router-dom'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './home.css';
import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home = () => {
    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Server">
                        <Menu.Item key="1">Subserver 1</Menu.Item>
                        <Menu.Item key="2">Subserver 2</Menu.Item>
                        <Menu.Item key="3">Subserver 3</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<UserOutlined />} title="WPI Lifestyle">
                        <Menu.Item key="4">Free chatting</Menu.Item>
                        <Menu.Item key="5">Foods</Menu.Item>
                        <Menu.Item key="6">Games</Menu.Item>
                        <Menu.Item key="7">Sports</Menu.Item>
                        <Menu.Item key="8">Musics</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<UserOutlined />} title="WPI Study">
                        <Menu.Item key="9">Welcome</Menu.Item>
                        <Menu.Item key="10">Courses</Menu.Item>
                        <Menu.Item key="11">Project help</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<UserOutlined />} title="Fun things sharing place">
                        <Menu.Item key="12">Free chatting</Menu.Item>
                        <Menu.Item key="13">Memes</Menu.Item>
                        <Menu.Item key="14">Pictures</Menu.Item>
                        <Menu.Item key="15">Videos</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" icon={<UserOutlined />} title="Only for complaints">
                        <Menu.Item key="16">Free complaining</Menu.Item>
                        <Menu.Item key="17">Gently complain</Menu.Item>
                        <Menu.Item key="18">Hell level complain</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        long
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>WPI Chat System ©2022 Created by CS 542 group</Footer>
            </Layout>
        </Layout>
    )
}

export default Home;