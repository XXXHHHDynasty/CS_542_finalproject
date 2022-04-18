import React, { createElement, useState, useEffect } from 'react';
import './home.css';
import { Layout, Menu, Input, Button, Comment, Avatar, Tooltip, List } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

const { Header, Footer, Content, Sider } = Layout;

const axios = require('axios').default;

// submit content
const pushContents = (msg) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3004/posts',
        data: {
            title: 'testTitle',
            author: 'testAuthor',
            msg: msg
        }
    })
}

// for updating all comments
const updateContents = (id) => {
    return axios({
        method: 'get',
        url: 'http://localhost:3004/posts',
        params:{
            id: id
        }
    })
}

const Home = () => {

    // everytime refresh page will get all post contents
    useEffect(() => {
        updateContents().then(res => {
            setData(res.data);
        })
    }, []);
    
    const [postMessage, setPost] = useState('');
    const [data, setData] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    
    const like = (id) => {
        console.log(id,'userID');
        updateContents(id).then(res => {
            // update the new data
            console.log(res);
        });
        setLikes(likes + 1);
        setAction('liked');
      };
    
    const dislike = (id) => {
        updateContents(id).then(res => {
            console.log(res.data);
        });
        setDislikes(dislikes + 1);
        setAction('disliked');
      };

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
                                    actions={[
                                        <Tooltip key="comment-basic-like" title="Like">
                                            <span onClick={like.bind(this, item.id)}>
                                                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                                                <span className="comment-action">{likes}</span>
                                            </span>
                                        </Tooltip>,
                                        <Tooltip key="comment-basic-dislike" title="Dislike">
                                            <span onClick={dislike.bind(this, item.id)}>
                                                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                                                <span className="comment-action">{dislikes}</span>
                                            </span>
                                        </Tooltip>,
                                        <span key="comment-basic-reply-to">Reply to</span>
                                    ]}
                                    avatar={<Avatar src={item.src} />}
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
                            pushContents(postMessage).then(res => {
                            })
                            updateContents().then(res => {
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