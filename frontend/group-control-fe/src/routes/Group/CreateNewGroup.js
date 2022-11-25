import { Card } from 'antd';
import GroupForm from '../../components/form/GroupForm';
import TopNavigationBar from '../../components/nav/TopNavigationBar';
import { Layout } from 'antd';
const { Header, Content } = Layout;
const CreateNewGroup = () => {
  return (
    <Layout>
      <Header
        className="top-nav-header"
        style={{ background: '#fff', padding: 0 }}
      >
        <TopNavigationBar />
      </Header>

      <Content>
        <div style={{ textAlign: 'center' }}>
          <Card
            title={<h3>Create new group</h3>}
            style={{
              width: 340,
              border: '3px solid black',
              margin: '30vh auto 10vh auto',
            }}
            className="newGroupCard"
          >
            <GroupForm />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateNewGroup;
