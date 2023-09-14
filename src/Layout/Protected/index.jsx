/* eslint-disable react/prop-types */
import React from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  GroupOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../../Helper/authProvider";
const { Header, Content, Footer, Sider } = Layout;

const Protected = ({ children }) => {
  const {
    token: { colorBgSpotlight, colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const adminPages = authProvider.isUserAdmin() && [
    {
      key: "categories",
      icon: <GroupOutlined />,
      label: `Categorias`,
    },
    {
      key: "users",
      icon: <UsergroupAddOutlined />,
      label: `Usuários`,
    },
  ] || [];

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["Home"]}
          onClick={(e) => {
            if (e.key === "exit") {
              localStorage.removeItem("token");
              window.location.reload();
            } else {
              navigate(`/${e.key}`);
            }
          }}
          items={[
            {
              key: "home",
              icon: <HomeOutlined />,
              label: `Inicial`,
            },
            ...adminPages,
            {
              key: "exit",
              icon: <LogoutOutlined />,
              label: `Sair`,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgSpotlight,
          }}
        >
          <img
            style={{ height: "45px", margin: 10 }}
            src="icons/logo-mais-cidade.png"
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            height: "calc(100vh - 154px)",
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          +Cidade ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Protected;
