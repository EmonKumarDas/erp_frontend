import React, { useContext, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import ChartOne from '../../components/ChartOne';
import ChartTwo from '../../components/ChartTwo';
import { ApiContext } from '../../ApiProvider/ApiProvider';

const Analytics = () => {
  const { getTotalRevenueByDate, getTotalExpenseByDateInInteger, getTotalExpenseByDate, getTotalProductByDate, getTotalSaleByDate, totalPurchasePrice, totalProduct, StockOut } = useContext(ApiContext)
  const netProfit = (getTotalRevenueByDate - getTotalExpenseByDateInInteger);

  return (
    <DefaultLayout>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardOne
          title="Revenue"
          amount={getTotalSaleByDate + "৳"}
        ></CardOne>
        <CardOne
          title="Total Purchase"
          amount={getTotalProductByDate === "" ? getTotalProductByDate : "0" + "৳"}
        ></CardOne>
        <CardOne
          title="Net Profit"
          amount={netProfit > 1000 ? (netProfit / 1000).toFixed(1) + "k" : netProfit + "৳"}
        ></CardOne>
        <CardOne
          title="Stock In"
          amount={totalProduct}
        ></CardOne>
        <CardOne
          title="Stock Out"
          amount={StockOut}
        ></CardOne>

      </div>

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <ChartOne />
        <ChartTwo />

      </div>
    </DefaultLayout >
  )
}

export default Analytics;
