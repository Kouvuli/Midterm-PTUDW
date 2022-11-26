import { useState } from "react";

import { Layout, Menu } from "antd";

import DashBoardCard from "../../components/dashboard/DashBoardCard";
import MyFooter from "../../components/footer/MyFooter";
import TopNavigationBar from "../../components/nav/TopNavigationBar";

const { Header, Content } = Layout;
const DashBoardItem = [
  {
    label: "My profile",
    key: "profile",
  },
  {
    label: (
      <a href="/mygroup" target="" rel="noopener noreferrer">
        My Group
      </a>
    ),
    key: "myGroup",
  },
];

const user = {
  username: "vtvinh1412",
  email: "123@gmail.com",
  name: "Vinh",
  imgUrl: "https://reqres.in/img/faces/12-image.jpg",
};
const DashBoard = () => {
  const [currentSelected, setCurrentSelected] = useState("profile");

  const handleDashBoardMenu = (e) => {
    setCurrentSelected(e.key);
  };
  return (
    <Layout>
      <Header
        className="top-nav-header"
        style={{ background: "#fff", padding: 0 }}
      >
        <TopNavigationBar />
      </Header>
      <Layout className="body-content">
        <span
          className="group-menu"
          style={{
            position: "fixed",
            top: 60,
            zIndex: 1000,
            width: "100%",
            left: 0,
            margin: 0,
          }}
        >
          <Menu
            style={{ fontSize: 18 }}
            items={DashBoardItem}
            onClick={(e) => handleDashBoardMenu(e)}
            selectedKeys={[currentSelected]}
          />
        </span>

        <div
          className="sider-group-menu"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            zIndex: 1000,
            width: 220,
          }}
        >
          <Menu
            style={{ fontSize: 18 }}
            items={DashBoardItem}
            onClick={(e) => handleDashBoardMenu(e)}
            selectedKeys={[currentSelected]}
          />
        </div>

        <Content className="list-group-content">
          <DashBoardCard user={user} />
        </Content>
      </Layout>
      <MyFooter />
    </Layout>
  );
};

export default DashBoard;
