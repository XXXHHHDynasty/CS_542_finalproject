import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import '/node_modules/antd/dist/antd.css';

import illustration from '../../images/WPIlogo.jpeg';
import passwordImg from '../../images/password.png';
import usernameImg from '../../images/username.png';

import './login.modules.css';

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const navigate = useNavigate()

  const goHome = () => {
    navigate('/home', {
      state: { username: "testUsername" }
    })
  }

  return (
    <div className='login-wrap'>
      <div className='login-wrap-center'>
        <div className='logo-wrap'>
          <img src={illustration} className='.illustration' />
        </div>
        <div className='form-wrap'>
          <div>
            <div className='.title'>WPI Chat System</div>
            <div className='.welcome'>Welcome to sign in</div>
          </div>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input placeholder='input username' />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder='input password' />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button onClick={goHome} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default Login;