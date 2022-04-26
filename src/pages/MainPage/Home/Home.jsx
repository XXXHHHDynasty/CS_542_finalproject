import React, { createElement, useState, useEffect } from 'react';
import './home.css';
import { useLocation } from "react-router-dom"
import { Layout, Input, Button, Comment, Avatar, Tooltip, List, PageHeader, Skeleton, Divider } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Header, Footer, Content, Sider } = Layout;

const axios = require('axios').default;

// submit content
const pushContents = (msg) => {
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
const updateContents = (id) => {
    return axios({
        method: 'get',
        url: 'http://localhost:3000/posts',
        params: {
            id: id
        }
    })
}

const Home = () => {

    const location = useLocation();
    // everytime refresh page will get all post contents
    useEffect(() => {
        loadMoreData();
    }, [location.state]);

    const [postMessage, setPost] = useState('');
    const [data, setData] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [loading, setLoading] = useState(false);

    const like = (id) => {
        console.log(id, 'userID');
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

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch(updateContents().then(res => {
            setData([...data, ...res.data]);
            setLoading(false);
        })).catch(() => {
            setLoading(false);
        });
    };

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
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={data.length < 10}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
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
                    </InfiniteScroll>
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
                        pushContents(postMessage).then(res => {
                        })
                        updateContents().then(res => {
                            setData(res.data);
                        })
                        setPost('')
                    }}>Submit</Button>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>WPI Chat System ©2022 Created by CS 542 Group</Footer>
        </Layout>
    )
}

export default Home;