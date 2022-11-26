import GroupList from "../../components/group/GroupList";
import TopNavigationBar from "../../components/nav/TopNavigationBar";

import { useState } from "react";

import { Menu, Layout } from "antd";

import "../../App.css";
import MyFooter from "../../components/footer/MyFooter";

const { Header, Content } = Layout;

const ownedGroups = [
  {
    id: "g1",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/1-image.jpg",
    total: 12,
    owner: "Vinh",
  },
  {
    id: "g2",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/1-image.jpg",
    total: 12,
    owner: "Vinh",
  },
  {
    id: "g3",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/1-image.jpg",
    total: 12,
    owner: "Vinh",
  },
  {
    id: "g4",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/1-image.jpg",
    total: 12,
    owner: "Vinh",
  },
  {
    id: "g5",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/1-image.jpg",
    total: 12,
    owner: "Vinh",
  },
];

const JoinedGroups = [
  {
    id: "g1",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/2-image.jpg",
    total: 12,
    owner: "Vinh",
  },
  {
    id: "g2",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/2-image.jpg",
    total: 12,
    owner: "Vinh",
  },
  {
    id: "g3",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/2-image.jpg",
    total: 12,
    owner: "Vinh",
  },
  {
    id: "g4",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/2-image.jpg",
    total: 12,
    owner: "Vinh",
  },
  {
    id: "g5",
    name: "Gacha gang",
    imgUrl: "https://reqres.in/img/faces/2-image.jpg",
    total: 12,
    owner: "Vinh",
  },
];

const GroupsMenuOption = [
  {
    label: "Owned Group",
    key: "ownedGroup",
  },
  {
    label: "Joined Group",
    key: "joinedGroup",
  },
];
const MyGroup = () => {
  const [currentSelected, setCurrentSelected] = useState("ownedGroup");
  const [groups, setGroups] = useState(ownedGroups);

  const handleGroupsMenu = (e) => {
    setCurrentSelected(e.key);
    switch (e.key) {
      case "ownedGroup":
        setGroups(ownedGroups);
        break;
      case "joinedGroup":
        setGroups(JoinedGroups);
        break;
      default:
        break;
    }
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
            items={GroupsMenuOption}
            onClick={(e) => handleGroupsMenu(e)}
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
            items={GroupsMenuOption}
            onClick={(e) => handleGroupsMenu(e)}
            selectedKeys={[currentSelected]}
          />
        </div>

        <Content className="list-group-content">
          <GroupList
            groups={groups}
            type={currentSelected === "ownedGroup" ? "owned" : "joined"}
          />
        </Content>
      </Layout>
      <MyFooter />
    </Layout>
  );
};

export default MyGroup;
