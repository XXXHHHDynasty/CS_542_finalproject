import React from 'react';
import { useState } from 'react';
import './home.css';
import { Layout, Menu, Input, Button, Comment, Tooltip, List } from 'antd';

const { Header, Footer, Content, Sider } = Layout;
const { TextArea } = Input;

const axios = require('axios').default;

// submit content
const getPosts = (msg) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/posts',
        data: {
            title: 'testTitle',
            author: 'testAuthor',
            msg: msg
        }
    })
}

// for updating all comments
const updateComments = () => {
    return axios({
        method: 'get',
        url: 'http://localhost:3000/posts',
        data: {}
    })
}

const Home = () => {

    const [postMessage, setPost] = useState('');
    const [data, setData] = useState('');

    return (
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div className="submit">
                    <List
                        className="comment-list"
                        header={`${data.length} replies`}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <li>
                                <Comment
                                    avatar={item.src}
                                    author={item.author}
                                    content={item.msg}
                                />
                            </li>
                        )}
                    />
                    <div className='postSubmit'>
                        <Input
                            style={{ width: '90%' }}
                            value={postMessage}
                            onChange={event => {
                                setPost(event.target.value);
                            }}>
                        </Input>
                        <Button type="primary" onClick={() => {
                            getPosts(postMessage).then(res => {
                            })
                            updateComments().then(res => {
                                setData(res.data);
                            })
                            setPost('')
                        }}>Submit</Button>
                    </div>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>WPI Chat System ©2022 Created by CS 542 Group</Footer>
        </Layout>
    )
}

export default Home;