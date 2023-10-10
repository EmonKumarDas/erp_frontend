import React, { useContext, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import { ApiContext } from '../../ApiProvider/ApiProvider';
import { Link } from 'react-router-dom';
import StockData from './StockInData';
import Creditor from './Creditor';
import MostSell from './MostSells';
import Credit from './Credit';
import DateSelector from '../../DateSelector/DateSelector';

const Analytics = () => {
  const { loading, getTotalRevenueByDate, originalPrice, getTotalExpenseByDate, getTotalProductByDate, setSelected_Date, getMonthName, stockIn, StockOut } = useContext(ApiContext);
  const getProductsExpense = getTotalProductByDate ? getTotalProductByDate : 0;
  const total_Expense = getTotalExpenseByDate + getProductsExpense + originalPrice?.Origina_price;

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
      </div>

      <DateSelector></DateSelector>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>

        <CardOne
          title="মোট বিক্রি"
          amount={loading ? "Loading..." : getTotalRevenueByDate ? getTotalRevenueByDate : 0}
        ></CardOne>

        <CardOne
          title=" মোট খরচ"
          amount={loading ? "Loading..." : total_Expense ? total_Expense : 0}
        ></CardOne>

        <CardOne
          title="মোট লাভ"
          amount={getTotalRevenueByDate - total_Expense ? getTotalRevenueByDate - total_Expense : 0 + "৳"}
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
