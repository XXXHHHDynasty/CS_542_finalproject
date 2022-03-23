import React from 'react'
import { Navigate, useNavigate, Outlet } from 'react-router-dom'
import { Layout, Menu, Input, Button } from 'antd';

const { Header, Footer, Content, Sider } = Layout;

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
            <Outlet />
        </Layout>

    )
}

export default App;