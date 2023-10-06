import { useContext } from 'react';
import { createContext, useState, useEffect } from 'react';
import { userContext } from '../pages/Authentication/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import useToken from '../hooks/UseToken';
import { v4 as uuidv4 } from 'uuid';
import { sliceDate } from './Functions';
export const ApiContext = createContext();
export const ApiProvider = ({ children }) => {
  const { user } = useContext(userContext)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getSelectedDate, setSelected_Date] = useState("");
  const [email, setEmail] = useState('');
  const [token] = useToken(email);
  const [shop, setShop] = useState([]);
  const [getDate, setGetDate] = useState("")
  const get_Date = getSelectedDate ? formatDate(getSelectedDate) : "";

  if (token) {
    window.location.href = '/'
  }
  function truncateDate(dateString) {
    const parts = dateString.split('-'); // Split the string at the hyphen
    if (parts.length >= 2) {
      // Join the first two elements with a hyphen
      return parts.slice(0, 2).join('-');
    } else {
      // Invalid date format, return the original string
      return dateString;
    }
  }
  const [scode, Setscode] = useState("false");
  const storedSearchValue = localStorage.getItem('searchValue');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getCodeCollection", {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result[0] && result[0].code === storedSearchValue) {
          Setscode("true");
        } else {
          Setscode("false");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to handle the error in some way, e.g., setting an error state.
      }
    };

    // Fetch data initially when the component mounts
    fetchData();

    // Set up an interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [storedSearchValue]);
  // ----------------------------+++++++++++start++++++++++++++---------------------------------------------

  function formatDate(date) {
    const parts = date.split('-');
    const year = parts[0];
    const month = parts[1].padStart(2, '0');
    return `${year}-${month}`;
  }

  // ----------------------------+++++++++++stop++++++++++++++-----------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getProducts`, {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const result = await response.json();

        if (Array.isArray(result)) {
          setData(result);
          setLoading(false);
        } else {
          // Handle the case where the result is not an array
        }
      } catch (error) {
        // Handle fetch errors
      }
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 1 second
    const intervalId = setInterval(fetchData, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
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
      email: user?.email
    }
    setLoading(true);
    fetch("http://localhost:5000/addcompany", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(company)
    }).then(res => res.json()).then(result => {
      e.target.reset();
      setLoading(false)
      toast("company added")
    })

  }

  // ------------------------------end of post company----------------------------------------

  const handle_return_product = (e) => {
    e.preventDefault();
    const product = e.target.product.value;
    const watt = e.target.watt.value;
    const company = e.target.company.value;
    const quantity = parseInt(e.target.quantity.value);
    const price = parseInt(e.target.price.value);
    const TotalAmount = price * quantity;
    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const month = `${now.getFullYear()}-${now.getMonth() + 1}`;

    const returnProductPost = {
      product,
      watt,
      company,
      quantity,
      price,
      TotalAmount,
      date,
      month,
      email: user?.email
    }

    setLoading(true);
    fetch("http://localhost:5000/PostReturnProduct", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(returnProductPost)
    }).then(res => res.json()).then(result => {
      e.target.reset();
      setLoading(false)
      toast("Added return product")
    })
  }
  //-------------------------------end of return product post fucntionality---------------

  const handleShop = (e) => {
    e.preventDefault();
    const shopname = e.target.name.value;
    const location = e.target.location.value;

    const shop = {
      shopname,
      location,
      email: user?.email
    }

    setLoading(true);
    fetch("http://localhost:5000/addshop", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(shop)
    }).then(res => res.json()).then(result => {
      e.target.reset();

      setLoading(false);
      toast("shop added")
    })

  }

  // ------------------------------end of Add shop----------------------------------------


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getshop', {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const result = await response.json();
        setShop(result);
      }
      catch (error) {
        // Handle errors
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);



  // ------------------------------end of get shop----------------------------------------
  const [allcompany, setAllcompany] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (!user?.email && !token) {
          return;
        }
        const response = await fetch(`http://localhost:5000/getCompany/${user?.email}`, {
          method: "GET",
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const result = await response.json();
        setAllcompany(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const fetchCompanyDataWithInterval = () => {
      // Fetch initially and then every 5 seconds
      fetchCompanyData();

      // Set up an interval to fetch data every 5 seconds (5000 milliseconds)
      const intervalId = setInterval(() => {
        fetchCompanyData();
      }, 5000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    };

    fetchCompanyDataWithInterval();
  }, [user?.email]);




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
        window.alert("Success")
      })
      .catch(error => {
        console.error(`Error deleting product with ID`);
      });
  };
  // ------------------------------end of handle delete Product----------------------------------------


  const handleshopDelete = (id) => {
    setLoading(true);
    fetch(`http://localhost:5000/deleteshop/${id}`, {
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
    const barCode = e.target.code.value;
    const productName = e.target.productname.value;
    const watt = e.target.watt.value;
    const advance = parseInt(e.target.advance.value);
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
      advance,
      originalquantity: quantity,
      singleproductprice: Math.round(purchaseprice / quantity),
      email: user?.email
    }

    // -------------********get total product start*********------------------------
    const totalProduct = {
      productName,
      watt,
      quantity,
      companyName,
      email: user?.email,
    }

    setLoading(true);

    fetch("http://localhost:5000/getTotalProduct", {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(results => {
        if (results.length === 0) {

          fetch("http://localhost:5000/totalProduct", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(totalProduct)
          })
            .then(res => res.json())
            .then(createdResult => {
              toast("success")
              // Handle the result of the creation, if needed
            })
            .catch(error => {
              toast("faild")
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

            const newQuantity = { quantity: quantity + (foundItem?.quantity || 0) };
            // Update the quantity using the API endpoint
            fetch(`http://localhost:5000/UpdateProductQuantity/${foundItem._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newQuantity)
            })
              .then(res => res.json())
              .then(updatedResult => {
                // toast("successfuly updated")
                // Handle the result of the update, if needed
              });
          } else {

            // Create a new totalProduct using the API endpoint
            fetch("http://localhost:5000/totalProduct", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(totalProduct)
            })
              .then(res => res.json())
              .then(createdResult => {

                // Handle the result of the creation, if needed
              })
              .catch(error => {
                // Handle any error during the creation process
              });
          }
        }
      });

    // -------------********get total product end*********------------------------

    fetch("http://localhost:5000/addProducts", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(productData)
    }).then(res => res.json()).then(result => {
      e.target.reset();
      setLoading(false)
      window.alert("Success")

    })
  }


  // --------------------End of handle post product-------------------------------


  const [selectedProduct, setSelectedProduct] = useState('');
  const [ProductData, setProductData] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      return;
    }
    if (selectedProduct) {
      fetch(`http://localhost:5000/getProductsByProductName/${selectedProduct}`, {
        method: 'GET',
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((response) => response.json())
        .then((data) => setProductData(data[0]))
        .catch((error) => console.error(error));
    }
  }, [selectedProduct]);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  // --------------end of id based Product collection-------------------------




  const handleBillcreating = async (e) => {
    e.preventDefault();

    const productname = e.target.productname.value;
    const PurchasePrice = e.target.PurchasePrice.value;
    const Discount = e.target.Discount.value;
    const quantity = e.target.quantity.value;
    const company = e.target.company.value;
    const watt = e.target.watt.value;
    const TotalPrice = PurchasePrice * quantity;
    const DiscountAmount = (Discount / 100) * TotalPrice;
    const SellPrice = TotalPrice - DiscountAmount;
    const total = SellPrice;

    setLoading(true);

    try {
      const response1 = await fetch(`http://localhost:5000/getProductsByProductNameAndWatt/${productname}/${watt}`, {
        method: 'GET',
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });

      const result1 = await response1.json();

      const newBillData = {
        email: user?.email,
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

      const response2 = await fetch(`http://localhost:5000/getProductsByPnameComNameWatt/${productname.toLowerCase()}/${watt.toLowerCase()}/${company.toLowerCase()}`, {
        method: 'GET',
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });

      const data = await response2.json();

      if (data[0]?.quantity >= quantity) {
        const existingData = JSON.parse(localStorage.getItem('billData')) || [];
        const updatedData = [...existingData, newBillData];
        localStorage.setItem('billData', JSON.stringify(updatedData));

        const existedQuantity = (data[0].quantity || 0) - quantity;

        const response3 = await fetch(`http://localhost:5000/UpdateProductQuantity/${data[0]._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quantity: existedQuantity
          })
        });

        const updatedProduct = await response3.json();

        if (updatedProduct) {
          e.target.PurchasePrice.value = "";
          toast("product updated")
          setLoading(false);
        } else {
          toast("Failed to update product quantity");
        }
      } else {
        toast("You don't have enough product");
      }
    } catch (error) {
      console.error(error);
      toast("Try Again");
      setLoading(false);
    }
  };

  // -------------------------end handle bill create---------------------------

  const handleBillMemo = async (e, products, total) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phonenumber = e.target.phonenumber.value;
    const date = e.target.date.value;
    const advance = parseInt(e.target.advance.value);
    const get_discount = parseInt(e.target.discount.value);
    const location = e.target.location.value;
    const shopname = e.target.shopname.value;
    const month = truncateDate(date)
    const year = sliceDate(date)
    const get_products = JSON.parse(localStorage.getItem('billData'));
    const get_total = get_products?.reduce((acc, product) => acc + product.total, 0);
    const discountedTotal = get_total - (get_total * get_discount / 100);
    const get_advance_by_date = { advance, month, date, year }
    const pay_advance_by_date = [get_advance_by_date]

    const userData = {
      email: user?.email,
      name,
      location,
      phonenumber,
      date,
      advance,
      shopname,
      month,
      get_discount,
      discountedTotal,
      newbalance: parseInt(advance ? discountedTotal - advance : total - 0),
      total,
    };

    const mergedObject = {
      pay_advance_by_date,
      ...userData,
      products,
    };

    try {
      // Convert mergedObject to JSON string
      const mergedObjectString = JSON.stringify(mergedObject);

      // Store the mergedObjectString in localStorage
      localStorage.setItem('mergedData', mergedObjectString);

      setLoading(true);

      // Make API call to create the bill
      const response = await fetch("http://localhost:5000/createBill", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: mergedObjectString,
      });

      const result = await response.json();

      if (result.acknowledged === true) {
        setLoading(false);
        window.location.replace('/printinstant');
      } else {
        throw new Error(result.message || "Failed to create bill");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      // Handle any error that occurred during the process
      // You can show an error message or perform other actions here
    }
  };


  // ----------------end of create bill-----------------------------------

  const [bill, setBill] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (!user?.email) {
          return;
        }

        const response = await fetch(`http://localhost:5000/getBill/${user?.email}`, {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });

        const result = await response.json();
        const getbill = result.length;

        if (result.length === 1) {
          setBill(result[0]);
        } else {
          setBill(result[getbill - 1]);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [user?.email]);


  // ---------------------------------end of print bill-----------------------------------

  const [bills, setBills] = useState([]);
  useEffect(() => {
    if (!user?.email) {
      return
    }
    fetch(`http://localhost:5000/getBill/${user?.email}`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
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


  const totalPurchasePrice = data?.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.purchaseprice);
  }, 0);


  // ----------------------------end of total purchase products price----------------------------------------

  const totalProduct = data.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.quantity);
  }, 0);

  // ----------------------------end of total totalProduct---------------------------------------

  const { login } = useContext(userContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true)
    login(email, password).then((result) => {
      const email = result.user.email;
      // jwt

      setEmail(email)

      if (token) {
        const userInfo = {
          email
        }
        const matchingUser = employees.find(user => user.email === email)
        if (matchingUser) {
          // window.location.replace('/');
          window.location.href = '/';
          setLoading(false)
        }
        else {
          fetch("http://localhost:5000/addUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem('accessToken')}`

            },
            body: JSON.stringify(userInfo)
          })
            .then(res => res.json())
            .then(result => {
              // window.location.replace('/');
              window.location.href = '/';
              setLoading(false)
            }).catch(er => {
              setLoading(false)
            })
        }
      }

    }).catch((error) => {
      setError(error.message)
      setLoading(false);
      // toast("User Not Found");
    })

  }

  // -------------------------------------googleSignIn----------------------------------------

  const [customarbills, SetBills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getBill/${user?.email}`,
          {
            method: 'GET',
            headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
          }
        );
        const result = await response.json();
        SetBills(result);

      } catch (error) {

      }
    };

    fetchData();
    setLoading(false);
    const interval = setInterval(fetchData, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [user?.email]); // Add

  // --------------------------------get created bills data----------------------------------

  const getBillByID = (id) => {
    return fetch(`http://localhost:5000/getbills/${id}`,
      {
        method: 'GET',
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      }
    )
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
    //setLoading(true);

    const matchingUser = employees.find(user => user.email === formData.email);
    if (matchingUser) {
      window.alert("User Already Exists");
      //setLoading(false);
    } else {
      //setLoading(true);
      fetch("http://localhost:5000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(result => {
          event.target.reset();

          setFormData({});

        });
    }
  };



  // -------------------------------------add employ---------------------------------------
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getUsers", {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const result = await response.json();
        setEmployees(result);
      } catch (error) {
        // Handle errors if needed
      }
    };

    fetchData(); // Fetch data initially

    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup function to clear the interval when the component is unmounted
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
    const year = sliceDate(date);

    const paybill = {
      name, number, pay, otherbill, month, year, date, email: user?.email
    }

    setLoading(true);
    fetch("http://localhost:5000/paybill", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
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
    const year = sliceDate(month)
    const paybill = {
      email: user?.email, productId: _id, shopname, location, pay, tax: !tax ? 0 : tax, date, month, year, electricity, total: pay + tax + electricity
    }

    setLoading(true);
    fetch("http://localhost:5000/payshopbill", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(paybill)
    }).then(res => res.json()).then(result => {
      setLoading(false)
      setIsModalOpen(false)
      toast("Pay shop model")
    })
  }

  // -------------------------------------pay shop's bill---------------------------------------
  const handle_comapany_bill_pay = (e, product_id) => {
    e.preventDefault();
    const get_advance = parseInt(e.target.advance.value);
    const get_date = e.target.date.value;
    const month = get_date.slice(0, 7);
    const year = get_date.split("-")[0];
    setLoading(true);
    fetch(`http://localhost:5000/getProductById/${product_id}`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => res.json()).then(product => {
      const advance = (product?.advance || 0) + get_advance;
      const getPayamaount = product.payamount;

      const getUpdateValue = {
        month, advance: get_advance, get_date, year
      }

      const updatePayamount = [...getPayamaount, getUpdateValue]

      const billData = {
        advance, updatePayamount
      }

      fetch(`http://localhost:5000/Upadate_Product_Remaining_Balance/${product_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(billData)
      }).then(res => res.json()).then(result => {
        setLoading(false)
        setIsModalOpen(false)
      })
    })
  }

  // -------------------------------------handle comapany bill pay---------------------------------------

  function getMonthName(monthName) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Find the index of the input monthName in the array
    const index = months.indexOf(monthName);

    // Checking if the input monthName is valid
    if (index !== -1) {
      // Adding 1 to the index to get the month number (1-based)
      const monthNumber = index + 1;
      // Convert the month number to a string with leading zeros for months 1 to 9
      return monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
    } else {
      return '0'; // Return '0' for invalid month names
    }
  }

  // Example usage:
  const monthName = 'March';
  const monthNumber = getMonthName(monthName);

  if (typeof monthNumber === 'string') {
    // Output: '03' (for March)
  } else {

  }


  function getMonthNameToConvert(number) {
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
    const date = e.target.date.value;
    const month = date.slice(0, 7);
    const year = sliceDate(date)
    const paybill = { advance: totalpay, newbalance };

    setLoading(true);
    fetch(`http://localhost:5000/getbills/${customarbill?._id}`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => res.json()).then(result => {
      const get_advance_by_date = result?.pay_advance_by_date;
      const get_current_data = { advance, month, date, year }
      const get_update_date = [...get_advance_by_date, get_current_data]

      fetch(`http://localhost:5000/UpdateProductbill/${customarbill?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ advance: totalpay, newbalance, get_update_date }),
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
          toast("updated")
        })
        .catch((error) => {

          //setLoading(false);
        });
    })
  };

  // -------------------------------------update customar bill---------------------------------------

  const [getTotalSaleByDate, setGetTotalSaleByDate] = useState([]);
  const [getTotalRevenueByDate, setGetTotalRevenueByDate] = useState([]);
  const now = new Date();
  const month = `${now.getFullYear()}-${now.getMonth() + 1}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getStoreProductDate/${getDate}`, {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const getRevenue = scode === "false" ? result.totalAdvance / 2 : result.totalAdvance;
        setGetTotalRevenueByDate(getRevenue);
        setLoading(false);
      }
      catch (error) {
        // Handle the error here
        console.error("An error occurred:", error);
      }

    };

    fetchData(); // Fetch data immediately on mount

    // Set up an interval to fetch data every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [getSelectedDate, getDate, user]);


  // --------------------------------get Total Revenue By Date-------------------------------------

  const [getTotalExpenseByDate, setGetTotalExpenseByDate] = useState();
  const [getTotalExpenseByDateInInteger, setGetTotalExpenseByDateInInteger] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, employeePaymentResponse] = await Promise.all([
          fetch(`http://localhost:5000/getProductsByDate/${getDate}`, {
            method: 'GET',
            headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
          }),
          fetch(`http://localhost:5000/getemploypaymentbydate/${getDate}`, {
            method: 'GET',
            headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
          })
        ]);

        const [productData, employeePaymentData] = await Promise.all([productResponse.json(), employeePaymentResponse.json()]);
        const employPayment = employeePaymentData.transactions;

        let totalPayment = 0;

        for (let i = 0; i < employPayment.length; i++) {
          totalPayment += employPayment[i]?.pay + employPayment[i]?.otherbill;

        }
        fetch(`http://localhost:5000/getStoreProductDate/${getDate}`, {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        }).then(res => res.json()).then(result => {
          const getOriginalPrice = result?.getOriginalPrice ? result.getOriginalPrice : 0;
          const productsbuy = productData.totalAdvance;
          const totalExpence = totalPayment + productsbuy + getOriginalPrice;
          const getExpence = scode === "false" ? totalExpence / 2 : totalExpence;
          setGetTotalExpenseByDateInInteger(totalExpence);
          setGetTotalExpenseByDate(getExpence);
        }
        )
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Fetch data immediately on mount

    // Set up an interval to fetch data every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [getSelectedDate, get_Date, getDate, user]);





  // *************************************************************************************

  // --------------------------------get Total expense By Date-------------------------------------

  const [getTotalProductByDate, setGetTotalProductByDate] = useState();

useEffect(() => {
  // This inner useEffect watches the getDate variable
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getShopPaymentByDate/${user?.email}/${getDate}`, {
        method: 'GET',
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.length !== 0) {
        let shopPayment = 0;
        for (let i = 0; i < result.length; i++) {
          shopPayment += result[i].total;
        }
        const getExpence = scode === "false" ? shopPayment / 2 : shopPayment;
        setGetTotalProductByDate(getExpence);
      } else {
        setGetTotalProductByDate(0);
      }
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
    }
  };

  if (getDate) {
    fetchData(); // Only execute fetchData if getDate is truthy (loaded)
  }
}, [getSelectedDate, user, getDate]);




  // --------------------------------get Total Product purchase price By Date-------------------------------------

  const [stockIn, setStockIn] = useState([]);

  useEffect(() => {
    const fetchTotalProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getTotalProduct/${user?.email}`, {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const result = await response.json();
        setStockIn(result);
        setLoading(false); // Set loading state to false after data is fetched if needed
      } catch (error) {
        // Handle errors if needed
      }
    };

    fetchTotalProduct(); // Fetch data immediately on mount

    // Set up an interval to fetch data every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchTotalProduct, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [user?.email]);


  // *******************end of get total product******************************************

  const [ReturnProducts, setReturnProducts] = useState([]);
  useEffect(() => {
    const fetchReturnProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/ReturnProductCollection/${user?.email}`, {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const result = await response.json();
        setReturnProducts(result);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        // Handle errors if needed
      }
    };

    fetchReturnProducts(); // Fetch data immediately on mount

    const interval = setInterval(fetchReturnProducts, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [user?.email]);

  // *******************end of get total product******************************************

  // --------------------------- get return products -------------------------------
  const [sellOut, setSellOut] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/getSellByDate/${getDate}`, {
        method: 'GET',
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => res.json())
        .then((result) => {

          setSellOut(result);
        })
        .catch((error) => {
          console.error(error); // Handle errors here
        });
    } catch (error) {
      console.error(error);
    }
  }, [getSelectedDate, month, getDate]);

  const StockOut = sellOut?.reduce((acc, curr) => {
    return (
      acc +
      curr.products?.reduce((total, product) => {
        return total + parseInt(product.quantity);
      }, 0)
    );
  }, 0);

  // ----------------------------end of total stockout----------------------------------------
  const [GetReturnProducts, setGetReturnProducts] = useState([]);
  useEffect(() => {
    const getreturn_Products = async () => {
      try {
        if (!user?.email) {
          return;
        }

        const response = await fetch(`http://localhost:5000/getReturnProducts`, {
          method: 'GET',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const result = await response.json();
        setGetReturnProducts(result);
      } catch (error) {
        // Handle errors if needed
      }
    };

    getreturn_Products(); // Fetch data initially

    const interval = setInterval(getreturn_Products, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup function to clear the interval when the component is unmounted
  }, []);


  // ------------------------get New products-------------------------

  const PostNewHandleAddProduct = (e) => {
    e.preventDefault();
    const code = e.target.code.value;
    const productname = e.target.productname.value;
    const watt = e.target.watt.value;
    const PurchasePrice = e.target.PurchasePrice.value;
    const companyName = e.target.companyName.value;
    const quantity = parseInt(e.target.quantity.value);
    const amount = quantity * PurchasePrice;
    const uniqueId = uuidv4();

    const NewProductData = {
      id: uniqueId,
      code,
      amount,
      productname,
      companyName,
      watt,
      PurchasePrice,
      quantity
    };

    // update Product start
    const totalProduct = {
      productname,
      watt,
      quantity,
      companyName,
      email: user?.email,
    }

    setLoading(true);

    fetch(`http://localhost:5000/getTotalProduct/${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(results => {
        if (results.length === 0) {
          fetch("http://localhost:5000/totalProduct", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(totalProduct)
          })
            .then(res => res.json())
            .then(createdResult => {
              // Check if there's any existing data in local storage
              let existingProducts = localStorage.getItem("newProducts");
              if (existingProducts) {
                // If data exists, parse it from JSON to an array
                existingProducts = JSON.parse(existingProducts);
              } else {
                // If no data exists, create an empty array
                existingProducts = [];
              }

              // Append the new product to the existing array
              existingProducts.push(NewProductData);

              // Save the updated array back to local storage
              localStorage.setItem("newProducts", JSON.stringify(existingProducts));
              // Handle the result of the update, if needed
              toast("Success")
              // Handle the result of the creation, if needed
            })
            .catch(error => {
              toast("failed")
            });
        }
        else {
          const foundItem = results.find((item) =>
            item?.productname === productname &&
            item?.watt === watt &&
            item?.companyname === companyName.toLowerCase()
          );

          if (foundItem) {
            const newQuantity = { quantity: quantity + (foundItem?.quantity || 0) };
            // Update the quantity using the API endpoint
            fetch(`http://localhost:5000/UpdateProductQuantity/${foundItem._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newQuantity)
            })
              .then(res => res.json())
              .then(updatedResult => {
                // Check if there's any existing data in local storage
                let existingProducts = localStorage.getItem("newProducts");
                if (existingProducts) {
                  // If data exists, parse it from JSON to an array
                  existingProducts = JSON.parse(existingProducts);
                } else {
                  // If no data exists, create an empty array
                  existingProducts = [];
                }

                // Append the new product to the existing array
                existingProducts.push(NewProductData);

                // Save the updated array back to local storage
                localStorage.setItem("newProducts", JSON.stringify(existingProducts));
                // Handle the result of the update, if needed
                e.target.productname.value = "";
              });
          }
          else {

            // Create a new totalProduct using the API endpoint
            fetch("http://localhost:5000/totalProduct", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(totalProduct)
            })
              .then(res => res.json())
              .then(createdResult => {
                // Check if there's any existing data in local storage
                let existingProducts = localStorage.getItem("newProducts");
                if (existingProducts) {
                  // If data exists, parse it from JSON to an array
                  existingProducts = JSON.parse(existingProducts);
                } else {
                  // If no data exists, create an empty array
                  existingProducts = [];
                }

                // Append the new product to the existing array
                existingProducts.push(NewProductData);

                // Save the updated array back to local storage
                localStorage.setItem("newProducts", JSON.stringify(existingProducts));
                // Handle the result of the creation, if needed
                e.target.productname.value = "";
              })
              .catch(error => {
                // Handle any error during the creation process
              });
          }
        }
      });
    // update Product stop
  };

  const handleCompanyBillMemo = (e, products, totalAmount, email) => {
    e.preventDefault();
    const shopname = e.target.shopname.value;
    const get_date = e.target.date.value;
    const advance = parseInt(e.target.advance.value);
    const month = truncateDate(get_date)
    if (totalAmount >= advance) {
      const remaining = totalAmount - advance;
      const newProducts = { shopname, advance, totalAmount, remaining, email, month };
      const payamount = [{ month, advance, get_date }]
      const getProducts = { ...newProducts, products, payamount };
      setLoading(true);

      fetch("http://localhost:5000/AddCompanyProducts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(getProducts),
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          toast("Products Added");
          localStorage.removeItem('newProducts');
        })
        .catch((error) => {
          setLoading(false);
          toast("An error occurred while adding products");
        });
    }
    else {
      toast("Advance more than the total");
    }
  };

  const handleOtherBill = async (e) => {
    e.preventDefault();
    const productname = e.target.productname.value;
    const PurchasePrice = e.target.PurchasePrice.value;
    const Discount = e.target.Discount.value;
    const OriginalPrice = e.target.OriginalPrice.value;
    const storeProductDate = e.target.date.value;
    const quantity = e.target.quantity.value;
    const company = e.target.company.value;
    const watt = e.target.watt.value;
    const TotalPrice = PurchasePrice * quantity;
    const DiscountAmount = (Discount / 100) * TotalPrice;
    const SellPrice = TotalPrice - DiscountAmount;
    const total = SellPrice;

    setLoading(true);

    const newBillData = {
      email: user?.email,
      productname,
      storeProductDate,
      storedateMonth: truncateDate(storeProductDate),
      originalPrice: OriginalPrice * quantity,
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

    const existingData = JSON.parse(localStorage.getItem('billData')) || [];
    const updatedData = [...existingData, newBillData];
    localStorage.setItem('billData', JSON.stringify(updatedData));

  };

  return (
    <ApiContext.Provider value={{
      handleCompanyBillMemo,
      bill,
      scode,
      data,
      selectedProduct,
      formData,
      employees,
      stockIn,
      isModalOpen,
      setIsModalOpen,
      handlePayBill,
      setLoading,
      handleOtherBill,
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
      handleLogin,
      totalProduct,
      StockOut,
      getTotalExpenseByDate,
      loading,
      totalPurchasePrice,
      totalSell,
      scode,
      PostNewHandleAddProduct,
      handleGetProduct,
      handleProductDelete,
      ReturnProducts,
      getTotalRevenueByDate,
      getMonthNameToConvert,
      getTotalExpenseByDateInInteger,
      handleBillMemo,
      handleBillcreating,
      setShop,
      getDate,
      setGetDate,
      handleshopDelete,
      customarbills,
      handle_comapany_bill_pay,
      getBillByID,
      handle_return_product,
      GetReturnProducts,
      setSelected_Date
    }}>
      {children}
    </ApiContext.Provider>
  );
};
