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

  // Extract unique values for each filter option
  const uniqueProductNames = Array.from(new Set(stockIn.map((product) => product.productname)));
  const uniqueWatts = Array.from(new Set(stockIn.map((product) => product.watt)));
  const uniqueQuantities = Array.from(new Set(stockIn.map((product) => product.quantity)));
  const uniqueCompanyNames = Array.from(new Set(stockIn.map((product) => product.companyname)));

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
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

  return (
    <div className="overflow-x-auto mt-5">
      <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Stock In</h3>
        </div>
        <div className="mt-4 text-black-2 flex space-x-4">
          <select
            name="productname"
            value={filters.productname}
            onChange={handleFilterChange}
            className="px-2 py-1 border rounded"
          >
            <option value="">Select product name</option>
            {uniqueProductNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select
            name="watt"
            value={filters.watt}
            onChange={handleFilterChange}
            className="px-2 py-1 border rounded"
          >
            <option value="">Select watt</option>
            {uniqueWatts.map((watt) => (
              <option key={watt} value={watt}>
                {watt}
              </option>
            ))}
          </select>
          <select
            name="quantity"
            value={filters.quantity}
            onChange={handleFilterChange}
            className="px-2 py-1 border rounded"
          >
            <option value="">Select quantity</option>
            {uniqueQuantities.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
          <select
            name="companyname"
            value={filters.companyname}
            onChange={handleFilterChange}
            className="px-2 py-1 border rounded"
          >
            <option value="">Select company name</option>
            {uniqueCompanyNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
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
                {filteredData.map((product, index) => (
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
      </div>
    </div>
  );
}

export default StockData;
