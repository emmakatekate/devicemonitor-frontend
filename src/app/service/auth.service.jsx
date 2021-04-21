import React from "react";
import axios from "axios";

const REST_URL = "http://localhost:8080/user/";

export default class AuthService extends React.Component {

    login(username,password) {
        return new Promise((resolve, reject) => {
          axios({
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'username': username,
                'password': password
              },
            url: REST_URL+'login'
          })
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
      }


  tokenCheck(token) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
          "token": token
        },
        url: REST_URL+'token'
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