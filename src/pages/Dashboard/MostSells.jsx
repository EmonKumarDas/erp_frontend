import React, { useContext } from "react";
import { ApiContext } from "../../ApiProvider/ApiProvider";
import CircleLoader from "../../components/CircleLoader";

function MostSell() {
  const { loading, customarbills } = useContext(ApiContext);
  // Filter products based on added date and current date
  const currentDate = new Date();
  const filteredProducts = customarbills.reduce((acc, entry) => {
    const entryDate = new Date(entry.date);
    if (entryDate <= currentDate) {
      acc.push(...entry.products);
    }
    return acc;
  }, []);

  // Create an object to keep track of the total quantity sold for each company's products
  const companyProductSales = {};

  // Create an object to keep track of the sell quantity for each product
  const productSellQuantity = {};

  // Create an object to keep track of which company's product each product belongs to
  const productCompanyMapping = {};

  // Calculate the total quantity sold for each company's products and the sell quantity for each product
  filteredProducts.forEach((product) => {
    const { company, quantity, productname } = product;
    if (company && quantity && productname) {
      // Total quantity sold for each company
      if (!companyProductSales[company]) {
        companyProductSales[company] = 0;
      }
      companyProductSales[company] += parseInt(quantity);

      // Sell quantity for each product
      if (!productSellQuantity[productname]) {
        productSellQuantity[productname] = 0;
      }
      productSellQuantity[productname] += parseInt(quantity);

      // Track which company's product each product belongs to
      productCompanyMapping[productname] = company;
    }
  });

  // Sort the companies based on the total quantity sold
  const sortedCompanies = Object.entries(companyProductSales).sort(
    (a, b) => b[1] - a[1]
  );

  // Sort the products based on the sell quantity
  const sortedProducts = Object.entries(productSellQuantity).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="overflow-x-auto mt-5">
      <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Most Sells</h3>
        </div>
        {loading ? (
          <CircleLoader />
        ) : (
          <div className="p-4">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">
                Company-wise Product Sales Report
              </h2>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Company</th>
                    <th className="px-4 py-2">Total Quantity Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCompanies.map(([company, totalQuantitySold]) => (
                    <tr key={company}>
                      <td className="border px-4 py-2">{company}</td>
                      <td className="border px-4 py-2">{totalQuantitySold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Product-wise Sales Report
              </h2>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Sell Quantity</th>
                    <th className="px-4 py-2">Company</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map(([productname, sellQuantity]) => (
                    <tr key={productname}>
                      <td className="border px-4 py-2">{productname}</td>
                      <td className="border px-4 py-2">{sellQuantity}</td>
                      <td className="border px-4 py-2">
                        {productCompanyMapping[productname]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MostSell;
