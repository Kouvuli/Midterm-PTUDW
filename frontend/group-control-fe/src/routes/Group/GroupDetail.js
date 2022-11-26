import { useState } from "react";

import { Layout, Menu } from "antd";
import { useParams } from "react-router-dom";

import MyFooter from "../../components/footer/MyFooter";
import GroupDetailCard from "../../components/group/GroupDetailCard";
import MemberList from "../../components/member/MemberList";
import TopNavigationBar from "../../components/nav/TopNavigationBar";

const { Header, Content } = Layout;

const groupData = {
  id: "g1",
  name: "GachaGang",
  imgUrl: "https://reqres.in/img/faces/12-image.jpg",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  owner: "Vinh",
  total: 12,
};

const groupMembers = [
  {
    id: "01",
    name: "Vinh",
    imgUrl: "https://reqres.in/img/faces/4-image.jpg",
    email: "123@gmail.com",
    role: "owner",
  },
  {
    id: "02",
    name: "Tien",
    imgUrl: "https://reqres.in/img/faces/5-image.jpg",
    email: "123@gmail.com",
    role: "member",
  },
  {
    id: "03",
    name: "Vinh",
    imgUrl: "https://reqres.in/img/faces/6-image.jpg",
    email: "123@gmail.com",
    role: "member",
  },
  {
    id: "04",
    name: "Vinh",
    imgUrl: "https://reqres.in/img/faces/7-image.jpg",
    email: "123@gmail.com",
    role: "member",
  },
];

const GroupDetailMenuOption = [
  {
    label: "Group detail",
    key: "detail",
  },
  {
    label: "Member settings",
    key: "member",
  },
];
const GroupDetail = () => {
  // let { groupId } = useParams;
  const [currentSelected, setCurrentSelected] = useState("member");
  const handleGroupMenuDetail = (e) => {
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
            items={GroupDetailMenuOption}
            onClick={(e) => handleGroupMenuDetail(e)}
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
            items={GroupDetailMenuOption}
            onClick={(e) => handleGroupMenuDetail(e)}
            selectedKeys={[currentSelected]}
          />
        </div>

        <Content className="list-group-content">
          {currentSelected === "detail" ? (
            <GroupDetailCard group={groupData} />
          ) : (
            <MemberList
              members={groupMembers}
              type={currentSelected === "ownedGroup" ? "owned" : "joined"}
            />
          )}
        </Content>
      </Layout>
      <MyFooter />
    </Layout>
  );
};
export default GroupDetail;
