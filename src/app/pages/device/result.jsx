import React from 'react';
import "./index.less";
import { Row, Col, Descriptions, Badge , List, Skeleton,message,Spin ,Modal} from "antd";
import {RightOutlined} from '@ant-design/icons';
import AuthService from '../../service/auth.service';
import DeviceService from '../../service/device.service';
import PatientService from '../../service/patient.service';
import FhirClientService from '../../service/fhir.client.service';

const authService = new AuthService();
const deviceService = new DeviceService();
const patientService = new PatientService();
const fhirService = new FhirClientService();

class DeviceResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceUdi: '',
      data: null,
      loading:true,
      deviceName: '',
      patients:[],
      currentPatient:null,
      height: '',
      weight: '',
      medicationRequests:[],
      isModalVisible:false,
      currentPatientFhirId:null,
      token:''
    }

  }


  handleOk = () => {
    this.setState({
      isModalVisible:false
    })
  };

  handleCancel = () => {
    this.setState({
      isModalVisible:false
    })
  };


  handlePatientClick=(e,item)=>{
    this.setState({
      currentPatientFhirId:item.fhirPatientId
    })
    patientService.getPatientByFhirId(item.fhirPatientId,this.state.token).then(
      res => {
        console.log('getPatientByFhirId',res);
        this.setState({
          currentPatient:res.data
        })

        this.loadMedicationRequests();
        this.loadHeight();
        this.loadWeight();

        this.setState({
          isModalVisible:true
        })
      },
      err => {
        console.log(err);
      }
    );

    
  };


  loadMedicationRequests = () => {
    let fhirId= 0;
    if(this.state.currentPatient){
      fhirId=this.state.currentPatient.id;
    }else{
      fhirId=this.state.currentPatientFhirId;
    }
    fhirService.getMedicationRequests(fhirId).then(
      res => {
        console.log('loadMedicationRequests',res);
        this.setState({
          medicationRequests:res.data.entry
        })
      },
      err => {
        console.log(err);
      }
    );
  };

  loadHeight = () => {
    let fhirId= 0;
    if(this.state.currentPatient){
      fhirId=this.state.currentPatient.id;
    }else{
      fhirId=this.state.currentPatientFhirId;
    }
    fhirService.getHeight(fhirId).then(
      res => {
        console.log('loadHeight',res);
        this.setState({
          height:res.data
        })
      },
      err => {
        console.log(err);
      }
    );

  };

  loadWeight = () => {
    let fhirId= 0;
    if(this.state.currentPatient){
      fhirId=this.state.currentPatient.id;
    }else{
      fhirId=this.state.currentPatientFhirId;
    }
    fhirService.getWeight(fhirId).then(
      res => {
        console.log('loadWeight',res);
        this.setState({
          height:res.data
        })
      },
      err => {
        console.log(err);
      }
    );

  };



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

  };


  componentDidMount() {

    let token = localStorage.getItem('token');
    if(token){
    authService.tokenCheck(token).then(
      res => {
        console.log('token is valid');
        this.setState({
          token:token
        })
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

    deviceService.getDeviceByUDI(this.props.history.location.state.deviceUdi,this.props.history.location.state.token).then(
      res => {
        console.log(res);
        if(res.data){
          this.setState({
            data:res.data,
            loading:false
          })
        }else{
          message.warn('No devices found with this UDI');
          this.props.history.push({
            pathname: '/device'
          })
        }
      },
      err => {
        console.log(err);
        message.error('We are facing technical issue, please reach out to support team');
        
      }
    );

    deviceService.getDeviceNameByUDI(this.props.history.location.state.deviceUdi,this.props.history.location.state.token).then(
      res => {
        console.log(res);
        if(res.data){
          this.setState({
            deviceName:res.data
          })
        }
      },
      err => {
        console.log(err);
        message.error('We are facing technical issue, please reach out to support team');
        
      }
    );

    deviceService.getPatientByUDI(this.props.history.location.state.deviceUdi,this.props.history.location.state.token).then(
      res => {
        console.log(res);
        if(res.data){
          this.setState({
            patients:res.data
          })
        }
      },
      err => {
        console.log(err);
        message.error('We are facing technical issue, please reach out to support team');
        
      }
    );

    this.setState({
      deviceUdi:this.props.history.location.state.deviceUdi
    })
    console.log(this.props.history.location.state)

  }
  render() {


    return (
      
      <div className="patientResultContainer">
         {this.state.loading && <div className="deviceResultSpin"><Spin tip="Loading..."></Spin></div> }

         {!this.state.loading &&
        <div>
              
        <Row>
          <Col span={3}/>
          <Col span={12} >
          
            <Descriptions title="Device Information" layout="vertical" bordered>
              <Descriptions.Item label="Name">{this.state.deviceName} </Descriptions.Item>
              <Descriptions.Item label="Manufacturer" span={2}>{this.state.data.manufacturer}</Descriptions.Item>
              <Descriptions.Item label="Start Date"> 2019-04-24</Descriptions.Item>
              <Descriptions.Item label="Manufacture Date">{this.state.data.manufactureDate}</Descriptions.Item>
              <Descriptions.Item label="Expiration Date"> {this.state.data.expirationDate}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge status="processing" text="Active" />
              </Descriptions.Item>
              <Descriptions.Item  span={2} label="Last Updated">{this.state.data.meta.lastUpdated}</Descriptions.Item>
              <Descriptions.Item label="GUDID">{this.state.data.identifier[0].value.split('-')[0]}</Descriptions.Item>
              <Descriptions.Item label="Lot Number">{this.state.data.lotNumber}</Descriptions.Item>
             
            </Descriptions>
           
          </Col>
          <Col span={6}>
            <div className="searchResultContainer">
            <List
              header={<div>Related Patients</div>}
              bordered
              dataSource={this.state.patients}
              renderItem={item => (
                <List.Item
                actions={[<a key="list-loadmore-edit"><RightOutlined /></a>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <div><a key="list-loadmore-edit"
                   onClick={(e) => {this.handlePatientClick(e, item); }}
                  >{item.firstName +' '+ item.lastName + '  '+ item.dob}</a></div>
                </Skeleton>
              </List.Item>
              )}
            />
            </div>
          </Col>
          <Col span={3}/>
        </Row>
        </div>}

        <Modal visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <Descriptions title="Patient Information" layout="vertical" bordered>
              <Descriptions.Item label="First Name">{this.state.currentPatient && this.state.currentPatient.name[0].given[0]}</Descriptions.Item>
              <Descriptions.Item label="Last Name">{this.state.currentPatient && this.state.currentPatient.name[0].family}</Descriptions.Item>
              <Descriptions.Item label="Gender">{this.state.currentPatient && this.state.currentPatient.gender}</Descriptions.Item>
              <Descriptions.Item label="Date of Birth" >{this.state.currentPatient && this.state.currentPatient.birthDate}</Descriptions.Item>
              <Descriptions.Item label="Height">175 CM</Descriptions.Item>
              <Descriptions.Item label="Weight">65 KG</Descriptions.Item>
              <Descriptions.Item label="Phone Number">{this.state.currentPatient && this.state.currentPatient.telecom[0].value}</Descriptions.Item>
              <Descriptions.Item label="Email" span={2}>{this.state.currentPatient && this.state.currentPatient.telecom[1].value}</Descriptions.Item>
              <Descriptions.Item label="Medication Requests" span={3}>
              <List
                  size="small"
                  dataSource={this.state.medicationRequests}
                  renderItem={item => <List.Item>{item.resource.medicationCodeableConcept.coding[0].display}</List.Item>}
              />
              </Descriptions.Item>
             
              
             
            </Descriptions>
      </Modal>
      </div>
    );
  }
}


export default DeviceResultPage;