import { Link } from "react-router-dom"
import styles from "./Navigation.module.css"

const Navigation = () => {

    return (<div className={styles.navigation}>
        <Link to="/home" style={{ textDecoration: "none", color: "blue" }}>Dashboard</Link>
        <Link to="/home/transactions" style={{ textDecoration: "none", color: "blue" }}>Transactions</Link>
        {/* <Link to="/home/budget" style={{ textDecoration: "none", color: "blue" }}>Budget</Link>
        <Link to="/home/investment" style={{ textDecoration: "none", color: "blue" }}>Investment</Link> */}
    </div >)
}

export default Navigation