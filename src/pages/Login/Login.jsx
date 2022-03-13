import { useEffect } from 'react';
import { history, request, useRequest } from 'umi';
import { Button, Form, Input, Select, message } from 'antd';
import { useModel } from 'umi';
// import { userName } from 'config'

import icon from '@/images/login_icon.png';
import illustration from '@/images/icon.png';
import passwordImg from '@/images/password.png';
import usernameImg from '@/images/username.png';

import styles from './login.modules.less';

let LoginParams = {
  uname: '',
  password: ''
};

const Login = () => {
  const { refresh } = useModel('@@initialState');
  const [form] = Form.useForm();
  // const _userName = userName()

  const loginHook = () => {
    form.validateFields().then(() => {
      const { username, password } = form.getFieldsValue();
      const data = {
        uname: username,
        password: password,
      };
    });
  };
  const onFinish = async (values) => {
    history.push('/');

    setTimeout(() => {
      refresh();
    }, 0);
  };

  return (
    <div className={styles['login-wrap']}>
      <div className={styles['login-wrap-center']}>
        <div className={styles['logo-wrap']}>
          <img src={illustration} className={styles.illustration} />
        </div>
        <div className={styles['form-wrap']}>
          <div>
            <div className={styles.title}>Algorithm Management System</div>
            <div className={styles.welcome}>WELCOME TO SIGN IN</div>
          </div>

          <Form
            // onFinish={onFinish}
            form={form}
            style={{ marginTop: 15 }}
            // initialValues={{ password: 'lgkj@wl' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Username cannot be empty!' }]}
            >
              <Input
                bordered={false}
                placeholder="Please Enter Username"
                prefix={
                  <img
                    src={usernameImg}
                    style={{ width: 18, marginRight: 10 }}
                  />
                }
                autoComplete="off"
              />
            </Form.Item>
            <div className={styles.divider} />
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Password can not be empty!' },
              ]}
            >
              <Input.Password
                bordered={false}
                placeholder="Please Enter Password"
                prefix={
                  <img
                    src={passwordImg}
                    style={{ width: 18, marginRight: 10 }}
                  />
                }
                autoComplete="off"
              />
            </Form.Item>
            <div className={styles.divider} />
            <div className={styles.divider} />
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                shape="round"
                block
                onClick={() => {
                  loginHook();
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.divider} />
          <div>
            Don't have an account?
            <Button
              type="link"
              onClick={() => {
                history.push('/create');
              }}
            >
              create a new account
            </Button>
            <Button
              type="link"
              onClick={() => {
                history.push('/');
              }}
            >
              Enter as anonymous user
            </Button>
          </div>
        </div>

        <div className={styles.copyright}>
          CS542
          {/* {info.updateDate} */}
        </div>
      </div>
    </div>
  );
};

export default Login;