import { Button, Input, Space, Table } from "antd";
import { useEffect, useState } from "react";
import {
  createCategory,
  listCategories,
} from "../../Helper/hooks/useMaisCidadeApi/useCategories";

export const Category = () => {
  const [categoryValue, setCategotyValue] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const { data } = await listCategories();
    setCategories(data);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
  ];

  const newCategory = async () => {
    await createCategory({
      name: categoryValue,
    });
    await getCategories();
  };

  return (
    <>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          onChange={({ target: { value }}) => {
            setCategotyValue(value)
          }}
          placeholder="Categoria"
          value={categoryValue}
        />
        <Button onClick={newCategory} type="primary">
          Criar
        </Button>
      </Space.Compact>
      <Table columns={columns} rowKey={"id"} dataSource={categories} size="small" />;
    </>
  );
};
