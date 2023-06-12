import { Button, Layout } from "antd";
import { useSidebarContext } from "./provider/SideBarProvider";
import * as Icons from "@ant-design/icons";

const { Header } = Layout;

const HeaderNav: React.FC = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <Button
        type="primary"
        size="large"
        className="ml-4"
        style={{ background: "#2596be" }}
        onClick={() => (collapsed ? setCollapsed(false) : setCollapsed(true))}
      >
        {collapsed ? <Icons.MenuUnfoldOutlined /> : <Icons.MenuFoldOutlined />}
      </Button>
    </Header>
  );
};

export default HeaderNav;
