import { Layout, Avatar, Row, Col, Menu, Tabs, Empty, Button, Typography } from 'antd';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import './UserProfile.css';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

const UserInfo = () => {
    return (
        <Layout>
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
            <Layout className="site-layout" style={{ marginLeft: 200, padding: 20 }}>
                <div className='col' className="flexrowallCenter" style={{marginTop: 100}}>
                    <div className="flexstyleRow">
                        <Avatar size={100} src="https://joeschmoe.io/api/v1/random" style={{ marginLeft: 20 }}>Olivia</Avatar>
                        <div className='flexstyleColumn' style={{ marginLeft: 20 }}>
                            <Typography.Title editable level={3} style={{ margin: 0, color: '#333' }}>
                                Olivia
                            </Typography.Title>
                            <p style={{ marginBottom: 0, color: '#666' }}>Follow:100</p>
                            <p style={{ marginBottom: 0, color: '#666' }}>Follower:100</p>
                        </div>
                    </div>
                    <div className="flexstyleforbutton" style={{ marginRight: 20 }}>
                        <Button className='flexstyleColumn' type="primary" style={{ marginLeft: 10 }}>Create Server</Button>
                        <Button className='flexstyleColumn' type="primary" style={{ marginLeft: 10 }}>Manager</Button>
                    </div>
                </div>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', backgroundColor: '#FFF' }}>
                    <Tabs defaultActiveKey="1" style={{ paddingLeft: 30, paddingTop: 15 }}>
                        <TabPane tab="Saved Servers" key="1">
                            <Empty />
                        </TabPane>
                        <TabPane tab="Saved Discusstions" key="2">
                            <Empty />
                        </TabPane>
                        <TabPane tab="Saved Comments" key="3">
                            <Empty />
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        </Layout>
    )
}

export default UserInfo;