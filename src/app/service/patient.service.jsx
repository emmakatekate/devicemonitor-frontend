import React from "react";
import axios from "axios";

const REST_URL = "http://localhost:8080/patient";

export default class PatientService extends React.Component {

  getPatients(param,token) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        params: param,
        headers: {
          "Content-Type": "application/json",
          "token":token
        },
        url: REST_URL
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getPatientByFhirId(fhirId,token) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "token":token
        },
        url: REST_URL+'/'+fhirId
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