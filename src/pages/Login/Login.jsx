import { useEffect,useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import '/node_modules/antd/dist/antd.css';

import illustration from '../../images/WPIlogo.jpeg';

import passwordImg from '../../images/password.png';
import usernameImg from '../../images/username.png';

import './login.css';

const axios = require('axios').default;
//login api function
const login = (request) => {
  return axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
          "username": request.username,
          "password": request.password
      }
  })
}

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  
  function usernameChange(e){
    setUsername(e.target.value);
  }

  function passwordChange(e){
    setPassword(e.target.value);
  }

  async function loginClick(){
    let data = await login({
      "username" : username,
      "password" : password
    });
    if(data.status == 200){
      navigate("/home");
    }else{
      console.log("login fail")
    }
  }

  const goSignup = () => {
    navigate('/signup', {})
  }

  // const goHome = () => {
  //   navigate('/home', {
  //     state: { username: "testUsername" }
  //   })
  // }

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
            <h3>Welcome to log in</h3>
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
              onChange={usernameChange}
              rules={[
                {
                  required: true,
                  message: 'Please input your username',
                },
              ]}
            >
              <Input placeholder='input username' />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              onChange={passwordChange}
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
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
              <Button onClick={loginClick} type="primary" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
          {/* <div className='divider' /> */}
          <div>
            Don't have an account?
            <Button
              type="link"
              onClick={goSignup}
            >
              create a new account
            </Button>
            <Button
              type="link"
              
            >
              Enter as anonymous user
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;