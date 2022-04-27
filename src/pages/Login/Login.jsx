import { useNavigate, useLocation } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { useEffect } from 'react'
import "/node_modules/antd/dist/antd.css";
import illustration from "../../images/WPIlogo.jpeg";
import "./login.css";

const axios = require('axios').default;

const Login = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  // receive information from 'register' page
  useEffect(() => {
    form.setFieldsValue({
      username: location.state ? location.state.username : '',
      password: location.state ? location.state.password : ''
    })
  }, []);

  // navigate to 'register' Page
  const goSignup = () => {
    navigate('/signup', {})
  }

  // naviagte to 'Home' Page
  const goHome = (username) => {
    navigate('/empty', { username })
  }

  // submit users' information & naviagte to 'Home' page
  const onFinish = (values) => {
    console.log('Success:', values);
    return axios({
      method: 'post',
      url: 'http://localhost:3000/users',
      data: {
        username: values.username,
        password: values.password,
        remember: values.remember
      }
    }),
      goHome(values.username)
  };

  // print message when login failed
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
            <div style={{ fontSize: 30, color: '#333' }}>WPI Chat System</div>
            <div style={{ fontSize: 15, color: '#333' }}>Welcome to log in</div>
          </div>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
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
                  message: 'Please input your username',
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
            <Form.Item>
              <Button style={{ width: '100%' }} onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();
                    onFinish(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
              }} type="primary" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
          <div className="loginOtherSelection">
            <div style={{ fontSize: 12, color: '#666', padding: '4px 15px 4px 15px' }}>Don't have an account?</div>
            <div className="buttonColletion">
              <Button type="link" style={{ fontSize: 12 }} onClick={goSignup}>
                create a new account
              </Button>
              <Button type="link" style={{ fontSize: 12 }}>Enter as anonymous user</Button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;