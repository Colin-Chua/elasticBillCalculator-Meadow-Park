import { Button, Layout } from "antd";
import { useState } from "react";
import SideBarMenu from "./SideBarMenu";
import { useSidebarContext } from "./provider/SideBarProvider";

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  return (
    <Sider
      collapsed={collapsed}
      style={{ height: "100vh", backgroundColor: "#fff" }}
    >
      <SideBarMenu collapsed={collapsed} />
    </Sider>
  );
};

export default SideBar;
