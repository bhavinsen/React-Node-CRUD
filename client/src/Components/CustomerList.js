import React, { useEffect, useState } from "react";
import { RiDeleteBin7Fill, RiEdit2Fill } from "react-icons/ri";
import { RxCaretUp, RxMagnifyingGlass } from "react-icons/rx";
import CustomerForm from "./CustomerForm";
import axios from "axios";
import { toast } from "react-toastify";
import URL from "../URL";

const CustomerList = ({ open, setOpen }) => {
  const [customer, setCustomer] = useState();
  const [editData, setEditData] = useState();
  const [search, setSearch] = useState("");

  // Get All Data
  const fetchData = async () => {
    await axios
      .get(`${URL}/getcontact`)
      .then((result) => {
        if (result.status === 200) {
          setCustomer(result.data.data);
        } else {
          toast(result?.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "error",
          });
        }
      })
      .catch((err) => {
        toast(err?.response?.data?.message || err?.message, {
          hideProgressBar: true,
          autoClose: 3000,
          type: "error",
        });
      });
  };
  // Handle delete Data
  const handleDelete = async (id) => {
    await axios
      .delete(`${URL}/deletecontact/${id}`)
      .then((result) => {
        if (result.status === 200) {
          toast(result?.data.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          });
          fetchData();
        } else {
          toast(result?.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "error",
          });
        }
      })
      .catch((err) => {
        toast(err?.response?.data?.message || err?.message, {
          hideProgressBar: true,
          autoClose: 3000,
          type: "error",
        });
      });
  };
  useEffect(() => {
    fetchData();
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
                <table className="min-w-full divide-y divide-gray-300 border border-gray-300 px-3">
                  <thead>
                    <tr className="bg-gray-300">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 flex gap-1 items-center"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {customer &&
                      customer
                        .filter((user) => {
                          if (search === "") {
                            return user;
                          } else if (
                            user.name
                              .toLowerCase()
                              .includes(search?.toLowerCase()) ||
                            user.email
                              .toLowerCase()
                              .includes(search?.toLowerCase())
                          ) {
                            return user;
                          }
                        })
                        .map((person, index) => {
                          return (
                            <tr key={index} className="even:bg-gray-50">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.email}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.phone}
                              </td>
                              <td className="flex items-center justify-center gap-4 relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-3">
                                <button
                                  onClick={() => {
                                    setEditData(person);
                                    setOpen(true);
                                  }}
                                  type="button"
                                  className="flex items-center justify-center gap-1 w-[80px] rounded bg-gray-500 px-2 py-2 text-xs font-semibold text-white shadow-sm"
                                >
                                  Edit
                                  <RiEdit2Fill className="text-sm" />
                                </button>
                                <button
                                  type="button"
                                  className="flex items-center justify-center gap-1 w-[80px] rounded bg-red-600 px-2 py-2 text-xs font-semibold text-white shadow-sm"
                                  onClick={() => {
                                    handleDelete(person?._id);
                                  }}
                                >
                                  Delete
                                  <RiDeleteBin7Fill className="text-sm" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center h-[80vh] overflow-hidden justify-center">
                <img src="./assets/Image.jpg" alt="" srcset="" />
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomerForm
        open={open}
        setOpen={setOpen}
        fetchData={fetchData}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  );
};

export default CustomerList;
