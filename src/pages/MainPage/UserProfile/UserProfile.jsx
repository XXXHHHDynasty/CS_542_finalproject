import { Layout, Avatar, Modal, Menu, Tabs, Empty, Button, Typography, Radio, Input, Form, Select } from 'antd';
import React, { useState, useEffect } from 'react'

import { UserOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './UserProfile.css';

const { Content, Sider } = Layout;
const { Option } = Select;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

const axios = require('axios').default;

// 你的manage form代码要大改才能运行

// const getServerData = async () => {
//     const res = await axios(
//         'http://localhost:3004/servers',
//         {
//             method: 'get',
//         },
//     );
//     return res;
// }

// const getServerInfo = () => {
//     const serverTitle = [];
//     getServerData().then(res => {
//         const len = res.data.length;
//         for(let i = 0; i < len; i ++){
//             serverTitle.fill(res.data[i].title);
//         }
//     })
//     return serverTitle;
// }

// const serverData = getServerInfo();
const serverData = ['Server1', 'Server2'];
const subserverData = {
    Server1: ['subserver1', 'subserver2', 'subserver3'],
    Server2: ['subserver4', 'subserver5', 'subserver6'],
};
const discussionData = {
    subserver1: ['discussion1', 'discussion2'],
    subserver2: ['discussion3', 'discussion4'],
};

// create server form component
const CreateServerForm = ({ visible, onCreate, onCancel }) => {

    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title="Create a new Server"
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
                name="createServerForm"
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
                <Form.Item name="subserver" label="Subserver" rules={[
                    {
                        required: true,
                        message: 'Please create at least one Subserver!',
                    },
                ]}>
                    <Input placeholder="subserver name" />
                </Form.Item>
                <Form.List
                    name="addsubserver"
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? 'ExtraSubserver' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input subserver's name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="subserver name" style={{ margin: '0 10px 0 0' }} />
                                    </Form.Item>
                                    {fields.length >= 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    Add subserver field
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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

// manager server form component
const ManagerServerForm = ({ managerVisible, onManager, onCancelManager }) => {

    const [managerform] = Form.useForm();

    const [subservers, setSubservers] = React.useState([]);
    const [subserver, setSubserver] = React.useState([subserverData[serverData[0]]][0]);
    const [discussions, setDiscussions] = React.useState([]);
    const [discussion, setDiscussion] = React.useState([discussionData[subserverData[serverData[0]][0]]][0])

    // control server's choice
    const handleServerChange = value => {
        setSubservers(subserverData[value]);
        setSubserver(subserverData[value][0]);
        setDiscussions([]);
        setDiscussion('');
    };
    // control subserver's choice
    const subserverchange = value => {
        setDiscussions(discussionData[value]);
        setDiscussion(discussionData[value][0]);
    };

    const discussionchange = value => {
        setDiscussion(value);
    };

    return (
        <Modal
            visible={managerVisible}
            title="Management"
            okText="Delete"
            cancelText="Cancel"
            onCancel={onCancelManager}
            footer={[
                <Button key="Cancel" onClick={onCancelManager}>
                    Return
                </Button>,
                <Button key="delete" type="primary" danger onClick={() => {
                    managerform
                        .validateFields()
                        .then((values) => {
                            managerform.resetFields();
                            onManager(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}>
                    Delete
                </Button>,
            ]}
        >
            <Form
                form={managerform}
                layout="vertical"
                name="deleteServer"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item name="delServer" label="Server">
                    <Select value={serverData[0]} onChange={handleServerChange}>
                        {serverData.map(server => (
                            <Option key={server}>{server}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="delSubserver" label="Subserver" >
                    <Select value={subserver} onChange={subserverchange}>
                        {subservers.map(subserver => (
                            <Option key={subserver}>{subserver}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="delDiscussion" label="Discussion" >
                    <Select value={discussion} onChange={discussionchange}>
                        {discussions.map(discussion => (
                            <Option key={discussion}>{discussion}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const UserInfo = () => {
    // 有问题不会改。。。得改create form逻辑
    const createServer = (data) => {
        let firstid = 1;
        // const { subServer } = data;
        // const { addsubserver } = data;

        // const serverArr = [];
        // serverArr.fill(subServer).fill(addsubserver);

        if (data.addsubserver == null) {
            return axios({
                method: 'post',
                url: 'http://localhost:3004/servers',
                data: {
                    title: data.title,
                    subServers: [{ id: firstid++, title: data.subserver }]
                }
            });
        }
        else {
            return axios({
                method: 'post',
                url: 'http://localhost:3004/servers',
                data: {
                    title: data.title,
                    subServers: [{ id: firstid++, title: data.subserver }]
                }
            }).then(axios({
                method: 'post',
                url: 'http://localhost:3004/servers/subServers',
                data: {
                    title: data.addsubserver[0],
                    id: firstid++
                }
            }));
        }
    }

    // 这块儿也有问题不会改，也交给你了。。。
    const updateServer = (id) => {
        return axios({
            method: 'get',
            url: 'http://localhost:3004/servers',
            params: {
                id: id
            }
        })
    }

    // 这块儿好像没用。。
    const [serverData, setServerData] = useState();
    useEffect(() => {
        updateServer().then(res => {
            setServerData(res.data);
        })
    }, [])

    // control 'create server' button
    const [visible, setVisible] = useState(false);

    // control 'manager' button
    const [managerVisible, setmanagerVisible] = useState(false);

    // create a new server function 
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        createServer(values);
        updateServer().then(res => {
            setServerData(res.data);
        });
        setVisible(false);
    };

    // manage servers
    const onManager = (values) => {
        console.log('ssss', values);
        setmanagerVisible(false);
    };

    return (
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
                    <CreateServerForm
                        visible={visible}
                        onCreate={onCreate}
                        onCancel={() => {
                            setVisible(false);
                        }}
                    />
                    <Button className='flexstyleColumn' type="primary" danger style={{ marginLeft: 10 }} onClick={() => {
                        setmanagerVisible(true);
                        // getServerData().then(res => (console.log(res.data[1].title)))
                    }}>Delete Server</Button>
                    <ManagerServerForm
                        managerVisible={managerVisible}
                        onManager={onManager}
                        onCancelManager={() => {
                            setmanagerVisible(false);
                        }} />
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

    )
}

export default UserInfo;