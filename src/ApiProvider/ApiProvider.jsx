import { useContext } from 'react';
import { createContext, useState, useEffect } from 'react';
import { userContext } from '../pages/Authentication/AuthProvider';
import { toast } from 'react-toastify';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/getProducts');
      const result = await response.json();
      setData(result);
      setLoading(false);

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
    fetch("http://localhost:5000/addcompany", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(company)
    }).then(res => res.json()).then(result => {
      e.target.reset();
      setLoading(false)
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
    fetch("http://localhost:5000/addshop", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shop)
    }).then(res => res.json()).then(result => {
      e.target.reset();
      setLoading(false)
    })

  }

  // ------------------------------end of Add shop----------------------------------------
  const [shop, setShop] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/getshop');
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
    fetch("http://localhost:5000/getCompany").then(res => res.json()).then(result => {
      setAllcompany(result)
    })
  }, [])

  // ------------------------------end of get company----------------------------------------



  const handleProductDelete = (id) => {
    setLoading(true);
    fetch(`http://localhost:5000/deleteProduct/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(result => {
        fetchData();
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error deleting product with ID`);
      });
  };
  // ------------------------------end of handle delete Product----------------------------------------

  const handleGetProduct = (e) => {

    e.preventDefault();
    const barCode = e.target.code.value;
    const productName = e.target.productname.value;
    const watt = e.target.watt.value;
    const purchaseprice = parseInt(e.target.PurchasePrice.value);
    const quantity = parseInt(e.target.quantity.value);
    const companyName = e.target.companyName.value;

    const productData = {
      barCode,
      productName,
      watt,
      purchaseprice,
      quantity,
      companyName,
      originalquantity: quantity,
      singleproductprice: Math.round(purchaseprice / quantity)
    }

    setLoading(true);
    fetch("http://localhost:5000/addProducts", {
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

  useEffect(() => {
    if (selectedCode) {
      fetch(`http://localhost:5000/BarCodeData/${selectedCode}`)
        .then((response) => response.json())
        .then((data) => setCodeData(data[0]))
        .catch((error) => console.error(error));
    }
  }, [selectedCode]);

  const handleCodeChange = (event) => {
    setSelectedCode(event.target.value);
  };
  // --------------end of id based Product collection-------------------------

  const [selectedProduct, setSelectedProduct] = useState('');
  const [ProductData, setProductData] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      fetch(`http://localhost:5000/getProductsByProductName/${selectedProduct}`)
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

    const barcode = e.target.code.value;
    const productname = e.target.productname.value;
    const PurchasePrice = e.target.PurchasePrice.value;
    const Discount = e.target.Discount.value;
    const quantity = e.target.quantity.value;
    const watt = e.target.watt.value;
    const TotalPrice = PurchasePrice * quantity;
    const DiscountAmount = (Discount / 100) * TotalPrice
    const SellPrice = TotalPrice - DiscountAmount
    const total = SellPrice;

    await fetch(` http://localhost:5000/getProductsByProductNameAndWatt/${productname}/${watt}`)
      .then(res => res.json())
      .then(result => {
        setProductCode(result);
        const barCode = barcode === "Select Product's Code" ? result[0]?._id : barcode;
        const newBillData = {
          barCode,
          productname,
          watt,
          TotalPrice,
          PurchasePrice,
          SellPrice,
          Discount,
          quantity,
          total
        };

        if (result[0]?.quantity > quantity) {
          const existingData = JSON.parse(localStorage.getItem('billData')) || [];

          const updatedData = [...existingData, newBillData];

          localStorage.setItem('billData', JSON.stringify(updatedData));

          const existedQuantity = (result[0]?.quantity || 0) - quantity;
          fetch(`http://localhost:5000/UpdateProduct/${result[0]?._id}`, {
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

            })
            .catch(error => {
              console.error(error);
            });

        }
        else {
          toast("you don't have much Product")
        }


      });

  };


  // -------------------------end handle bill create---------------------------

  const handleBillMemo = (e, products, total) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phonenumber = e.target.phonenumber.value;
    const advance = parseInt(e.target.advance.value);
    const location = e.target.location.value;
    const shopname = e.target.shopname.value;
    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const userData = {
      name, location, phonenumber, date, advance, shopname, newbalance: parseInt(total - advance), total,
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
    fetch("http://localhost:5000/createBill", {
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
    fetch("http://localhost:5000/getBill")
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
    fetch("http://localhost:5000/getBill")
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
        fetch("http://localhost:5000/addUser", {
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
        const response = await fetch("http://localhost:5000/getBill");
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
    return fetch(`http://localhost:5000/getbills/${id}`)
      .then(response => {
        console.log(response);
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
    setLoading(true)


    const matchingUser = employees.find(user => user.email === formData.email)
    if (matchingUser) {
      window.alert("User Already Exists")

      setLoading(false)
    }
    else {
      setLoading(true)
      fetch("http://localhost:5000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(result => {
          setLoading(false)
        })
    }


  };

  // -------------------------------------add employ--------------------------------------- 
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/getUsers").then(res => res.json()).then(result => {
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

    const paybill = {
      name, number, pay
    }
    setLoading(true);
    fetch("http://localhost:5000/paybill", {
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
    console.log(paybill);
    setLoading(true);
    fetch(`http://localhost:5000/UpdateProductbill/${customarbill?._id}`, {
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
        console.log(result);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // -------------------------------------update customar bill--------------------------------------- 

  const [getTotalSaleByDate, setGetTotalSaleByDate] = useState([]);
  const now = new Date();
  const month = `${now.getFullYear()}-${now.getMonth() + 1}`;
  fetch(`http://localhost:5000/getBillByDate/${month}`).then(res => res.json()).then(result => {
    let totalAdvance = 0;
    for (let i = 0; i < result.length; i++) {
      totalAdvance += result[i].advance;
    }
    if (totalAdvance > 1000) {
      const simplifiedTotal = Math.floor(totalAdvance / 1000);
      setGetTotalSaleByDate(simplifiedTotal + "k");
    }
    else {
      setGetTotalSaleByDate(totalAdvance)
    }
  })
  // --------------------------------get Total Income By Date-------------------------------------

  const [getTotalProductByDate, setGetTotalProductByDate] = useState([]);
  fetch(`http://localhost:5000/getproductbydate/${month}`).then(res => res.json()).then(result => {
    let totalAdvance = 0;
    for (let i = 0; i < result.length; i++) {
      totalAdvance += result[i].purchaseprice
        ;
    }
    if (totalAdvance > 1000) {
      const simplifiedTotal = Math.floor(totalAdvance / 1000);
      setGetTotalProductByDate(simplifiedTotal + "k");
    }
    else {
      setGetTotalProductByDate(totalAdvance)
    }
  })
  // --------------------------------get Total Product purchase price By Date-------------------------------------



  // const [getTotalIncomeByDate, setGetTotalIncomeByDate] = useState([]);
  // fetch(`http://localhost:5000/getproductbydate/${month}`).then(res => res.json()).then(result => {
  //   let totalAdvance = 0;
  //   for (let i = 0; i < result.length; i++) {
  //     totalAdvance += result[i].purchaseprice
  //       ;
  //   }
  //   if (totalAdvance > 1000) {
  //     const simplifiedTotal = Math.floor(totalAdvance / 1000);
  //     setGetTotalIncomeByDate(simplifiedTotal + "k");
  //   }
  //   else {
  //     setGetTotalIncomeByDate(totalAdvance)
  //   }
  // })
  // // --------------------------------get Total Total income By Date-------------------------------------

  return (
    <ApiContext.Provider value={{
      bill,
      data,
      googleSign,
      selectedProduct,
      formData,
      employees,
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
      ProductData,
      allcompany,
      totalProduct,
      StockOut,
      loading,
      totalPurchasePrice,
      totalSell,
      handleGetProduct,
      handleProductDelete,
      handleBillMemo,
      handleBillcreating,
      codeData,
      selectedCode,
      customarbills,
      handleCodeChange,
      getBillByID
    }}>
      {children}
    </ApiContext.Provider>
  );
};
