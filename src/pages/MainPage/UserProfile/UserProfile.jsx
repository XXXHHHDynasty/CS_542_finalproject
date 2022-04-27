import { Layout, Avatar, Modal, List, Tabs, Empty, Button, Typography, Radio, Input, Form, Select, Comment } from 'antd';
import React, { useState, useEffect } from 'react'
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './UserProfile.css';

const { Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

const axios = require('axios').default;

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
                        onCreate(values)
                    })
                    .then(() =>{
                        form.setFieldsValue({title:'',description:'', addsubserver:[], subserver:''})
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
const ManagerServerForm = ({ managerVisible, onManager, servers, onCancelManager }) => {

    const [subservers, setSubservers] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [managerform] = Form.useForm();

    // control server's choice
    const handleServerChange = (value) => {
        axios.get(`http://localhost:3000/servers/${value}?_embed=subservers`).then(res => {
            setSubservers(res.data.subservers)
        })
    };
    // control subserver's choice
    const subserverchange = (value) => {
        axios.get(`http://localhost:3000/subservers/${value}?_embed=discussions`).then(res => {
            setDiscussions(res.data.discussions)
        })
    };
    // control discussion's choice
    const discussionchange = (value) => {
        console.log(value, 'discussion id')
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
                    <Select onChange={handleServerChange}>
                        {servers.map(server => (
                            <Option key={server.id}>{server.title}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="delSubserver" label="Subserver" >
                    <Select onChange={subserverchange}>
                        {subservers.map(subserver => (
                            <Option key={subserver.id}>{subserver.title}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="delDiscussion" label="Discussion" >
                    <Select onChange={discussionchange}>
                        {discussions.map(discussion => (
                            <Option key={discussion.id}>{discussion.title}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const UserInfo = () => {

    const [servers, setServers] = useState([]);
    // use for updating when after creating a new server
    const [status, setStatus] = useOutletContext();
    // control 'create server' button
    const [visible, setVisible] = useState(false);
    // control 'manager' button
    const [managerVisible, setmanagerVisible] = useState(false);
    // saved discussions
    const [savedDiscussions, setSavedDiscussions] = useState([]);
    // saved comments
    const [savedComments, setSavedComments] = useState([])
    // user name
    const [name, setName] = useState('Olivia')

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/savedDiscussions`).then(res => {
            setSavedDiscussions(res.data)
        })
        axios.get(`http://localhost:3000/savedComments`).then(res => {
            setSavedComments(res.data)
        })
    }, []);

    // create a new server function 
    const onCreate = (values) => {
        if (values.addsubserver) {
            console.log(values,'alldata')
            values.addsubserver.unshift(values.subserver)
            console.log(values.addsubserver,'subserver')
            axios.post(`http://localhost:3000/servers`, {
                title: values.title
            }).then(res => {
                console.log(res, 'fanhuileshenmene')
                for (let key in values.addsubserver) {
                    axios.post(`http://localhost:3000/subservers`, {
                        title: values.addsubserver[key],
                        serverId: res.data.id
                    })
                }
            })
        } else {
            axios.post(`http://localhost:3000/servers`, {
                title: values.title
            }).then(res => {
                console.log(res, 'fanhuileshenmene')
                axios.post(`http://localhost:3000/subservers`, {
                    title: values.subserver,
                    serverId: res.data.id
                })
            })
        }
        setStatus(true);
        setVisible(false);
    };

    // delete discussion
    const onManager = (values) => {
        axios.delete(`http://localhost:3000/discussions/${values.delDiscussion}`)
        setStatus(true);
        setmanagerVisible(false);
    };

    // get serverdata and send it to 'ManagerServerForm' component
    const openDeleteServer = () => {
        setmanagerVisible(true)
        axios.get(`http://localhost:3000/servers`).then(res => {
            setServers(res.data)
        })
    }

    return (
        <Layout className="site-layout" style={{ marginLeft: 200, padding: 20 }}>
            <div className="flexrowallCenter" style={{ marginTop: 100 }}>
                <div className="flexstyleRow">
                    <Avatar size={100} src="https://joeschmoe.io/api/v1/random" style={{ marginLeft: 20 }}>Olivia</Avatar>
                    <div className='flexstyleColumn' style={{ marginLeft: 20 }}>
                        <Typography.Title editable={{ onChange: setName }} level={3} style={{ margin: 0, color: '#333' }}>
                            {name}
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
                    <Button className='flexstyleColumn' type="primary" danger style={{ marginLeft: 10 }} onClick={() => openDeleteServer()}>Delete Discussion</Button>
                    <ManagerServerForm
                        managerVisible={managerVisible}
                        onManager={onManager}
                        servers={servers}
                        onCancelManager={() => {
                            setmanagerVisible(false);
                        }} />
                </div>
            </div>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', backgroundColor: '#FFF' }}>
                <Tabs defaultActiveKey="1" style={{ padding: '20px 20px 0 20px' }}>
                    <TabPane tab="Saved Discusstions" key="1">
                        <div className='commentsShow' style={{ background: 'white' }}>
                            <List
                                style={{ backgroundColor: 'white', borderRadius: 5 }}
                                bordered
                                dataSource={savedDiscussions}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            key={item.id}
                                            avatar={<Avatar src={item.src} />}
                                            title={<Link to={{
                                                pathname: "/home",
                                                state: { title: item.title, id: item.savedDiscussionId }
                                            }}>{item.title}</Link>}
                                            description={item.description}
                                            onClick={() => {
                                                navigate("/home", { state: { title: item.title, id: item.savedDiscussionId } })
                                            }}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Saved Comments" key="2">
                        <div className="commentsShow">
                            <List
                                style={{ backgroundColor: '#FFFFFF', padding: 30 }}
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={savedComments}
                                renderItem={item => (
                                    <li>
                                        <Comment
                                            avatar={<Avatar src={item.src} />}
                                            author={item.author}
                                            content={item.msg}
                                        />
                                    </li>
                                )}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </Content>
        </Layout>
    )
}

export default UserInfo;