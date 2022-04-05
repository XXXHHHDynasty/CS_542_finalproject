import React from 'react'
import { Navigate, useNavigate, Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css'

const { Header, Sider } = Layout;
const { SubMenu } = Menu;


const App = () => {
    const navigate = useNavigate()

    const goHome = () => {
        navigate('/home', {
            state: { username: "testUsername" }
        })
    }

    const goUserInfo = () => {
        navigate('/userInfo', {
            state: { username: "testUsername" }
        })
    }

    return (
        <Layout>
            <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" onClick={goHome}>Home</Menu.Item>
                    <Menu.Item key="2" onClick={goUserInfo}>User Info</Menu.Item>
                    <Menu.Item key="3">Nav 3</Menu.Item>
                </Menu>
            </Header>
            <Sider width={200} className="site-layout-background"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Server">
                        <Menu.Item key="1" onClick={goHome}>Subserver 1</Menu.Item>
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
            <Outlet />
        </Layout>
    )
}

export default App;