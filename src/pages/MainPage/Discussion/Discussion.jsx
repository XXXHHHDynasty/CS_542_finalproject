import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"
import './Discussion.css';
import { List, PageHeader, Layout, Avatar, Button, Form, Modal, Input } from 'antd';

const { Header, Content } = Layout;
const axios = require('axios').default;

const AddDiscussionForm = ({ visible, onCreate, onCancel }) => {

    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title="Add a new Discussion"
            okText="Add"
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
                name="addDiscussionForm"
            >
                <Form.Item
                    name="title"
                    label="Discussion Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of the discussion!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[
                    {
                        required: true,
                        message: 'Please input the description of the discussion!',
                    },
                ]}>
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
const Discussion = () => {

    const [discussionTitle, setdiscussionTitle] = useState('')
    const [discussionData, setdiscussionData] = useState('')
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            axios.get(`http://localhost:3000/subservers/${location.state.subserverId}/?_embed=discussions`).then(res => {
                setdiscussionData(res.data.discussions);
                setdiscussionTitle(res.data.title)
            })
        )
    }, [location.state]);

    // add a new discussion function 
    const onCreate = (values) => {
        console.log('yiyayiyao', values);
        axios.post(`http://localhost:3000/discussions`, {
            subserverId: parseInt(location.state.subserverId),
            title: values.title,
            description: values.description
        }).then(res => {
            axios.get(`http://localhost:3000/subservers/${location.state.subserverId}/?_embed=discussions`).then(res => {
                setdiscussionData(res.data.discussions);
            })
        })
        setVisible(false);
    };

    return (
        <Layout style={{ marginLeft: 200 }}>
            <Header />
            <Content>
                <PageHeader
                    style={{ backgroundColor: '#f5f5f5' }}
                    title={discussionTitle}
                    subTitle="This is a subtitle"
                    extra={
                        <Button key='1' type="primary" onClick={() => {
                            setVisible(true);
                        }} >
                            add discussion
                        </Button>
                    }
                />
                <AddDiscussionForm
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                />
                <List
                    style={{ backgroundColor: 'white', borderRadius: 5, margin: 20 }}
                    bordered
                    dataSource={discussionData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                key={item.id}
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<Link to={{
                                    pathname: "/home",
                                    state: { discussionId: item.id }
                                }}>{item.title}</Link>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                onClick={() => {
                                    navigate("/home", { state: { title: item.title } })
                                }}
                            />
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    )
};

export default Discussion;