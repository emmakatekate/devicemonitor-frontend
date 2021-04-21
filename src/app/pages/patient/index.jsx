import React from 'react';
import "./index.less";
import { Input, Button, Row, Col, message,Modal } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import AuthService from '../../service/auth.service';
import PatientService from '../../service/patient.service';

const authService = new AuthService();
const patientService = new PatientService();

class PatientPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: '',
      firstName: '',
      lastName: '',
      dob:'',
      token:'',
      patients: []
    }

  }
  onInputChange = e => {
    //console.log(e.target);
    if (e.target.name === 'patientId') {
      this.setState({
        patientId: e.target.value
      });
    }
    if (e.target.name === 'firstName') {
      this.setState({
        firstName: e.target.value
      });
    }
    if (e.target.name === 'lastName') {
      this.setState({
        lastName: e.target.value
      });
    }
    if (e.target.name === 'dob') {
      this.setState({
        dob: e.target.value
      });
    }

  };

  handleSearchButton = () => {
    //console.log('firstName=', this.state.firstName);
    if(this.state.patientId || this.state.firstName || this.state.lastName || this.state.dob){
      let searchParams = new URLSearchParams();
      if(this.state.patientId){
        searchParams.append('fhirId',this.state.patientId);
      }
      if(this.state.firstName){
        searchParams.append('firstName',this.state.firstName);
      }
      if(this.state.lastName){
        searchParams.append('lastName',this.state.lastName);
      }
      if(this.state.dob){
        searchParams.append('dob',this.state.dob);
      }
      
      patientService.getPatients(searchParams,this.state.token).then(
        res => {
          console.log(res);
          if(res.data){
            this.setState({
              patients:res.data
            })
            this.props.history.push({
              pathname: '/patient/result',
              state: this.state
            })
          }else{
            message.warn('No patients found');
          }
        },
        err => {
          console.log(err);
          message.error('We are facing technical issue, please reach out to support team');
          
        }
      );

   

  }else{
    message.error('Please enter a valid value');
  }
  };


  componentDidMount() {

    let token = localStorage.getItem('token');
    if(token){
    authService.tokenCheck(token).then(
      res => {
        this.setState({
          token:token
        })
        console.log('token is valid');
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
      <div >

        <Row gutter={16} className="searchBox">
          <Col span={7} />
          <Col span={10}>
            <Input
              onChange={this.onInputChange}
              name="patientId"
              addonBefore="Patient ID"
              placeholder="Please enter the patient ID"
            />
          </Col>
        
          <Col span={7} />
        </Row>
        <br/>
        <Row gutter={16} >
          <Col span={7} />
          <Col span={10}>
            <Input
              onChange={this.onInputChange}
              name="firstName"
              addonBefore="First Name"
              placeholder="Please enter the patient's first name"
            />
          </Col>
        
          <Col span={7} />
        </Row>
        <br/>
        <Row gutter={16} >
          <Col span={7} />
          <Col span={10}>
            <Input
              onChange={this.onInputChange}
              name="lastName"
              addonBefore="Last Name"
              placeholder="Please enter the patient's last name"
            />
          </Col>
        
          <Col span={7} />
        </Row>
        <br/>
        <Row gutter={16} >
          <Col span={7} />
          <Col span={10}>
            <Input
              onChange={this.onInputChange}
              name="dob"
              addonBefore="Date of Birth"
              placeholder="Please enter the date of birth (yyyy-mm-dd)"
            />
          </Col>
        
          <Col span={7} />
        </Row>

        <br/>
        <Row gutter={16} >
        <Col span={24}>
          <Button type="primary" icon={<SearchOutlined />} onClick={this.handleSearchButton}>Search</Button>
          </Col>
        </Row>

      
      </div>
    );
  }
}


export default PatientPage;