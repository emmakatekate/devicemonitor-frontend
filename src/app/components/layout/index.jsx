import { Layout, Menu, Breadcrumb } from "antd";
import React from "react";
import "./index.less";
import { Link } from "react-router-dom";
import HeaderBar from "../header/index.jsx";
import Logo from "../../images/logo.png";

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: 'device',
    }

  }
  componentDidMount() {
    if(window.location){
      this.setState({
        pathName: window.location.pathname.split('/')[1]
      })
    }

  }
  render() {
    return (
      <div>
        <Layout style={{ height: "110vh" }}>
          <Header className="header">
            <img className="logo" src={Logo} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={this.state.pathName}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="device" >
                <Link to="/device">Device</Link>
              </Menu.Item>
              <Menu.Item key="patient">
                <Link to="/patient">Patient</Link>
              </Menu.Item>
              <HeaderBar />
            </Menu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div className="container">{this.props.children}</div>
          </Content>
          <Footer className="footer" style={{ textAlign: "center" }}>
            CS6440 DeviceMonitor Demo ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;