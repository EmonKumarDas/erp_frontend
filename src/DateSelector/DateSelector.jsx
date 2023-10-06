import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../ApiProvider/ApiProvider';

const DateSelector = () => {
    const { setGetDate, getMonthName, getMonthNameToConvert } = useContext(ApiContext);
    // Generate an array of date options for the day dropdown
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));


    // Generate an array of options for the year dropdown (adjust as needed)
    const currentYear = new Date().getFullYear();
    const currentDay = (new Date().getDay() + 1).toString().padStart(2, '0');
    const currentMonth = getMonthNameToConvert(new Date().getMonth() + 1);
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    // Define an array of month names
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Initialize state to hold the selected date
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const convertMonth = getMonthName(selectedMonth);

    // useEffect(() => {

    // }, [selectedDay,
    //     convertMonth,
    //     selectedYear])

    if (selectedDay && convertMonth && selectedYear) {
        const date = selectedYear + '-' + convertMonth + '-' + selectedDay;
        setGetDate(date)
    }

    else if (!selectedDay && convertMonth != 0 && selectedYear) {
        const date = selectedYear + '-' + convertMonth;
        setGetDate(date);
    }

    else {
        const date = selectedYear;
        setGetDate(date)
    }

    // Handle the change event of the dropdowns
    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    return (
        <div className="my-4 text-center">
            <div className="flex gap-2 items-center">
                <select
                    id="daySelect"
                    value={selectedDay}
                    onChange={handleDayChange}
                    className="w-1/3 p-2 border font-bold text-black rounded-md shadow-sm"
                >
                    <option value="">Day</option>
                    {days.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>

                <select
                    id="monthSelect"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="w-1/3 p-2 border font-bold text-black rounded-md shadow-sm"
                >
                    <option value="">Select...</option>
                    {months.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>


                <select
                    id="yearSelect"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="w-1/3 p-2 border font-bold text-black rounded-md shadow-sm"
                >

                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>


        </div>
    );
};

export default DateSelector;
