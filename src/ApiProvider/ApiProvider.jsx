import { useContext } from 'react';
import { createContext, useState, useEffect } from 'react';
import { userContext } from '../pages/Authentication/AuthProvider';
import { toast } from 'react-toastify';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ----------------------------+++++++++++start++++++++++++++---------------------------------------------

  function formatDate(date) {
    const parts = date.split('-');
    const year = parts[0];
    const month = parts[1].padStart(2, '0');
    return `${year}-${month}`;
  }

  // ----------------------------+++++++++++stop++++++++++++++-----------------------------------------------
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch('https://admin-backend-seven.vercel.app/getProducts');
        const result = await response.json();
        setData(result);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);

      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ------------------------------end of get Product----------------------------------------

  const handleCompany = (e) => {
    e.preventDefault();
    const comapanyname = e.target.comapanyname.value;
    const contactnumber = e.target.contactnumber.value;
    const adress = e.target.adress.value;

    const company = {
      comapanyname,
      contactnumber,
      adress,
    }
    setLoading(true);
    fetch("https://admin-backend-seven.vercel.app/addcompany", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(company)
    }).then(res => res.json()).then(result => {
      e.target.reset();
      setLoading(false)
      window.alert("Success")
    })

  }

  // ------------------------------end of post company----------------------------------------
  const handleShop = (e) => {
    e.preventDefault();
    const shopname = e.target.name.value;
    const location = e.target.location.value;

    const shop = {
      shopname,
      location,
    }

    setLoading(true);
    fetch("https://admin-backend-seven.vercel.app/addshop", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shop)
    }).then(res => res.json()).then(result => {
      e.target.reset();
      setLoading(false)
      window.alert("Success")
    })

  }

  // ------------------------------end of Add shop----------------------------------------
  const [shop, setShop] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch('https://admin-backend-seven.vercel.app/getshop');
      const result = await response.json();
      setShop(result);
      setLoading(false);


    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // ------------------------------end of get shop----------------------------------------

  const [allcompany, setAllcompany] = useState([]);
  useEffect(() => {
    fetch("https://admin-backend-seven.vercel.app/getCompany").then(res => res.json()).then(result => {
      setAllcompany(result)

    })
  }, [])

  // ------------------------------end of get company----------------------------------------



  const handleProductDelete = (id) => {
    setLoading(true);
    fetch(`https://admin-backend-seven.vercel.app/deleteProduct/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(result => {
        fetchData();
        setLoading(false);
        window.alert("Success")
      })
      .catch(error => {
        console.error(`Error deleting product with ID`);
      });
  };
  // ------------------------------end of handle delete Product----------------------------------------


  const handleshopDelete = (id) => {
    setLoading(true);
    fetch(`https://admin-backend-seven.vercel.app/deleteshop/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(result => {
        fetchData();
        setLoading(false);
        window.alert("Success")
      })
      .catch(error => {
        console.error(`Error deleting product with ID`);
      });
  };
  // ------------------------------end of handle delete shop----------------------------------------

  const handleGetProduct = (e) => {

    e.preventDefault();
    // const barCode = e.target.code.value;
    const productName = e.target.productname.value;
    const watt = e.target.watt.value;
    const advance = parseInt(e.target.advance.value);
    const purchaseprice = parseInt(e.target.PurchasePrice.value);
    const quantity = parseInt(e.target.quantity.value);
    const companyName = e.target.companyName.value;
    console.log(advance)
    const productData = {
      productName,
      watt,
      purchaseprice,
      quantity,
      companyName,
      advance,
      originalquantity: quantity,
      singleproductprice: Math.round(purchaseprice / quantity)
    }

    // -------------********get total product start*********------------------------
    const totalProduct = {
      productName,
      watt,
      quantity,
      companyName,
    }

    setLoading(true);
    fetch("https://admin-backend-seven.vercel.app/getTotalProduct")
      .then(res => res.json())
      .then(results => {
        if (results.length === 0) {
          console.log("first")
          // Create a new totalProduct using the API endpoint
          fetch("https://admin-backend-seven.vercel.app/totalProduct", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(totalProduct)
          })
            .then(res => res.json())
            .then(createdResult => {
              window.alert("Success")
              // Handle the result of the creation, if needed
            })
            .catch(error => {
              // Handle any error during the creation process
            });
        }
        else {
          const foundItem = results.find((item) =>
            item?.productname === productName &&
            item?.watt === watt &&
            item?.companyname === companyName.toLowerCase()
          );

          if (foundItem) {
            console.log("2nd");
            const newQuantity = { quantity: quantity + (foundItem?.quantity || 0) };
            // Update the quantity using the API endpoint
            fetch(`https://admin-backend-seven.vercel.app/UpdateProductQuantity/${foundItem._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newQuantity)
            })
              .then(res => res.json())
              .then(updatedResult => {
                // Handle the result of the update, if needed
              });
          } else {
            console.log("3rd");
            // Create a new totalProduct using the API endpoint
            fetch("https://admin-backend-seven.vercel.app/totalProduct", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(totalProduct)
            })
              .then(res => res.json())
              .then(createdResult => {
                window.alert("Success")
                // Handle the result of the creation, if needed
              })
              .catch(error => {
                // Handle any error during the creation process
              });
          }

          // results?.find(item => {

          //   if (item?.productname === productName &&
          //     item?.watt === watt &&
          //     item?.companyname === companyName.toLowerCase()) {
          //     console.log("2nd")
          //     const newQuantity = { quantity: quantity + (item?.quantity || 0) };
          //     // Update the quantity using the API endpoint
          //     fetch(`https://admin-backend-seven.vercel.app/UpdateProductQuantity/${item._id}`, {
          //       method: 'PUT',
          //       headers: {
          //         'Content-Type': 'application/json'
          //       },
          //       body: JSON.stringify(newQuantity)
          //     })
          //       .then(res => {

          //         return res.json();
          //       })
          //       .then(updatedResult => {
          //         // Handle the result of the update, if needed
          //       });
          //   }
          //   else {

          //     // Create a new totalProduct using the API endpoint
          //     fetch("https://admin-backend-seven.vercel.app/totalProduct", {
          //       method: 'POST',
          //       headers: {
          //         'Content-Type': 'application/json'
          //       },
          //       body: JSON.stringify(totalProduct)
          //     })
          //       .then(res => res.json())
          //       .then(createdResult => {
          //         window.alert("Success")
          //         console.log("3nd")
          //         // Handle the result of the creation, if needed
          //       })
          //       .catch(error => {
          //         // Handle any error during the creation process
          //       });
          //   }
          // })

        }
      });

    // -------------********get total product end*********------------------------

    fetch("https://admin-backend-seven.vercel.app/addProducts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    }).then(res => res.json()).then(result => {
      e.target.reset();
      setLoading(false)

    })
  }


  // --------------------End of handle post product-------------------------------

  const [selectedCode, setSelectedCode] = useState('');
  const [codeData, setCodeData] = useState(null);

  // useEffect(() => {
  //   if (selectedCode) {
  //     fetch(`https://admin-backend-seven.vercel.app/BarCodeData/${selectedCode}`)
  //       .then((response) => response.json())
  //       .then((data) => setCodeData(data[0]))
  //       .catch((error) => console.error(error));
  //   }
  // }, [selectedCode]);

  // const handleCodeChange = (event) => {
  //   setSelectedCode(event.target.value);
  // };
  // --------------end of id based Product collection-------------------------

  const [selectedProduct, setSelectedProduct] = useState('');
  const [ProductData, setProductData] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      fetch(`https://admin-backend-seven.vercel.app/getProductsByProductName/${selectedProduct}`)
        .then((response) => response.json())
        .then((data) => setProductData(data[0]))
        .catch((error) => console.error(error));
    }
  }, [selectedProduct]);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  // --------------end of id based Product collection-------------------------

  const [productCode, setProductCode] = useState([]);

  const handleBillcreating = async (e) => {
    e.preventDefault();

    // const barcode = e.target.code.value;
    const productname = e.target.productname.value;
    const PurchasePrice = e.target.PurchasePrice.value;
    const Discount = e.target.Discount.value;
    const quantity = e.target.quantity.value;
    const company = e.target.company.value;
    const watt = e.target.watt.value;
    const TotalPrice = PurchasePrice * quantity;
    const DiscountAmount = (Discount / 100) * TotalPrice
    const SellPrice = TotalPrice - DiscountAmount
    const total = SellPrice;

    setLoading(true);
    await fetch(`https://admin-backend-seven.vercel.app/getProductsByProductNameAndWatt/${productname}/${watt}`)
      .then(res => res.json())
      .then(result => {
        setProductCode(result);
        // const barCode = barcode === "Select Product's Code" ? result[0]?._id : barcode;
        const newBillData = {
        
          productname,
          PurchasePrice,
          Discount,
          quantity,
          company,
          watt,
          TotalPrice,
          DiscountAmount,
          SellPrice,
          total
        };
        fetch(`https://admin-backend-seven.vercel.app/getProductsByPnameComNameWatt/${productname.toLowerCase()}/${watt.toLowerCase()}/${company.toLowerCase()}`)
          .then(res => res.json())
          .then(data => {
            if (data[0]?.quantity >= quantity) {
              const existingData = JSON.parse(localStorage.getItem('billData')) || [];

              const updatedData = [...existingData, newBillData];

              localStorage.setItem('billData', JSON.stringify(updatedData));

              const existedQuantity = (data[0].quantity || 0) - quantity;
              fetch(`https://admin-backend-seven.vercel.app/UpdateProductQuantity/${data[0]._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  quantity: existedQuantity
                })
              })
                .then(response => response.json())
                .then(data => {
                  window.alert("Success")
                  setLoading(false)
                })
                .catch(error => {
                  console.error(error);
                });

            }
            else {
              toast("you don't have much Product")
            }
          })




      });

  };


  // -------------------------end handle bill create---------------------------

  const handleBillMemo = (e, products, total) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phonenumber = e.target.phonenumber.value;
    const advance = parseInt(e.target.advance.value);
    const get_discount = parseInt(e.target.discount.value);
    const location = e.target.location.value;
    const shopname = e.target.shopname.value;
    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const get_products = JSON.parse(localStorage.getItem('billData'));
    const get_total = get_products?.reduce((acc, product) => acc + product.total, 0);
    const discountedTotal = get_total - (get_total * get_discount / 100);
    
    const userData = {
      name, location, phonenumber, date, advance, shopname,get_discount,discountedTotal, newbalance: parseInt(advance ? total - advance : total - 0), total,
    }

    const mergedObject = {
      ...userData,
      "products": products
    };

    // Convert mergedObject to JSON string
    const mergedObjectString = JSON.stringify(mergedObject);

    // Store the mergedObjectString in localStorage
    localStorage.setItem('mergedData', mergedObjectString);

    setLoading(true)
    fetch("https://admin-backend-seven.vercel.app/createBill", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mergedObject)
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false)
        window.location.replace('/printinstant')
      })
      .catch(error => {
        setLoading(false)
      });
  }

  // ----------------end of create bill-----------------------------------

  const [bill, setBill] = useState([]);
  useEffect(() => {
    fetch("https://admin-backend-seven.vercel.app/getBill")
      .then(res => res.json())
      .then(result => {

        const getbill = result.length;

        if (result.length === 1) {
          setBill(result[0]);
        }
        else {
          setBill(result[getbill - 1])
        }
      })
  }, [])

  // ---------------------------------end of print bill-----------------------------------

  const [bills, setBills] = useState([]);
  useEffect(() => {
    fetch("https://admin-backend-seven.vercel.app/getBill")
      .then(res => res.json())
      .then(result => {
        setBills(result)
      })
  }, [])

  const totalSell = bills.reduce((acc, item) => {
    if (item.advance) {
      return acc + parseInt(item.advance);
    } else {
      return acc + item.total;
    }
  }, 0);

  // -----------------------end of get all the sells products amount------------------------------------

  const totalPurchasePrice = data.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.purchaseprice);
  }, 0);

  // ----------------------------end of total purchase products price----------------------------------------

  const totalProduct = data.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.quantity);
  }, 0);

  // ----------------------------end of total totalProduct---------------------------------------

  const StockOut = bills.reduce((acc, curr) => {
    return acc + curr.products.reduce((total, product) => {
      return total + parseInt(product.quantity);
    }, 0);
  }, 0);

  // ----------------------------end of total stockout----------------------------------------
  const { googleSignIn } = useContext(userContext);
  const googleSign = () => {
    googleSignIn().then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const photo = result.user.photoUrl;
      const userInfo = {
        name, email, photo, isAdmin: false
      }
      const matchingUser = employees.find(user => user.email === email)
      if (matchingUser) {
        window.location.replace('/');
      }
      else {
        fetch("https://admin-backend-seven.vercel.app/addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userInfo)
        })
          .then(res => res.json())
          .then(result => {
            window.location.replace('/');
          })
      }
    })
  }

  // -------------------------------------googleSignIn----------------------------------------

  const [customarbills, SetBills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://admin-backend-seven.vercel.app/getBill");
        const result = await response.json();
        SetBills(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // --------------------------------get created bills data----------------------------------
  const getBillByID = (id) => {
    return fetch(`https://admin-backend-seven.vercel.app/getbills/${id}`)
      .then(response => {

        return response.json();
      })
      .then(res => res);
  }

  // --------------------------------get bills by customar-----------------------------------

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: ''
  });

  const handleChangedata = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleEmploy = (event) => {
    event.preventDefault();
    setLoading(true);

    const matchingUser = employees.find(user => user.email === formData.email);
    if (matchingUser) {
      window.alert("User Already Exists");
      setLoading(false);
    } else {
      setLoading(true);
      fetch("https://admin-backend-seven.vercel.app/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(result => {
          event.target.reset(); // Reset the form fields
          setFormData({}); // Reset the state for controlled components
          setLoading(false);
        });
    }
  };



  // -------------------------------------add employ--------------------------------------- 
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://admin-backend-seven.vercel.app/getUsers").then(res => res.json()).then(result => {
        setEmployees(result);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // -------------------------------------get all employees--------------------------------------- 

  const handlePayBill = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;
    const pay = parseInt(e.target.pay.value);
    const otherbill = parseInt(e.target.otherbill.value);
    const date = e.target.date.value;
    const month = date.slice(0, 7);
    const paybill = {
      name, number, pay, otherbill, month, date
    }
    setLoading(true);
    fetch("https://admin-backend-seven.vercel.app/paybill", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(paybill)
    }).then(res => res.json()).then(result => {
      setLoading(false)
      setIsModalOpen(false)
    })
  }

  // -------------------------------------pay employees bill--------------------------------------- 

  const handleshopBill = (e, _id) => {
    e.preventDefault();
    const shopname = e.target.shopname.value;
    const location = e.target.location.value;
    const pay = parseInt(e.target.pay.value);
    const electricity = parseInt(e.target.electricity.value);
    const tax = parseInt(e.target.tax.value);
    const date = e.target.date.value;
    const month = date.slice(0, 7);

    const paybill = {
      productId: _id, shopname, location, pay, tax: !tax ? 0 : tax, date, month, electricity, total: pay + tax + electricity
    }

    setLoading(true);
    fetch("https://admin-backend-seven.vercel.app/payshopbill", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(paybill)
    }).then(res => res.json()).then(result => {
      setLoading(false)
      setIsModalOpen(false)
    })
  }

  // -------------------------------------pay shop's bill--------------------------------------- 
  const handle_comapany_bill_pay = (e, product_id) => {
    e.preventDefault();
    const get_advance = parseInt(e.target.advance.value);
    setLoading(true);
    fetch(`http://localhost:5000/getProductById/${product_id}`).then(res => res.json()).then(product => {
      const advance = (product?.advance || 0) + get_advance;

      fetch(`http://localhost:5000/Upadate_Product_Remaining_Balance/${product_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ advance })
      }).then(res => res.json()).then(result => {
        setLoading(false)
        setIsModalOpen(false)
      })
    })
  }

  // -------------------------------------handle comapany bill pay--------------------------------------- 

  function getMonthName(number) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Subtracting 1 from the number to match the array index
    const index = number - 1;

    // Checking if the index is within the valid range
    if (index >= 0 && index < months.length) {
      return months[index];
    } else {
      return 'Invalid month number';
    }
  }

  // ----------------------------------get months-------------------------------------------

  const handleUpdatePaybill = (e, customarbill) => {
    e.preventDefault();
    const advance = parseInt(e.target.advance.value);
    const newbalance = customarbill?.newbalance - advance;
    const totalpay = customarbill?.advance + advance;

    const paybill = { advance: totalpay, newbalance };

    setLoading(true);
    fetch(`https://admin-backend-seven.vercel.app/UpdateProductbill/${customarbill?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paybill),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error updating paybill.");
        }
        return res.json();
      })
      .then((result) => {
        setLoading(false);
        setIsModalOpen(false);
      })
      .catch((error) => {

        setLoading(false);
      });
  };

  // -------------------------------------update customar bill--------------------------------------- 

  const [getTotalSaleByDate, setGetTotalSaleByDate] = useState([]);
  const [getTotalRevenueByDate, setGetTotalRevenueByDate] = useState([]);
  const now = new Date();
  const month = `${now.getFullYear()}-${now.getMonth() + 1}`;

  try {
    fetch(`https://admin-backend-seven.vercel.app/getBillByDate/${month}`)
      .then(res => res.json())
      .then(result => {
        let totalAdvance = 0;
        let revenue = 0;
        for (let i = 0; i < result.length; i++) {
          totalAdvance += result[i]?.advance;
          revenue += result[i]?.advance;
        }
        setGetTotalRevenueByDate(revenue);

        if (totalAdvance > 1000) {

          const simplifiedTotal = (totalAdvance / 1000);
          setGetTotalSaleByDate(simplifiedTotal + "k");
        } else {
          setGetTotalSaleByDate(totalAdvance + "৳");
        }
      });
  } catch (error) {
    // Handle the error here
    console.error("An error occurred:", error);
  }


  // --------------------------------get Total Revenue By Date-------------------------------------

  const [getTotalExpenseByDate, setGetTotalExpenseByDate] = useState([]);
  const [getTotalExpenseByDateInInteger, setGetTotalExpenseByDateInInteger] = useState([]);

  fetch(`https://admin-backend-seven.vercel.app/getproductbydate/${month}`)
    .then(res => res.json())
    .then(result => {
      let totalSale = 0;
      for (let i = 0; i < result.length; i++) {
        totalSale += result[i]?.purchaseprice;
      }

      fetch(`https://admin-backend-seven.vercel.app/getemploypaymentbydate/${month}`)
        .then(res => res.json())
        .then(data => {
          let totalPayment = 0;

          for (let i = 0; i < data.length; i++) {
            totalPayment += data[i]?.pay;
          }

          totalSale += totalPayment;
          setGetTotalExpenseByDateInInteger(totalSale)
          if (totalSale > 1000) {
            const simplifiedTotal = (totalSale / 1000).toFixed(1);
            setGetTotalExpenseByDate(simplifiedTotal + "k");
          } else {
            setGetTotalExpenseByDate(totalSale);
          }
        });
    });


  // *************************************************************************************

  // --------------------------------get Total expense By Date-------------------------------------

  const [getTotalProductByDate, setGetTotalProductByDate] = useState([]);

  try {
    fetch(`https://admin-backend-seven.vercel.app/getproductbydate/${month}`)
      .then(res => res.json())
      .then(result => {
        let totalAdvance = 0;
        for (let i = 0; i < result.length; i++) {
          totalAdvance += result[i].purchaseprice;
        }
        if (totalAdvance > 1000) {
          const simplifiedTotal = Math.floor(totalAdvance / 1000);
          setGetTotalProductByDate(simplifiedTotal + "k");
        } else {
          setGetTotalProductByDate(totalAdvance + "৳");
        }
      });
  } catch (error) {
    // Handle the error here
    console.error("An error occurred:", error);
  }

  // --------------------------------get Total Product purchase price By Date-------------------------------------

  const [stockIn, setStockIn] = useState([]);
  useEffect(() => {
    setLoading(true);

    const fetchTotalProduct = async () => {
      try {
        const response = await fetch('https://admin-backend-seven.vercel.app/getTotalProduct');
        const result = await response.json();
        setStockIn(result);
      } catch (error) {

      }
    };

    fetchTotalProduct();

    const interval = setInterval(() => {
      // fetchData();
      fetchTotalProduct();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // *******************end of get total product******************************************

  const [shopBillbyDate, setShopBillbyDate] = useState([]);


  useEffect(() => {
    setLoading(true);

    const getshopbill = async () => {
      try {
        const response = await fetch(`https://admin-backend-seven.vercel.app/getShopPaymentByDate/${formatDate(month)}`);
        const result = await response.json();
        setShopBillbyDate(result);
      } catch (error) {

      }
    };

    getshopbill();

    const interval = setInterval(() => {
      getshopbill();
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  return (
    <ApiContext.Provider value={{
      bill,
      data,
      googleSign,
      selectedProduct,
      formData,
      shopBillbyDate,
      employees,
      stockIn,
      isModalOpen,
      setIsModalOpen,
      handlePayBill,
      setLoading,
      getTotalSaleByDate,
      getTotalProductByDate,
      shop,
      handleUpdatePaybill,
      handleProductChange,
      ProductData,
      handleCompany,
      handleChangedata,
      getMonthName,
      handleShop,
      handleEmploy,
      handleshopBill,
      ProductData,
      allcompany,
      totalProduct,
      StockOut,
      getTotalExpenseByDate,
      loading,
      totalPurchasePrice,
      totalSell,
      handleGetProduct,
      handleProductDelete,
      getTotalRevenueByDate,
      getTotalExpenseByDateInInteger,
      handleBillMemo,
      handleBillcreating,
      codeData,
      setShop,
      handleshopDelete,
      selectedCode,
      customarbills,
      handle_comapany_bill_pay,
      getBillByID
    }}>
      {children}
    </ApiContext.Provider>
  );
};
