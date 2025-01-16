import React, { useEffect } from "react";
import { getTodos } from "../services/service";
const TableTask = () => {
  useEffect(() => {
    async function fetchData() {
      const fetchedTodos = await getTodos();
      console.log(fetchedTodos);
    }
    fetchData();
  }, []);
  return <div>TableTask</div>;
};

export default TableTask;
