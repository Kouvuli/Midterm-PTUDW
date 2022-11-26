import { HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "../../App.css";

const loggedInItems = [
  {
    label: (
      <a href="/home" target="" rel="noopener noreferrer">
        Home
      </a>
    ),
    key: "home",
    icon: <HomeOutlined style={{ fontSize: 24 }} />,
  },
  {
    label: (
      <a href="/creategroup" target="" rel="noopener noreferrer">
        Create Group
      </a>
    ),
    key: "createGroup",
  },
  {
    label: (
      <a href="/mygroup" target="" rel="noopener noreferrer">
        My Group
      </a>
    ),
    key: "myGroup",
  },
  {
    label: (
      <a href="/dashboard" target="" rel="noopener noreferrer">
        Dashboard
      </a>
    ),
    key: "dashboard",
  },
];
const loggedOutItems = [
  {
    label: (
      <a href="/home" target="" rel="noopener noreferrer">
        Home
      </a>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Sign in",
    key: "signIn",
  },
];

const AppMenu = ({ user, isInline }) => {
  user = true;
  return (
    <Menu
      items={user ? loggedInItems : loggedOutItems}
      mode={isInline ? "horizontal" : "vertical"}
      style={{ fontSize: 20 }}
    />
  );
};

export default AppMenu;
