import { Layout } from 'antd';
import TopNavigationBar from '../components/nav/TopNavigationBar';
const { Header, Content } = Layout;
const Home = () => {
  return (
    <Layout>
      <Header
        className="top-nav-header"
        style={{ background: '#fff', padding: 0 }}
      >
        <TopNavigationBar />
      </Header>
      <Layout className="body-content">
        <Content>
          <h2>Home</h2>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
