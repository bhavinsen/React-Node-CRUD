import { Dialog, Transition } from '@headlessui/react'
import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Fragment } from "react";
import GlobalContext from "../contexts/GlobalContext";

const CustomerForm = ({ editData, setEditData }) => {
  const { handleCreateData, handleEditData, open, setOpen } =
    useContext(GlobalContext);
  // Formik schema
  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(values.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    return errors;
  };
  // Handle edit and create data function
  const handleSubmit = (values) => {
    if (editData === undefined) {
      handleCreateData(values);
      return;
    }
    if (editData._id) {
      handleEditData(editData._id, values);
      return;
    }
  };
  // Handle Edit data state
  useEffect(() => {
    if (!open) {
      setEditData();
    }
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <Formik
                  initialValues={{
                    name: editData?.name || "",
                    email: editData?.email || "",
                    phone: editData?.phone || "",
                  }}
                  validate={validateForm}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="ml-1">Name:</label>
                        <Field
                          type="text"
                          name="name"
                          className="block flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full bg-gray-100 border border-black rounded-md mt-1"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div>
                        <label className="ml-1">Email:</label>
                        <Field
                          type="email"
                          name="email"
                          className="block flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full bg-gray-100 border border-black rounded-md mt-1"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div>
                        <label className="ml-1">Phone:</label>
                        <Field
                          type="text"
                          name="phone"
                          className="block flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full bg-gray-100 border border-black rounded-md mt-1"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm w-full"
                    >
                      Submit
                    </button>
                  </Form>
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CustomerForm;
