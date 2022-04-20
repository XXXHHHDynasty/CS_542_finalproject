import React, { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.min.css'

const { Header, Sider } = Layout;
const { SubMenu } = Menu;
const axios = require('axios').default;



const App = () => {

    const navigate = useNavigate();
    const [server, setserver] = useState([]);
    const [status, setStatus] = useState(false);
    const [serverId, setserverId] = useState(0);
    const [subserverId, setsubserverId] = useState(0);

    // update menu when after creating a server
    if (status == true) {
        axios.get(`http://localhost:3000/servers`).then(res => {
            setserver(res.data)
        })
        // close update
        setStatus(false)
    }

    // get menu
    useEffect(() => {
        axios.get(`http://localhost:3000/servers`).then(res => {
            setserver(res.data)
        })
    }, []);

    // Process first-level menu item
    const renderMenu = (item) => {
        return (
            <Menu.Item key={item.id}>{item.title}</Menu.Item>
        )
    }

    // Process child menu item
    const renderSubMnenu = (value) => {
        return (
            <SubMenu key={value.id} title={value.title} onClick={(item) => {
                setserverId(item.keyPath[1]);
                setsubserverId(item.key);
                // navigate("/discussion", { state: { serverId: serverId, subserverId: subserverId } })
                navigate("/discussion", {state:{ serverId: item.keyPath[1], subserverId: item.key } })
                // navigate(0)
            }}>
                {
                    value.subServers && value.subServers.map(item => {
                        return item.subServers && item.subServers.length > 0 ? renderSubMnenu(item) : renderMenu(item)
                    })
                }
            </SubMenu>
        )
    }

    // navigate to 'home' page
    const goHome = () => {
        navigate('/home', {})
    }

    // navigate to 'UserProfile' page
    const goUserProfile = () => {
        navigate('/userprofile', {})
    }

    return (
        <Layout>
            <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" onClick={goHome}>Home</Menu.Item>
                    <Menu.Item key="2" onClick={goUserProfile}>User Profile</Menu.Item>
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
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        server && server.map(firstItem => {
                            return firstItem.subServers && firstItem.subServers.length > 0 ? renderSubMnenu(firstItem) : renderMenu(firstItem)
                        })
                    }
                </Menu>
            </Sider>
            <Outlet context={[status, setStatus]} />
        </Layout>
    )
}

export default App;