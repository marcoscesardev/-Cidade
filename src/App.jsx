import { ConfigProvider } from "antd";
import "./App.css";
import Router from "./Helper/Router";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#dc4167",
          colorBgSpotlight: "#dc4167",
        },
      }}
    >
      <Router />
    </ConfigProvider>
  );
};

export default App;
