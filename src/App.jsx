import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Analytics from './pages/Dashboard/Analytics'
import Calendar from './pages/Calendar'
import Profile from './Employ Management/Profile'
import Settings from './pages/Settings'
import Alerts from './pages/UiElements/Alerts'
import Buttons from './pages/UiElements/Buttons'
import SignIn from './pages/Authentication/SignIn'
import AddProduct from './pages/Product_management/AddProduct'
import AddCompany from './pages/Product_management/AddCompany'
import ProductsCategory from './pages/Product_management/ProductsCategory'
import { ApiProvider } from './ApiProvider/ApiProvider'
import CreateBill from './Bill/CreateBill'
import Print from './Bill/Print'
import PrivateRoute from './Router/PrivateRoute'
import BillsTable from './components/BillsTable'
import ViewBill from './Bill/ViewBill'
import AllCompany from './pages/Product_management/AllCompany'
import 'react-toastify/dist/ReactToastify.css';
import AllProduct from './pages/Product_management/AllProduct'
import AddEmploy from './Employ Management/AddEmploy'
import ChatCard from './components/ChatCard'
import AddShop from './Employ Management/AddShop'
import PrintInstant from './Bill/PrintInstant'
import ReturnProduct from './ReturnProduct/ReturnProduct'
import StockIn from './Stock/StockIn'
import AllShop from './Employ Management/AllShop'
import ShowShopDetails from './Employ Management/ShowShopDetails'
import ReturnProducts from './ReturnProduct/ReturnProducts'
import NewAddProduct from './pages/Product_management/NewAddProduct'

const App = () => {
  const [loading, setLoading] = useState(true)

  const preloader = document.getElementById('preloader')

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none'
      setLoading(false)
    }, 400);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <ApiProvider>
      {!loading && (
        <>
          <Routes>
            <Route exact path='/' element={<PrivateRoute><Analytics /></PrivateRoute>} />
            <Route path='/calendar' element={<PrivateRoute><Calendar /></PrivateRoute>} />
            <Route path='/profile' element={<PrivateRoute> <Profile /></PrivateRoute>} />
            <Route path='/addcompany' element={<PrivateRoute><AddCompany /></PrivateRoute>} />
            <Route path='/newProduct' element={<PrivateRoute><NewAddProduct /></PrivateRoute>} />
            <Route path='/returnProduct' element={<PrivateRoute><ReturnProduct /></PrivateRoute>} />
            <Route path='/ReturnProducts' element={<PrivateRoute><ReturnProducts /></PrivateRoute>} />
            <Route path='/addemploy' element={<PrivateRoute><AddEmploy /></PrivateRoute>} />
            <Route path='/addproduct' element={<PrivateRoute><AddProduct /></PrivateRoute>} />
            <Route path='/bill' element={<PrivateRoute><CreateBill /></PrivateRoute>} />
            <Route path='/print' element={<PrivateRoute><Print /></PrivateRoute>} />
            <Route path='/printinstant' element={<PrivateRoute><PrintInstant /></PrivateRoute>} />
            <Route path='/stockIn' element={<PrivateRoute><StockIn /></PrivateRoute>} />
            <Route path='/manageshop' element={<PrivateRoute><AllShop /></PrivateRoute>} />
            <Route path='/manageEmploy' element={<PrivateRoute><ChatCard /></PrivateRoute>} />
            <Route path='/addshop' element={<PrivateRoute><AddShop /></PrivateRoute>} />

            <Route
              path='/bills/:id'
              element={<PrivateRoute><ViewBill></ViewBill></PrivateRoute>}
            />

            <Route
              path='/shop_details/:id'
              element={<PrivateRoute><ShowShopDetails></ShowShopDetails></PrivateRoute>}
            />

            <Route
              path='/details/:id'
              element={<PrivateRoute><Profile></Profile></PrivateRoute>}
            />

            <Route path='/productcategory' element={<PrivateRoute><ProductsCategory /></PrivateRoute>} />
            <Route path='/allbills' element={<PrivateRoute><BillsTable /></PrivateRoute>} />
            <Route path='/allcompanies' element={<PrivateRoute><AllCompany /></PrivateRoute>} />
            <Route path='/allproducts' element={<PrivateRoute><AllProduct /></PrivateRoute>} />
            <Route path='/settings' element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path='/ui/alerts' element={<PrivateRoute><Alerts /></PrivateRoute>} />
            <Route path='/ui/buttons' element={<PrivateRoute><Buttons /></PrivateRoute>} />
            <Route path='/auth/signin' element={<SignIn />} />

          </Routes>
        </>
      )}
    </ApiProvider>
  )
}

export default App;
