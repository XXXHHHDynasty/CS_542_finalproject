import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate, Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css'

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

const axios = require('axios').default;

const App = () => {
    const [menuData, setMenuData] = useState();

    const getData = async () => {
        const res = await axios(
            'http://localhost:3004/servers',
            {
                method: 'get',
            },
        );
        return res;
    }

    const getMenu = (data) => {
        return Object.values(data).map((item, index) => {
            return (
                <SubMenu key={item.id} title={item.title} icon={<UserOutlined />}>
                    {getSubMenu(item.subServers)}
                </SubMenu>
            )
        })
    }

    const getSubMenu = (data) => {
        return Object.values(data).map((item, index) => {
            return (
                <Menu.Item key={item.id}>{item.title}</Menu.Item>
            )
        })
    }

    useEffect(() => {
        getData().then(res => {
            const data_menu = getMenu(res.data);
            setMenuData(data_menu);
        });
    }, []);

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
                    {menuData}
                </Menu>
            </Sider>
            <Outlet />
        </Layout>
    )
}

export default App;