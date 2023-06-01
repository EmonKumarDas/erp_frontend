import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Analytics from './pages/Dashboard/Analytics'
import Calendar from './pages/Calendar'
import Profile from './Employ Management/Profile'
import FormElements from './pages/Form/FormElements'
import Settings from './pages/Settings'
import Chart from './pages/Chart'
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
            <Route path='/forms/form-elements' element={<FormElements />} />
            <Route path='/addcompany' element={<PrivateRoute><AddCompany /></PrivateRoute>} />
            <Route path='/addemploy' element={<PrivateRoute><AddEmploy /></PrivateRoute>} />
            <Route path='/addproduct' element={<PrivateRoute><AddProduct /></PrivateRoute>} />
            <Route path='/bill' element={<PrivateRoute><CreateBill /></PrivateRoute>} />
            <Route path='/print' element={<PrivateRoute><Print /></PrivateRoute>} />
            <Route path='/printinstant' element={<PrivateRoute><PrintInstant /></PrivateRoute>} />
            <Route path='/manageEmploy' element={<PrivateRoute><ChatCard /></PrivateRoute>} />
            <Route path='/addshop' element={<PrivateRoute><AddShop /></PrivateRoute>} />

            <Route
              path='/bills/:id'
              element={<PrivateRoute><ViewBill></ViewBill></PrivateRoute>}
            />

            <Route
              path='/details/:id'
              element={<PrivateRoute><Profile></Profile></PrivateRoute>}
            />

            <Route path='/productcategory' element={<ProductsCategory />} />
            <Route path='/allbills' element={<BillsTable />} />
            <Route path='/allcompanies' element={<AllCompany />} />
            <Route path='/allproducts' element={<AllProduct />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/chart' element={<Chart />} />
            <Route path='/ui/alerts' element={<Alerts />} />
            <Route path='/ui/buttons' element={<Buttons />} />
            <Route path='/auth/signin' element={<SignIn />} />

          </Routes>
        </>
      )}
    </ApiProvider>
  )
}

export default App
