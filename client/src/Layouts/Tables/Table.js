import React, { useContext } from "react";
import { RiDeleteBin7Fill, RiEdit2Fill } from "react-icons/ri";
import GlobalContext from "../../contexts/GlobalContext";
const Table = ({ customer, setEditData, handleDelete }) => {
  const { setOpen } = useContext(GlobalContext);
  return (
    <div>
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
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {customer &&
            customer?.map((person, index) => {
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
  );
};

export default Table;
