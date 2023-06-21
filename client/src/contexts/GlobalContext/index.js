import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import ToastContext from "../ToastsContext";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({
    serverURL: "http://localhost:8080",
  });
  const [customer, setCustomer] = useState();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  console.log("🚀 ~ file: index.js:15 ~ GlobalProvider ~ data:", data);
  const { addToast } = useContext(ToastContext);

  const invokeServer = useCallback(
    async (method, route, data) => {
      if (method === "post") {
        return axios.post(global.serverURL + route, data);
      } else if (method === "get") {
        return axios.get(global.serverURL + route);
      } else if (method === "put") {
        return axios.put(global.serverURL + route, data);
      } else if (method === "delete") {
        return axios.delete(global.serverURL + route);
      }
    },
    [global.serverURL]
  );

  //   Get Contact data
  const handleUserData = async () => {
    const data = await invokeServer("get", `/getcontact`).then((result) => {
      setCustomer(result?.data?.data);
      setData(result?.data?.data);
    });
    return data;
  };


  const handleSearch = async () => {
    if (search === "") {
      setCustomer(data);
      return;
    }
    const filteredCustomers = customer?.filter((user) => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  
    setCustomer(filteredCustomers);
  };
  

  useEffect(() => {
    handleSearch();
  }, [search]);

  // Delete Contact Data
  const handleUserDelete = async (id) => {
    await invokeServer("delete", `/deletecontact/${id}`)
      .then((result) => {
        if (result.status === 200) {
          addToast(result?.data.message, "success");
          handleUserData();
        } else {
          addToast(result?.data.message, "error");
        }
      })
      .catch((err) => {
        addToast(err?.response?.data?.message || err?.message, "error");
      });
  };
  // Create Contact Data
  const handleCreateData = async (values) => {
    await invokeServer("post", "/addcontact", values)
      .then((result) => {
        if (result.status === 200) {
          addToast(result?.data.message, "success");
          handleUserData();
          setOpen(false);
        } else {
          addToast(result?.data.message, "error");
        }
      })
      .catch((err) => {
        addToast(err?.response?.data?.message || err?.message, "error");
      });
  };
  //   Edit Contact Data
  const handleEditData = async (id, values) => {
    await invokeServer("put", `/updatecontact/${id}`, values)
      .then((result) => {
        if (result.status === 200) {
          addToast(result?.data.message, "success");
          handleUserData();
          setOpen(false);
        } else {
          addToast(result?.data.message, "error");
        }
      })
      .catch((err) => {
        addToast(err?.response?.data?.message || err?.message, "error");
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        invokeServer,
        handleUserData,
        customer,
        handleUserDelete,
        handleCreateData,
        handleEditData,
        open,
        setOpen,
        search,
        setSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
