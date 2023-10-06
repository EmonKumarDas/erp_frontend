import React, { useContext, useState } from "react";
import { ApiContext } from "../../ApiProvider/ApiProvider";
import CircleLoader from "../../components/CircleLoader";

function StockData() {
  const { stockIn, loading } = useContext(ApiContext);
  const [filters, setFilters] = useState({
    productname: "",
    watt: "",
    quantity: "",
    companyname: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  // Filter the data based on the selected filter options
  const filteredData = stockIn.filter((product) => {
    const { productname, watt, quantity, companyname } = filters;
    return (
      product.productname.includes(productname) &&
      product.watt.includes(watt) &&
      product.quantity.toString().includes(quantity) &&
      product.companyname.includes(companyname)
    );
  });

  // Calculate pagination parameters
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto mt-5">
      <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Stock In</h3>
        </div>
        <div className="mt-4 text-black-2 flex space-x-4">
          {/* Filter options */}
          <input
            type="text"
            name="productname"
            value={filters.productname}
            onChange={handleFilterChange}
            placeholder="Product Name"
            className="px-2 py-1 border rounded"
          />
          <input
            type="text"
            name="watt"
            value={filters.watt}
            onChange={handleFilterChange}
            placeholder="Watt"
            className="px-2 py-1 border rounded"
          />
         
          <input
            type="text"
            name="companyname"
            value={filters.companyname}
            onChange={handleFilterChange}
            placeholder="Company Name"
            className="px-2 py-1 border rounded"
          />
        </div>
        {loading ? (
          <CircleLoader />
        ) : (
          <div className="overflow-x-auto mt-2">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 text-left">#</th>
                  <th className="px-4 text-left">productname</th>
                  <th className="px-4 text-left">watt</th>
                  <th className="px-4 text-left">quantity</th>
                  <th className="px-4 text-left">companyname</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => (
                  <tr
                    key={product?._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{product?.productname}</td>
                    <td className="border px-4 py-2">{product?.watt}</td>
                    <td className="border px-4 py-2">{product?.quantity}</td>
                    <td className="border px-4 py-2">{product?.companyname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        <div className="mt-4 flex justify-between">
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <div>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-danger mx-2 text-white font-bold rounded"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-primary text-white font-bold mx-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockData;
