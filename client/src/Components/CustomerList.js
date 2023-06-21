import React, { useContext, useEffect, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import CustomerForm from "./CustomerForm";
import Table from "../Layouts/Tables/Table";
import GlobalContext from "../contexts/GlobalContext";

const CustomerList = () => {
  const [editData, setEditData] = useState();
  const {
    handleUserData,
    customer,
    handleUserDelete,
    setOpen,
    setSearch,
    search,
  } = useContext(GlobalContext);

  // Handle delete Data
  const handleDelete = async (id) => {
    await handleUserDelete(id);
  };
  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="mt-4 md:w-auto  w-full">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="relative block flex-1  bg-transparent py-2 pl-6 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 md:w-[300px] w-full bg-gray-100 border border-black rounded-md mt-1 focus:outline-none"
                placeholder="Search"
              />
              <RxMagnifyingGlass className="absolute top-1/2 -translate-y-1/2 left-2" />
            </div>
          </div>
          <div className="sm:mt-0 sm:flex-none">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="block w-[120px] rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Customer
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            {customer?.length > 0 ? (
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <Table
                  customer={customer}
                  search={search}
                  setEditData={setEditData}
                  handleDelete={handleDelete}
                />
              </div>
            ) : (
              <div className="flex items-center h-[80vh] overflow-hidden justify-center">
                <img src="./assets/Image.jpg" alt="" srcSet="" />
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomerForm editData={editData} setEditData={setEditData} />
    </>
  );
};

export default CustomerList;
