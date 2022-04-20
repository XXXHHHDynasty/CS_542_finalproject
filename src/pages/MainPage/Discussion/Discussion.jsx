import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import './Discussion.css';
import { List, PageHeader, Layout, Avatar } from 'antd';

const { Header, Footer, Content, Sider } = Layout;
const axios = require('axios').default;


var discussionData = [];

const Discussion = () => {

    const [discussionTitle, setdiscussionTitle] = useState('')
    const navigate = useNavigate();
    // const { state } = useLocation();
    const location = useLocation();
    // const { UserId } = state || {};

    const getSubserver = (data, id) => {
        for (let item in data) {
            if (data[item].id == id) {
                console.log(data[item], 'subservvvvvvv')
                getDiscussion(data[item].subServers, location.state.subserverId)
            }
        }
    };

    const getDiscussion = (data, id) => {
        for (let item in data) {
            if (data[item].id == id) {
                discussionData = data[item].discussions;
                setdiscussionTitle(data[item].title)
                console.log(data[item], 'disucssionDaraaaaaaaaaa')
                break;
            }
        }
    };

    useEffect(() => {
        fetch(
            axios.get(`http://localhost:3000/servers`).then(res => {
                console.log(res.data, 'testyyyy')
                getSubserver(res.data, location.state.serverId)
            })
        )
    }, [location.state]);

    return (
        <Layout style={{ marginLeft: 200 }}>
            <Header />
            <Content style={{ padding: 40 }}>
                <PageHeader
                    className="site-page-header"
                    title={discussionTitle}
                    subTitle="This is a subtitle"
                />
                <List
                    style={{ backgroundColor: 'white', borderRadius: 8 }}
                    bordered
                    dataSource={discussionData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    )
};

export default Discussion;