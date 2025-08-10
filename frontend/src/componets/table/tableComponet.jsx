// import React, { useMemo, useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// const DataTable = ({ data = [], columns = [], isLoading }) => {
//   const [sorting, setSorting] = useState([]);
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   // ✅ Memoize columns and data
//   const memoizedData = useMemo(() => data, [data]);
//   const memoizedColumns = useMemo(
//     () =>
//       columns.map((col) => ({
//         ...col,
//         cell: col.cell || ((info) => info.getValue()),
//       })),
//     [columns]
//   );

//   const table = useReactTable({
//     data: memoizedData,
//     columns: memoizedColumns,
//     state: {
//       sorting,
//       pagination,
//     },
//     onSortingChange: setSorting,
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   if (isLoading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border border-gray-300 rounded">
//         <thead className="bg-gray-100">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   className="p-3 border font-poppins text-sm md:text-base font-medium text-center cursor-pointer select-none"
//                 >
//                   <div className="flex items-center justify-center capitalize gap-1">
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                     {{
//                       asc: "🔼",
//                       desc: "🔽",
//                     }[header.column.getIsSorted()] ?? ""}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.length === 0 ? (
//             <tr>
//               <td colSpan={columns.length} className="text-center py-4">
//                 No data found.
//               </td>
//             </tr>
//           ) : (
//             table.getRowModel().rows.map((row) => (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="p-3 border font-poppins text-xs md:text-sm text-center font-normal"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-end gap-5 mt-4 px-2">
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 font-poppins text-base"
//         >
//           Previous
//         </button>
//         <span className="text-sm font-poppins flex gap-1 items-center">
//           Page{" "}
//           <p className="font-poppins text-sm">
//             {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//           </p>
//         </span>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 font-poppins text-base"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const DataTable = ({
  data = [],
  columns = [],
  isLoading,
  isSearch = false,
  searchPlaceholder = "Search...",
}) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");

  // ✅ Memoize columns and data
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        cell: col.cell || ((info) => info.getValue()),
      })),
    [columns]
  );

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
   <><div className="space-y-5">
  {/* Search Input */}
  {isSearch && (
    <div className="flex items-center justify-end">
      <div className="relative w-full md:w-5/12 lg:w-3/12">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins text-sm placeholder:font-poppins shadow-sm"
        />
        {globalFilter && (
          <button
            onClick={() => setGlobalFilter("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )}

  {/* Table */}
  <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-gray-200">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="p-3 text-gray-700 font-poppins text-sm md:text-base font-semibold text-center cursor-pointer select-none hover:bg-gray-100 transition"
              >
                <div className="flex items-center justify-center capitalize gap-1">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: "🔼",
                    desc: "🔽",
                  }[header.column.getIsSorted()] ?? ""}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="text-center py-6 font-poppins text-gray-500 text-sm"
            >
              {globalFilter
                ? "No results found for your search."
                : "No data found."}
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`hover:bg-blue-50 transition ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-3 border-t border-gray-200 font-poppins text-xs md:text-sm text-center text-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  {/* Pagination Controls */}
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mt-4 px-2">
    <div className="text-sm font-poppins text-gray-600">
      Showing{" "}
      {table.getRowModel().rows.length === 0
        ? 0
        : table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
          1}{" "}
      to{" "}
      {Math.min(
        (table.getState().pagination.pageIndex + 1) *
          table.getState().pagination.pageSize,
        table.getFilteredRowModel().rows.length
      )}{" "}
      of {table.getFilteredRowModel().rows.length} entries
      {globalFilter && ` (filtered from ${data.length} total entries)`}
    </div>

    <div className="flex items-center gap-5">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 font-poppins text-sm hover:bg-gray-300 transition"
      >
        Previous
      </button>
      <span className="text-sm font-poppins flex gap-1 items-center">
        Page{" "}
        <p className="text-sm font-semibold">
          {table.getPageCount() === 0
            ? 0
            : table.getState().pagination.pageIndex + 1}{" "}
          of {table.getPageCount()}
        </p>
      </span>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 font-poppins text-sm hover:bg-gray-300 transition"
      >
        Next
      </button>
    </div>
  </div>
</div>

   </>
  );
};

// const DataTable = ({ data = [], columns = [], isLoading }) => {
//   const [sorting, setSorting] = React.useState([]);

//   const table = useReactTable({
//     data,
//     columns: columns.map((col) => ({
//       ...col,
//       cell: col.cell || ((info) => info.getValue()),
//     })),
//     state: {
//       sorting,
//     },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: {
//       pagination: {
//         pageSize: 10,
//         pageIndex: 0,
//       },
//     },
//   });

//   if (isLoading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border border-gray-300 rounded">
//         <thead className="bg-gray-100">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   className="p-3 border font-poppins text-sm md:text-base font-medium text-center cursor-pointer select-none "
//                 >
//                   <div className="flex items-center justify-center capitalize  gap-1">
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                     {{
//                       asc: "🔼",
//                       desc: "🔽",
//                     }[header.column.getIsSorted()] ?? ""}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.length === 0 ? (
//             <tr>
//               <td colSpan={columns.length} className="text-center py-4">
//                 No data found.
//               </td>
//             </tr>
//           ) : (
//             table.getRowModel().rows.map((row) => (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="p-3 border font-poppins text-xs md:text-sm text-center font-normal"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-end gap-5 mt-4 px-2">
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 font-poppins  text-base"
//         >
//           Previous
//         </button>
//         <span className="text-sm font-poppins flex gap-1 items-center">
//           Page{" "}
//           <p className="font-poppins  text-sm">
//             {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </p>
//         </span>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 font-poppins  text-base"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// const DataTable = ({ data = [], columns = [], isLoading }) => {
//   const [sorting, setSorting] = React.useState([]);
//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const table = useReactTable({
//     data,
//     columns: columns.map((col) => ({
//       ...col,
//       cell: col.cell || ((info) => info.getValue()),
//     })),
//     state: {
//       sorting,
//       pagination, // Add pagination to state
//     },
//     onSortingChange: setSorting,
//     onPaginationChange: setPagination, // Add pagination change handler
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     // Remove initialState since we're managing it in React state
//   });

//   if (isLoading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border border-gray-300 rounded">
//         <thead className="bg-gray-100">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   className="p-3 border font-poppins text-sm md:text-base font-medium text-center cursor-pointer select-none"
//                 >
//                   <div className="flex items-center justify-center capitalize gap-1">
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                     {{
//                       asc: "🔼",
//                       desc: "🔽",
//                     }[header.column.getIsSorted()] ?? ""}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.length === 0 ? (
//             <tr>
//               <td colSpan={columns.length} className="text-center py-4">
//                 No data found.
//               </td>
//             </tr>
//           ) : (
//             table.getRowModel().rows.map((row) => (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="p-3 border font-poppins text-xs md:text-sm text-center font-normal"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-end gap-5 mt-4 px-2">
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 font-poppins text-base"
//         >
//           Previous
//         </button>
//         <span className="text-sm font-poppins flex gap-1 items-center">
//           Page{" "}
//           <p className="font-poppins text-sm">
//             {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </p>
//         </span>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 font-poppins text-base"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

export default DataTable;
