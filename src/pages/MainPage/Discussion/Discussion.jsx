import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"
import './Discussion.css';
import { List, PageHeader, Layout, Avatar } from 'antd';

const { Header, Content } = Layout;
const axios = require('axios').default;


var discussionData = [];

const Discussion = () => {

    const [discussionTitle, setdiscussionTitle] = useState('')
    const location = useLocation();
    const navigate = useNavigate();

    // find subserverid with serverid
    const getSubserver = (data, id) => {
        for (let item in data) {
            if (data[item].id == id) {
                getDiscussion(data[item].subServers, location.state.subserverId)
            }
        }
    };

    // find discussionid with subserverid
    const getDiscussion = (data, id) => {
        for (let item in data) {
            if (data[item].id == id) {
                discussionData = data[item].discussions;
                console.log(discussionData,'opopopopop')
                setdiscussionTitle(data[item].title)
                break;
            }
        }
    };

    useEffect(() => {
        fetch(
            axios.get(`http://localhost:3000/servers`).then(res => {
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