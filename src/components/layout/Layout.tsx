import { Layout } from "antd";
import HeaderNav from "./HeaderNav";
import SideBar from "./SideBar";
import SidebarProvider from "./provider/SideBarProvider";

const { Content } = Layout;

const AppLayout: React.FC<any> = ({ children }) => {
  return (
    <SidebarProvider>
      <Layout className="!h-full">
        <SideBar />
        <Layout>
          <HeaderNav />
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </SidebarProvider>
  );
};

export default AppLayout;
