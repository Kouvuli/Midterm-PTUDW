import GroupList from '../components/group/GroupList';
import TopNavigationBar from '../components/nav/TopNavigationBar';
import { useState } from 'react';
import { Menu, Layout } from 'antd';
import '../App.css';
const { Header, Content, Sider } = Layout;

const ownedGroups = [
  {
    id: 'g1',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/1-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
  {
    id: 'g2',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/1-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
  {
    id: 'g3',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/1-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
  {
    id: 'g4',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/1-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
  {
    id: 'g5',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/1-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
];

const JoinedGroups = [
  {
    id: 'g1',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/2-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
  {
    id: 'g2',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/2-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
  {
    id: 'g3',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/2-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
  {
    id: 'g4',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/2-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
  {
    id: 'g5',
    name: 'Gacha gang',
    imgUrl: 'https://reqres.in/img/faces/2-image.jpg',
    total: 12,
    owner: 'Vinh',
  },
];

const GroupsMenuOption = [
  {
    label: 'Owned Group',
    key: 'ownedGroup',
  },
  {
    label: 'Joined Group',
    key: 'joinedGroup',
  },
];
const MyGroup = () => {
  const [currentSelected, setCurrentSelected] = useState('ownedGroup');
  const [groups, setGroups] = useState(ownedGroups);

  const handleGroupsMenu = (e) => {
    setCurrentSelected(e.key);
    switch (e.key) {
      case 'ownedGroup':
        setGroups(ownedGroups);
        break;
      case 'joinedGroup':
        setGroups(JoinedGroups);
        break;
      default:
        break;
    }
  };
  return (
    <Layout>
      <Header className="top-nav-header" style={{ background: '#fff' }}>
        <TopNavigationBar />
      </Header>
      <Layout className="body-content">
        <Menu
          items={GroupsMenuOption}
          onClick={(e) => handleGroupsMenu(e)}
          selectedKeys={[currentSelected]}
        ></Menu>

        <Menu
          className="group-menu"
          items={GroupsMenuOption}
          onClick={(e) => handleGroupsMenu(e)}
          selectedKeys={[currentSelected]}
        ></Menu>
        <Content className="list-group-content">
          <GroupList
            groups={groups}
            type={currentSelected === 'ownedGroup' ? 'owned' : 'joined'}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyGroup;
