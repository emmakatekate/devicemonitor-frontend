import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col ,message} from 'antd';
import "./index.less";
import {
  Redirect
} from "react-router-dom";
import AuthService from '../../service/auth.service';

const authService = new AuthService();

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    if(token){
    authService.tokenCheck(token).then(
      res => {
        console.log('token is valid');
        this.redirectToDevicePage();
      },
      err => {
        console.log(err);
      }
    );
    }

  }

  redirectToDevicePage = () => {
    return <Redirect to="/device" />
  }
  

  onFinish = (e) => {
    authService.login(e.username,e.password).then(
      res => {
        console.log('credentials are valid',res);
        localStorage.removeItem('token');
        localStorage.setItem('token', res.data.token);
        this.props.history.push({
          pathname: '/device'
        })
      },
      err => {
        console.log(err);
        message.error('Wrong username and password')
      }
    );
    
  };

  onFinishFailed = (e) => {
    console.log('Failed:', e);
  };



  render() {
    return (
      <div className="login-container">
        
         <Row>
          <Col span={8}/>
          <Col span={8} style={{marginBottom:30, fontSize:40}}>DeviceMonitor</Col>
          <Col span={8}/>
        </Row>
        <Row >
          <Col span={7} />
          <Col span={8}>
             <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.nFinishFailed}

          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" >
                LOGIN
          </Button>
            </Form.Item>
          </Form>
          </Col>
          <Col span={6} />
        </Row>
       
      </div>
    );
  }
}

export default LoginPage;