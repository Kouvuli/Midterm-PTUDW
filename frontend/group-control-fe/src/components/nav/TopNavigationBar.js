import AppMenu from './AppMenu';
import { Drawer } from 'antd';
import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
const TopNavigationBar = ({ user }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="top-nav-bar">
      <div
        style={{ height: 60, paddingLeft: 12, paddingTop: 12 }}
        className="menuIcon"
        onClick={() => setOpenDrawer(true)}
      >
        <MenuOutlined style={{ fontSize: 40 }} />
      </div>
      <div className="headerMenu">
        <AppMenu user={user} isInline={true} />
      </div>
      <Drawer
        open={openDrawer}
        placement="left"
        closable={true}
        onClose={() => setOpenDrawer(false)}
      >
        <AppMenu />
      </Drawer>
    </div>
  );
};
export default TopNavigationBar;
