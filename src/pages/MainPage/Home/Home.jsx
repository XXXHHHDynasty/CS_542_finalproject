import React, { createElement, useState, useEffect } from 'react';
import './home.css';
import { useLocation } from "react-router-dom"
import { Layout, Input, Button, Comment, Avatar, Tooltip, List, PageHeader, Skeleton, Divider } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

const { Header, Footer, Content, Sider } = Layout;

const axios = require('axios').default;


const Home = () => {

    const [postMessage, setPost] = useState('');
    const [data, setData] = useState('');

    const location = useLocation();

    // everytime refresh page will get all post contents
    useEffect(() => {
        loadData();
    }, [location.state]);

    const clickLike = (item) => {
        axios.put(`http://localhost:3000/posts/${item.id}`, {
            title: item.title,
            author: item.author,
            msg: item.msg,
            src: item.src,
            discussionId: item.discussionId,
            likes: item.likes + 1,
            dislikes: item.dislikes
        }).then(res => {
            loadData()       
        })
    };

    const clickDislike = (item) => {
        axios.put(`http://localhost:3000/posts/${item.id}`, {
            title: item.title,
            author: item.author,
            msg: item.msg,
            src: item.src,
            discussionId: item.discussionId,
            likes: item.likes,
            dislikes: item.dislikes + 1
        }).then(res => {
            loadData()       
        })
    };

    const loadData = () => {
        fetch(axios.get(`http://localhost:3000/discussions/${location.state.id}?_embed=posts`)
            .then(res => {
                setData(res.data.posts)
            }))
    };

    // post a comment
    const pushContents = (msg) => {
        axios.post(`http://localhost:3000/posts`, {
            title: 'testTitle',
            author: 'testAuthor',
            msg: msg,
            likes: 0,
            dislikes: 0,
            discussionId: location.state.id
        }).then(() => {
            setPost('')
            axios.get(`http://localhost:3000/discussions/${location.state.id}?_embed=posts`).then(res => {
                setData(res.data.posts);
            });
        })
    }

    return (
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header />
            <Content>
                <PageHeader
                    className='site-page-header-responsive'
                    onBack={() => window.history.go(-2)}
                    title={location.state.title}
                />
                <div className="submit">
                        <List
                            style={{ backgroundColor: '#FFFFFF', padding: 30 }}
                            className="comment-list"
                            header={`${data.length} replies`}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={[
                                            <Tooltip key="comment-basic-like" title="Like">
                                                <span>
                                                    <Button icon={<LikeOutlined />} size="small" style={{border:0}} onClick={() => {
                                                        clickLike(item)
                                                    }}></Button>
                                                    <span className="comment-action">{item.likes}</span>
                                                </span>
                                            </Tooltip>,
                                            <Tooltip key="comment-basic-dislike" title="Dislike">
                                                <span key={item.id}>
                                                    <Button icon={<DislikeOutlined />} size="small" style={{border:0}} onClick={() => {
                                                        clickDislike(item)
                                                    }}></Button>
                                                    <span className="comment-action">{item.dislikes}</span>
                                                </span>
                                            </Tooltip>,
                                        ]}
                                        avatar={<Avatar src={item.src} />}
                                        author={item.author}
                                        content={item.msg}
                                    />
                                </li>
                            )}
                        />
                        <Divider plain>It is all, nothing more 🤐</Divider>
                </div>
                <div className='postSubmit'>
                    <Input
                        style={{ width: '92%' }}
                        value={postMessage}
                        onChange={event => {
                            setPost(event.target.value);
                        }}>
                    </Input>
                    <Button type="primary" style={{ height: '100%' }} onClick={() => {
                        pushContents(postMessage)
                    }}>Submit</Button>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>WPI Chat System ©2022 Created by CS 542 Group</Footer>
        </Layout>
    )
}

export default Home;