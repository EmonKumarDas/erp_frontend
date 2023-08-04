import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { ApiContext } from "../../ApiProvider/ApiProvider";
import CircleLoader from "../../components/CircleLoader";
import { useContext, useState } from "react";
import ProductModel from "./ProductModel";

function AllProduct() {
  const { data, loading, setIsModalOpen, handleProductDelete } = useContext(ApiContext);

  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handle_product_Bill_Pay = (id) => {
    setIsModalOpen(true);
    const new_shop = data?.find((product) => product._id === id);
    setProduct(new_shop);
  };

  const ClickDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      handleProductDelete(id);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Products" />
      <div className="overflow-x-auto">
        <div className="px-4 shadow-2 pb-4 rounded bg-white dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">All Products</h3>
          </div>
          {loading ? (
            <CircleLoader />
          ) : (
            <div className="overflow-x-auto mt-2">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 text-sm text-left">#</th>
                    <th className="px-4 text-sm text-left">Company</th>
                    <th className="px-4 text-sm text-left">Product</th>
                    <th className="px-4 text-sm text-left">Watt</th>
                    <th className="px-4 text-sm text-left">Import</th>
                    <th className="px-4 text-sm text-left">Purchase Price</th>
                    <th className="px-4 text-sm text-left">Per Product's Price</th>
                    <th className="px-4 text-sm text-left">Paid</th>
                    <th className="px-4 text-sm text-left">Remaining</th>
                    <th className="px-4 text-sm text-left">Date</th>
                    <th className="px-4 text-sm text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product, index) => (
                    <tr
                      key={product._id}
                      className={product.id % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                    >
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{product?.companyname}</td>
                      <td className="border px-4 py-2">{product?.productname}</td>
                      <td className="border px-4 py-2">{product?.watt}</td>
                      <td className="border px-4 py-2">{product?.originalquantity}</td>
                      <td className="border px-4 py-2">{product?.purchaseprice}</td>
                      <td className="border px-4 py-2">{product?.singleproductprice}</td>
                      <td className="border px-4 py-2">{product?.advance}</td>
                      <td className="border px-4 py-2">{product?.purchaseprice - product?.advance}</td>
                      <td className="border px-4 py-2">{product?.date}</td>
                      <td
                        onClick={() => ClickDelete(product._id)}
                        className="border hover:bg-black cursor-pointer font-extrabold text-danger px-4 py-2"
                      >
                        DELETE
                      </td>
                      <td
                        onClick={() => handle_product_Bill_Pay(product?._id)}
                        className="border hover:bg-black cursor-pointer font-extrabold text-primary px-4 py-2"
                      >
                        EDIT
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination Buttons */}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 cursor-pointer bg-meta-7 mx-2 bg-blue-500 text-white font-bold rounded"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 cursor-pointer bg-primary mx-2 bg-blue-500 text-white font-bold rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <ProductModel product={product} />
      </div>
    </DefaultLayout>
  );
}

export default AllProduct;
