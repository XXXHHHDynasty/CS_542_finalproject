import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import '/node_modules/antd/dist/antd.css';

import illustration from '../../images/WPIlogo.jpeg';
import passwordImg from '../../images/password.png';
import usernameImg from '../../images/username.png';

import './signup.css';

const Signup = () => {
  const navigate = useNavigate()

  const goLogin = () => {
    navigate('/login', {
      state: { username: "testUsername" }
    })
  }

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login-wrap'>
      <div className='login-wrap-center'>
        <div className='logo-wrap'>
          <img src={illustration} className='.illustration' />
        </div>
        <div className='form-wrap'>
          <div>
            <h1>WPI Chat System</h1>
            <h3>Welcome to sign up</h3>
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
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
              ]}
            >
              <Input.Password placeholder='confirm password' />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button onClick={goLogin} type="primary" htmlType="submit">
                Create Account
              </Button>
            </Form.Item>
          </Form>
          <div>
            Already have an account?
            <Button
              type="link"
              onClick={goLogin}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Signup;