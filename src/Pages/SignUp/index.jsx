import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { authProvider } from '../../Helper/authProvider';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await authProvider.signUp(values);
      message.success('Cadastro realizado com sucesso!');

      navigate('/')
    } catch (error) {
      message.error('Ocorreu um erro ao tentar cadastrar!');
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Cadastre-se</h1>
      <Form
        name="signup-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nome" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Por favor, insira seu e-mail!' },
            { type: 'email', message: 'E-mail inválido!' }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Por favor, confirme sua senha!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('As senhas não coincidem!'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Confirmar senha"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="signup-form-button">
            Cadastre-se
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
