/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Form, Select, Space, Table } from "antd";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../../Helper/hooks/useMaisCidadeApi/useUsers";

const Option = Select.Option;

const UserForm = ({ userInfo }) => {
  const updateUserLevel = (values) => {
    updateUser(userInfo.id, { level: values.level });
  };

  return (
    <Form
      name="validate_other"
      onFinish={updateUserLevel}
      initialValues={{
        level: userInfo.level,
      }}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name={"level"}
        rules={[
          {
            required: true,
            message: "Por favor selecione o nível do usuário!",
          },
        ]}
      >
        <Select placeholder="Selecione o nível do usuário">
          <Option value="admin">Administrador</Option>
          <Option value="rpp">Representate do Poder Público</Option>
          <Option value="audit">Auditor</Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Atualizar
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await getUsers();
    setUsers(data);
  };

  const columns = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "E-mail", dataIndex: "email", key: "email" },
    { title: "Nível", dataIndex: "level", key: "level" },
    {
      title: "Ações",
      dataIndex: "",
      key: "x",
      render: (userInfo) => <a onClick={async () => {
        await Promise.all([fetchUsers(), deleteUser(userInfo.id)])
      }}>Deletar</a>,
    },
  ];

  return (
    <>
      <h1>Usuários</h1>
      <Table
        columns={columns}
        rowKey={"id"}
        expandable={{
          expandedRowRender: (record) => <UserForm userInfo={record} />,
          rowExpandable: () => true,
        }}
        dataSource={users}
      />
    </>
  );
};
