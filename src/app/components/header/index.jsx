import React from "react";
import { Avatar,Popover,Button } from "antd";
import { BellOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import "./index.less";
import AuthService from "../../service/auth.service";

const authService = new AuthService();

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAvatar: false
    }

  }

  // handleLogout = () => {
  //   localStorage.removeItem('token');
  //   this.props.history.push({
  //     pathname: '/'
  //   })
  // }

  componentWillUnmount(){
    console.log('HeaderBar componentWillUnmount')
    localStorage.removeItem('token');
  }

  render() {

    let content = (
      <a href="/"> <Button>Logout</Button></a>
    );

    return (
      <div className="avatar">
        <SearchOutlined className="icons"/>
        <BellOutlined className="icons"/>
        <QuestionCircleOutlined className="icons" />

          <Avatar className="avatarIcon" style={{ color: "#fffff", backgroundColor: "#1890ff" }}>
          T
        </Avatar>
        <Popover placement="bottom" content={content} trigger="hover">
          <span color="#fffff">TestUser</span>
        </Popover>
      
        
      </div>
    );
  }
}

export default HeaderBar;