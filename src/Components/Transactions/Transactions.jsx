import styles from "./Transactions.module.css"
import { useState, } from "react";
import { getTransactionsAPI, transactionAPI, getTransYearFilterAPI, getTransYearMonthFilterAPI, getTransCustomFilterAPI, transactionUpdateAPI, transactionDeleteAPI } from "../../apis.js"
import { useDispatch, useSelector } from "react-redux";
import { Transactiontable } from "./Transactiontable.jsx"

const initialState = {
    amount: '',
    type: '',
    category: '',
    date: '',
    others: '',
};

const Transactions = () => {

    const [addTransaction, setAddTransaction] = useState(false);
    const [rangeFilter, setRangeFilter] = useState("");
    const [formData, setFormData] = useState(initialState);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [fromdate, setFromDate] = useState("");
    const [todate, setToDate] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    //const appreducer = useSelector((state) => state.appReducer);

    //console.log(appreducer.transactions);

    const user = JSON.parse(localStorage.getItem("user"));
    //const transactions = appreducer.transactions;

    const { amount, type, category, date, others } = formData;
    let userId

    if (user != null) {
        userId = user._id;
    }

    const currentYear = new Date().getFullYear();

    // Generate an array of years (e.g., from 1990 to the current year)
    const years = [];
    for (let year = 1990; year <= currentYear; year++) {
        years.push(year);
    }

    const months = [
        '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12'
    ];


    const handleTransaction = () => {
        if (addTransaction) {
            setFormData(initialState);
            setUpdate(false);
            setAddTransaction(false);
        }
        else {
            setAddTransaction(true)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const updateTransaction = (formData) => {
        setFormData(formData);
        handleTransaction();
        setUpdate(true);
    }

    const deleteTransaction = async (transactionDetails) => {
        console.log(transactionDetails);
        try {
            const { msg } = await transactionDeleteAPI(transactionDetails);
            const transactions = await getTransactionsAPI(userId);
            alert(msg);
            setTransactions([]);
            setYear("");
            setMonth("");
            setFromDate("");
            setToDate("");
            setRangeFilter("");
            dispatch({ type: "transaction deleted", transactions })
        }
        catch (e) {
            alert(e.message);
        }
    }

    const handleRangeFilter = (e) => {
        setRangeFilter(e.target.value);
        if (e.target.value == "") {
            setTransactions([]);
            setYear("");
            setMonth("");
            setFromDate("");
            setToDate("");
        }
        else if (e.target.value == "custom") {
            setTransactions([]);
            setYear("");
            setMonth("");
        }
        else if (e.target.value == "year") {
            setTransactions([]);
            setFromDate("");
            setToDate("");
            setMonth("");
        }
        else if (e.target.value == "month") {
            setTransactions([]);
            setFromDate("");
            setToDate("");
            setYear("");
        }
    }

    const handleYearChange = async (e) => {
        setYear(e.target.value);
        setFromDate("");
        setToDate("");
        const year = e.target.value;
        const details = { year, userId };
        try {
            const transactions = await getTransYearFilterAPI(details);
            setTransactions(transactions);
        }
        catch (e) {
            alert(e.message);
        }
    }

    const handleMonthChange = async (e) => {
        if (year == "") {
            alert("Enter Year");
            setMonth("")
        }
        else {
            setMonth(e.target.value);
            setFromDate("");
            setToDate("");
            const month = e.target.value;
            const details = { year, month, userId };
            try {
                const transactions = await getTransYearMonthFilterAPI(details);
                setTransactions(transactions);
            }
            catch (e) {
                alert(e.message);
            }
        }
    }


    const handleFromDateChange = async (e) => {
        setFromDate(e.target.value);
        setYear("");
        setMonth("");
        if (todate != "" && todate < e.target.value) {
            setTransactions([]);
            alert("from date should lesser that to date");
        }
        else if (todate != "") {
            const fromdate = e.target.value;
            const details = { fromdate, todate, userId };
            try {
                const transactions = await getTransCustomFilterAPI(details);
                setTransactions(transactions);
            }
            catch (e) {
                alert(e.message);
            }
        }
    }

    const handleToDateChange = async (e) => {
        setToDate(e.target.value);
        setYear("");
        setMonth("");
        if (e.target.value >= fromdate) {
            const todate = e.target.value;
            const details = { fromdate, todate, userId };
            try {
                const transactions = await getTransCustomFilterAPI(details);
                setTransactions(transactions);
            }
            catch (e) {
                alert(e.message);
            }
        }
        else {
            setTransactions([]);
            alert("to date should greater than from date");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        if (update) {
            const { msg } = await transactionUpdateAPI(formData);
            const transactions = await getTransactionsAPI(userId);
            alert(msg);
            handleTransaction();
            setTransactions([]);
            setYear("");
            setMonth("");
            setFromDate("");
            setToDate("");
            setRangeFilter("");
            dispatch({ type: "transaction updated", transactions })
        }
        else {
            const transDetailsWithUserId = { ...formData, userId }
            try {
                const { msg } = await transactionAPI(transDetailsWithUserId);
                const transactions = await getTransactionsAPI(userId);
                alert(msg);
                setFormData(initialState);
                setRangeFilter("");
                setTransactions([]);
                setYear("");
                setMonth("");
                setFromDate("");
                setToDate("");
                dispatch({ type: "transaction added", transactions })
            }
            catch (e) {
                alert(e.message);
            }
        }
    };


    return (<>
        <div className={styles.transaction}>
            <div className="mb-1">
                <label htmlFor="range filter" className="form-label">Range Filter</label>
                <select
                    className="form-control"
                    id="range filter"
                    name="range filter"
                    value={rangeFilter}
                    onChange={handleRangeFilter}
                    required
                >
                    <option value="">Select Filter</option>
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            {rangeFilter == "year" || rangeFilter == "month" ?
                <div className="mb-1">
                    <label htmlFor="year" className="form-label">Year</label>
                    <select
                        className="form-control"
                        id="year"
                        name="year"
                        value={year}
                        onChange={handleYearChange}
                        required
                    >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div> : <></>}
            {rangeFilter == "month" ?
                <div className="mb-1">
                    <label htmlFor="month" className="form-label">Month</label>
                    <select
                        className="form-control"
                        id="month"
                        name="month"
                        value={month}
                        onChange={handleMonthChange}
                        required
                    >
                        <option value="">Select Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div> : <></>}
            {rangeFilter == "custom" ? <>
                <div className="mb-1">
                    <label htmlFor="fromdate" className="form-label">From Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fromdate"
                        name="fromdate"
                        value={fromdate}
                        onChange={handleFromDateChange}
                        required
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="todate" className="form-label">To Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="todate"
                        name="todate"
                        value={todate}
                        onChange={handleToDateChange}
                        required
                    />
                </div></> : <></>}
            <button onClick={handleTransaction} className={styles.trans_but}>Add Transactions</button>
        </div>
        {addTransaction ? <>
            <div className={styles.greyOverlay}></div>
            <div className={styles.trans_card}>
                <button style={{ margin: "2px", border: "none" }} onClick={handleTransaction}><i className="fa fa-times" aria-hidden="true"></i></button>
                <div className="container mt-1">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card" style={{ border: "none" }}>
                                <div className="card-body">
                                    <h3 className="card-title text-center mb-2">Transaction Form</h3>
                                    <form onSubmit={handleSubmit}>

                                        {/* Amount Field */}
                                        <div className="mb-2">
                                            <label htmlFor="amount" className="form-label">Amount (<i className="fa fa-inr" aria-hidden="true"></i>)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="amount"
                                                name="amount"
                                                value={amount}
                                                onChange={handleChange}
                                                placeholder="Enter amount"
                                                required
                                            />
                                        </div>

                                        {/* Type Field */}
                                        <div className="mb-2">
                                            <label htmlFor="type" className="form-label">Type</label>
                                            <select
                                                className="form-control"
                                                id="type"
                                                name="type"
                                                value={type}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Type</option>
                                                <option value="income">Income</option>
                                                <option value="expense">Expense</option>
                                            </select>
                                        </div>

                                        {/* Category Field */}
                                        <div className="mb-2">
                                            <label htmlFor="category" className="form-label">Category</label>
                                            <select
                                                className="form-control"
                                                id="category"
                                                name="category"
                                                value={category}
                                                onChange={handleChange}
                                                required
                                                disabled={!type}  // Disable category if type is not selected
                                            >
                                                <option value="">Select Category</option>
                                                {type === 'income' ? <>
                                                    <option value="salary">Salary</option>
                                                    <option value="business">Business</option>
                                                    <option value="investment">Investment</option>
                                                    <option value="freelance">Freelance</option>
                                                    <option value="savings">Savings</option>
                                                    <option value="others">Others</option>
                                                </>
                                                    : <></>
                                                }
                                                {type === 'expense' ? <>
                                                    <option value="rent">Rent</option>
                                                    <option value="groceries">Groceries</option>
                                                    <option value="entertainment">Entertainment</option>
                                                    <option value="travel">Travel</option>
                                                    <option value="medical">Medical</option>
                                                    <option value="fee">Fee</option>
                                                    <option value="tax">Tax</option>
                                                    <option value="others">Others</option>
                                                </>
                                                    : <></>
                                                }
                                            </select>
                                        </div>

                                        {/* Others Field */}
                                        {category === "others" ?
                                            <div className="mb-2">
                                                <label htmlFor="others" className="form-label">Others</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="others"
                                                    name="others"
                                                    value={others}
                                                    onChange={handleChange}
                                                    placeholder="Details"
                                                    required
                                                />
                                            </div> : <></>}

                                        {/* Date Field */}
                                        <div className="mb-2">
                                            <label htmlFor="date" className="form-label">Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="date"
                                                name="date"
                                                value={date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>


                                        {/* Submit Button */}
                                        <button type="submit" className="btn btn-primary w-100">{update ? <span>Update</span> : <span>Submit</span>}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> : <></>}
        {transactions.length > 0 ? <>
            <div style={{ width: "100%", textAlign: "center", color: "black" }}>Transaction details</div>
            <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid green", textAlign: "center", backgroundColor: "lightseagreen" }}>Type</th>
                            <th style={{ border: "1px solid green", textAlign: "center", backgroundColor: "lightseagreen" }}>Category</th>
                            <th style={{ border: "1px solid green", textAlign: "center", backgroundColor: "lightseagreen" }}>Amount</th>
                            <th style={{ border: "1px solid green", textAlign: "center", backgroundColor: "lightseagreen" }}>Date</th>
                            <th style={{ border: "1px solid green", textAlign: "center", backgroundColor: "lightseagreen" }}>Action</th>
                        </tr>
                    </thead>
                    {transactions.map((transaction) => {
                        return (<Transactiontable
                            key={transaction._id}
                            transactionDetails={transaction}
                            updateTransaction={updateTransaction}
                            deleteTransaction={deleteTransaction}
                        />)
                    })}
                </table>
            </div>
        </> :
            <p style={{ textAlign: "center", margin: "20px" }}> Please select Range filter to view list of Transactions</p>}
    </>)
}
export default Transactions;