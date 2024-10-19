import styles from "./Dashboard.module.css"
import { useEffect, useState } from "react";
import { getTotalAmountAPI } from "../../apis.js"

const Dashboard = () => {

    const userDetails = localStorage.getItem("user");
    const user = JSON.parse(userDetails);
    const [amount, setAmount] = useState({});

    useEffect(() => {
        if (userDetails != null) {
            const userId = user._id;
            let totalIncome = 0;
            let totalExpense = 0;
            async function fetchAmount() {
                const turnOver = await getTotalAmountAPI({ userId });
                console.log(turnOver);
                turnOver.forEach((obj) => {
                    if (obj.type == "income") {
                        totalIncome = obj.totalAmount;
                    }
                    else {
                        totalExpense = obj.totalAmount;;
                    }
                });
                console.log(totalIncome);
                console.log(totalExpense);
                let totalSavings = totalIncome - totalExpense;
                console.log(totalSavings);
                setAmount({ totalIncome, totalExpense, totalSavings });
            }
            fetchAmount();
        }
    }, []);

    return (<>
        <div className={styles.dashboard_card}>
            <div style={{ border: "1px solid blue", width: "20%", height: "15vh", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>Total Income</h3>
                <i className="fa fa-inr" aria-hidden="true">&nbsp;<span style={{ color: "green" }}>{amount.totalIncome}</span></i>
            </div>
            <div style={{ border: "1px solid blue", width: "20%", height: "15vh", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>Total Expense</h3>
                <i className="fa fa-inr" aria-hidden="true">&nbsp;<span style={{ color: "green" }}>{amount.totalExpense}</span></i>
            </div>
            <div style={{ border: "1px solid blue", width: "20%", height: "15vh", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>Total Savings</h3>
                <i className="fa fa-inr" aria-hidden="true">&nbsp;<span style={{ color: "green" }}>{amount.totalSavings}</span></i>
            </div>
            <div style={{ border: "1px solid blue", width: "20%", height: "15vh", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>Total Investment</h3>
                <i className="fa fa-inr" aria-hidden="true">&nbsp;<span style={{ color: "green" }}>0</span></i>
            </div>
        </div>
        {/* <div className={styles.chart_graph}>
            <div style={{ border: "1px solid green", height: "400px", width: "50%" }}>chart coming soon....</div>
            <div style={{ border: "1px solid green", height: "400px", width: "50%" }}>graph coming soon....</div>
        </div> */}
    </>)
}
export default Dashboard;