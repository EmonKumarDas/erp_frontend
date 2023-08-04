import React, { useContext, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import { ApiContext } from '../../ApiProvider/ApiProvider';
import { Link } from 'react-router-dom';
import StockData from './StockInData';
import Creditor from './Creditor';
import MostSell from './MostSells';
import Credit from './Credit';

const Analytics = () => {
  const { getTotalRevenueByDate, GetReturnProducts, setSelected_Date, shopBillbyDate, getMonthName, stockIn, getTotalExpenseByDateInInteger, getTotalSaleByDate, StockOut } = useContext(ApiContext);
  const totalAmountSum = GetReturnProducts.reduce((acc, entry) => acc + entry.TotalAmount, 0);

  let totalSum = 0;
  for (let i = 0; i < shopBillbyDate.length; i++) {
    const expense = shopBillbyDate[i];
    if (expense.total !== null && typeof expense.total === 'number') {
      totalSum += expense.total;
    }
  }

  const expense = (totalSum + getTotalExpenseByDateInInteger);

  const netProfit = (getTotalRevenueByDate - expense);
  const totalQuantity = stockIn.reduce((sum, item) => sum + item.quantity, 0);

  const now = new Date();
  const year = `${now.getFullYear()}`;
  const month = `${now.getMonth() + 1}`;
  const newMonth = getMonthName(month);
  const showDate = year + " || " + newMonth;

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setSelectedDate(selectedDate);

    // Call your method to get data for the selected date here...
    const month = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}`;
    setSelected_Date(month);
  };

  return (
    <DefaultLayout>

      <div className="my-4">
        <label htmlFor="datePicker" className="mr-2">Select Date:</label>

        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
          className="border border-gray-400 rounded px-2 py-1"
        />
        {
          selectedDate ? <p className='text-start my-5'>{selectedDate.toLocaleString()}</p> : <p className='text-start my-5 text-meta-3 font-bold'> {showDate} </p>
        }
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>

        <CardOne
          title="Revenue"
          amount={parseInt(getTotalSaleByDate) - parseInt(totalAmountSum)}
       
        ></CardOne>

        <CardOne
          title="Net Profit"
          amount={netProfit - totalAmountSum + "৳"}
        
        ></CardOne>

        <Link to="/stockIn">
          <CardOne
            title="Stock In"
            amount={totalQuantity}
           
          ></CardOne>
        </Link>
        <CardOne
          title="Stock Out"
          amount={StockOut}
          
        ></CardOne>
      </div>

      <StockData></StockData>
      <Credit></Credit>
      <Creditor></Creditor>
      <MostSell></MostSell>
    </DefaultLayout>
  )
}

export default Analytics;
