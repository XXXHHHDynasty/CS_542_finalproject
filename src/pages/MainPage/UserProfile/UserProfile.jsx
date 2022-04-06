import { Layout, Avatar, Modal, Menu, Tabs, Empty, Button, Typography, Radio, Input, Form } from 'antd';
import React, { useState } from 'react'

import { UserOutlined } from '@ant-design/icons';
import './UserProfile.css';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

// form component
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="title"
                    label="Server Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of server!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const UserInfo = () => {

    const [visible, setVisible] = useState(false);
    
    // create a new server function 
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

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
                <div className="flexrowallCenter" style={{ marginTop: 100 }}>
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
                        <Button className='flexstyleColumn' type="primary" style={{ marginLeft: 10 }} onClick={() => {
                            setVisible(true);
                        }}>Create Server</Button>
                        <CollectionCreateForm
                            visible={visible}
                            onCreate={onCreate}
                            onCancel={() => {
                                setVisible(false);
                            }}
                        />
                        <Button className='flexstyleColumn' type="submit" form="createServer" style={{ marginLeft: 10 }}>Manager</Button>
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