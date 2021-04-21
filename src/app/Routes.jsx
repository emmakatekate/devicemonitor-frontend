import React, { Component } from "react";
import {
  BrowserRouter,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import Layout from "./components/layout";
import DevicePage from "./pages/device";
import DeviceResultPage from "./pages/device/result";
import LoginPage from "./pages/login";
import PatientPage from "./pages/patient";
import PatientResultPage from "./pages/patient/result";

const LayoutRouter = (
    <Layout>
      <Switch>
        <Route exact path="/device" component={DevicePage} />
        <Route exact path="/patient" component={PatientPage} />
        <Route exact path="/device/result" component={DeviceResultPage} />
        <Route exact path="/patient/result" component={PatientResultPage} />
        <Redirect from='*' to='/' />
        <Route component={Error} />
      </Switch>
    </Layout>
  );

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route render={props => LayoutRouter} />
        </Switch>
      </BrowserRouter>
    );
  }
}