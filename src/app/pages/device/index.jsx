import React from 'react';
import "./index.less";
import { Input, Button, Row, Col, message } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import AuthService from '../../service/auth.service';
import DeviceService from '../../service/device.service';

const authService = new AuthService();
const deviceService = new DeviceService();


class DevicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceUdi: '',
      token:''
    }

  }
  onInputChange = e => {
    console.log(e.target);
    if (e.target.name === 'deviceUdi') {
      this.setState({
        deviceUdi: e.target.value
      });
    }

  };

  handleSearchButton = () => {
    console.log('deviceUdi=', this.state.deviceUdi);
    
    if(this.state.deviceUdi && this.state.deviceUdi.length == 14){

    deviceService.getDeviceByUDI(this.state.deviceUdi,this.state.token).then(
      res => {
        console.log(res);
        if(res.data){

          this.props.history.push({
            pathname: '/device/result',
              state: this.state
          })
        }else{
          message.warn('No devices found with this UDI');
        }
      },
      err => {
        console.log(err);
        message.error('We are facing technical issue, please reach out to support team');
        
      }
    );

    
  }else{
    message.error('Please enter a valid device UDI');
  }
  };

  

  componentDidMount() {
    let token = localStorage.getItem('token');
    if(token){
    authService.tokenCheck(token).then(
      res => {
        console.log('token is valid');
        this.setState({
          token: token
        });
      },
      err => {
        console.log(err);
        this.props.history.push({
          pathname: '/'
        })
      }
    );
    }else{
      this.props.history.push({
        pathname: '/'
      })
    }

  }
  render() {
    return (
      <div className="container">

        <Row gutter={16} className="searchBox">
          <Col span={7} />
          <Col span={8}>
            <Input
              onChange={this.onInputChange}
              name="deviceUdi"
              addonBefore="Device UDI"
              placeholder="Please enter the device UDI"
            />
          </Col>
          <Col span={2}>
          <Button type="primary" icon={<SearchOutlined />} onClick={this.handleSearchButton}>Search</Button>
          </Col>
          <Col span={7} />
        </Row>
      </div>
    );
  }
}


export default DevicePage;