import React from 'react';
import "./index.less";
import { Row, Col, Descriptions , List, Skeleton,Spin} from "antd";
import {RightOutlined} from '@ant-design/icons';
import AuthService from '../../service/auth.service';
import PatientService from '../../service/patient.service';
import FhirClientService from '../../service/fhir.client.service';

const authService = new AuthService();
const patientService = new PatientService();
const fhirService = new FhirClientService();

class PatientResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      patients: [],
      currentPatient:null,
      height: '',
      weight: '',
      medicationRequests:[],
      isModalVisible:false,

    }

  }

  showModal = () => {
    this.setState({
      isModalVisible:true
    })
  };

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
      currentPatient:item
    })
    this.loadMedicationRequests();
    this.loadHeight();
    this.loadWeight();
  };

  loadMedicationRequests = () => {
    let fhirId= 0;
    if(this.state.currentPatient){
      fhirId=this.state.currentPatient.id;
    }else{
      fhirId=this.props.history.location.state.patients[0].id;
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
      fhirId=this.props.history.location.state.patients[0].id;
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
      fhirId=this.props.history.location.state.patients[0].id;
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



  componentDidMount() {

    let token = localStorage.getItem('token');
    if(token){
    authService.tokenCheck(token).then(
      res => {
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
   console.log('data from index:',this.props.history.location.state)
    this.setState({
      currentPatient:this.props.history.location.state.patients[0],
      patients:this.props.history.location.state.patients,
      loading:false
    })

    this.loadMedicationRequests();
    this.loadHeight();
    this.loadWeight();


  }
  render() {

    return (
      <div className="patientResultContainer">
         {this.state.loading && <div className="patientResultSpin"><Spin tip="Loading..."></Spin></div> }

      {!this.state.loading && <div>
        <Row>
          <Col span={3}/>
          <Col span={12} >
          
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
           
          </Col>
          <Col span={6}>
            <div className="searchResultContainer">
            <List
              header={<div>Search Results</div>}
              bordered
              dataSource={this.state.patients}
              renderItem={item => (
                <List.Item
                actions={[<a key="list-loadmore-edit"><RightOutlined /></a>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                <div><a key="list-loadmore-edit"
                      onClick={(e) => {this.handlePatientClick(e, item); }}
                >{item.name[0].given[0] +' '+ item.name[0].family + '  '+ item.birthDate}</a></div>
                </Skeleton>
              </List.Item>
              )}
            />
            </div>
          </Col>
          <Col span={3}/>
        </Row>
        </div>}
      </div>
    );
  }
}


export default PatientResultPage;