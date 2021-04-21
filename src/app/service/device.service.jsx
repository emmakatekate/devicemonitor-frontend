import React from "react";
import axios from "axios";

const REST_URL = "http://localhost:8080/device";

export default class DeviceService extends React.Component {

  getPatientByUDI(udi,token) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "token":token
        },
        url: REST_URL+'/'+udi+'/patients'
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getDeviceByFhirId(fhirId,token) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "token":token
        },
        url: REST_URL+'?fhirId='+fhirId
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getDeviceByUDI(udi,token) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "token":token
        },
        url: REST_URL+'?udi='+udi
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getDeviceNameByUDI(udi,token) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "token":token
        },
        url: REST_URL+'/'+udi+'/name'
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}