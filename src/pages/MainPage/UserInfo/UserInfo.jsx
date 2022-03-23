import { Layout } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

const { Content } = Layout

const UserInfo = () => {
    return (
        <Layout>
            <Content style={{ padding: 65 }}>
                <h2>Test UserInfo Page</h2>
            </Content>
        </Layout>
    )
}

export default UserInfo;