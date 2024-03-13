import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "./../components/Datepicker";
import { Button, Flex } from "antd";
import { Space, Table, Tag } from "antd";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const res = await axios.get("http://localhost:8000/orders");
        console.log(res.data); // Log the fetched orders
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    getOrders();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting order with ID:", id); // Log the ID being deleted
    try {
      const res = await axios.delete(`http://localhost:8000/orders/${id}`);
      console.log(res);
      // Remove the deleted order from the orders state
      setOrders(orders.filter((order) => order._id !== id)); // Change 'order.id' to 'order._id'
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const columns = [
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (_, { products }) => (
        <>
          {products.map((product) => (
            <div key={product.id} className="flex gap-3 mb-2">
              <span>{product.name}</span>
              <span>{product.price}</span>
              <span className="bg-red-500 text-white px-3 py-1">
                {product.quantity}
              </span>
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Delete",
      render: (
        _,
        record // Added record parameter to get the id of the order
      ) => (
        <Button
          onClick={() => handleDelete(record._id)} // Pass the id to handleDelete
          className="bg-red-500"
          type="primary"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-10">
      <DatePicker />
      <Table columns={columns} dataSource={orders} />
    </div>
  );
};

export default OrdersPage;
