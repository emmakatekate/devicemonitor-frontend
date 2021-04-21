import React from "react";
import axios from "axios";

const REST_URL = "http://hapi.fhir.org/baseR4/";

export default class FhirClientService extends React.Component {

  getMedicationRequests(patientFhirId) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        url: REST_URL+'MedicationRequest?patient='+patientFhirId
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getHeight(patientFhirId) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        url: REST_URL+'Observation?patient='+patientFhirId+'&code=http://loinc.org|8302-2'
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getWeight(patientFhirId) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        url: REST_URL+'Observation?patient='+patientFhirId+'&code=http://loinc.org|29463-7'
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