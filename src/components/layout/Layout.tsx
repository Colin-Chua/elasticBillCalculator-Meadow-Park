import { Layout } from "antd";
import HeaderNav from "./HeaderNav";
import SideBar from "./SideBar";
import SidebarProvider from "./provider/SideBarProvider";
import AppProvider from "./provider/AppProvider";

const { Content } = Layout;

const AppLayout: React.FC<any> = ({ children }) => {
  return (
    <AppProvider>
      <SidebarProvider>
        <Layout className="!h-full">
          <SideBar />
          <Layout>
            <HeaderNav />
            <Content>{children}</Content>
          </Layout>
        </Layout>
      </SidebarProvider>
    </AppProvider>
  );
};

export default AppLayout;
