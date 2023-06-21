import React, { useContext, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import ChartOne from '../../components/ChartOne';
import ChartTwo from '../../components/ChartTwo';
import { ApiContext } from '../../ApiProvider/ApiProvider';
import { Link } from 'react-router-dom';
import StockData from './StockInData';

const Analytics = () => {
  const { getTotalRevenueByDate, shopBillbyDate, getMonthName, stockIn, getTotalExpenseByDateInInteger, getTotalExpenseByDate, getTotalProductByDate, getTotalSaleByDate, totalPurchasePrice, totalProduct, StockOut } = useContext(ApiContext)

  let totalSum = 0;
  for (let i = 0; i < shopBillbyDate.length; i++) {
    const expense = shopBillbyDate[i];
    if (expense.total !== null && typeof expense.total === 'number') {
      totalSum += expense.total;
    }
  
  }
const expense = (totalSum+getTotalExpenseByDateInInteger);

  const netProfit = (getTotalRevenueByDate - expense);
  const totalQuantity = stockIn.reduce((sum, item) => sum + item.quantity, 0);

  const now = new Date();
  const year = `${now.getFullYear()}`;
  const month = `${now.getMonth() + 1}`;
  const newMonth = getMonthName(month)
  const showDate = year + " || " + newMonth;
  return (
    <DefaultLayout>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardOne
          title="Revenue"
          amount={getTotalSaleByDate}
          percentage={showDate}

        ></CardOne>

        <CardOne
          title="Net Profit"
          amount={netProfit > 1000 ? (netProfit / 1000) + "k" : netProfit + "৳"}
          percentage={showDate}
        ></CardOne>

        <Link to="/stockIn">
          <CardOne
            title="Stock In"
            amount={totalQuantity}
            percentage={showDate}
          ></CardOne>
        </Link>
        <CardOne
          title="Stock Out"
          amount={StockOut}
          percentage={showDate}
        ></CardOne>

      </div>
      <StockData></StockData>
      {/* <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <ChartOne />
        <ChartTwo />

      </div> */}

    </DefaultLayout >
  )
}

export default Analytics;
