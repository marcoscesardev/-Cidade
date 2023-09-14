import React from "react";
import { Form, Input, Button, Checkbox, message, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { authProvider } from "../../Helper/authProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data: { access_token, ...user } } = await authProvider.signin(values);
      window.localStorage.setItem("token", access_token);
      window.localStorage.setItem("user", JSON.stringify(user));

      message.success("Login realizado com sucesso!");
      window.location.reload();
    } catch (error) {
      message.error("Ocorreu um erro ao tentar logar!");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Form
        name="login-form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Por favor, insira seu e-mail!" },
            { type: "email", message: "E-mail inválido!" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="e-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lembrar-me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
        <Space wrap>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Entrar
          </Button>
          <p>Ou</p>
          <a onClick={() => navigate("/sign-up")}>registre-se agora!</a>
        </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
