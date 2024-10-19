import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



const Header = () => {

    const [myaccount, setMyAccount] = useState(false);
    const [logout, setLogout] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = localStorage.getItem("user");
    const user = JSON.parse(userDetails);

    useEffect(() => {
        if (userDetails == null) {
            navigate("/");
        }
    }, []);

    const handleSlide = () => {
        if (myaccount) {
            setMyAccount(false);
        }
        else {
            setMyAccount(true);
        }
    }

    const handleLogout = () => {
        if (logout) {
            setLogout(false);
        }
        else {
            setLogout(true);
        }
    }

    const handleLogoff = () => {
        const userObj = localStorage.clear();
        alert("logged out");
        dispatch({ type: "logged out", userObj });
        navigate("/");
    }

    return (<>
        <header className={styles.header}>
            <button onClick={handleSlide} className={styles.header_comp} style={{ borderRadius: "5px", backgroundColor: "blue" }}>My account</button>
            <div className={styles.header_comp} style={{ color: "blue", fontSize: "30px" }}><b>FINANCE MANAGER</b></div>
            <button onClick={handleLogout} className={styles.header_comp} style={{ borderRadius: "5px", backgroundColor: "blue" }}>logout</button>
        </header>
        {myaccount ?
            <>
                <div className={styles.greyOverlay}></div>
                <aside className={styles.header_side}>
                    <button onClick={handleSlide} style={{ border: "none" }}><i className="fa fa-times" aria-hidden="true"></i></button>
                    <div style={{ width: "100%", margin: "5px" }}>Hello!! {user.name}</div>
                    <div style={{ border: "1px solid green", padding: "20px", cursor: "pointer" }}>Account</div>
                    <div style={{ border: "1px solid green", padding: "20px", cursor: "pointer" }}>Change password</div>
                    <div style={{ border: "1px solid green", padding: "20px", cursor: "pointer" }}>Settings</div>
                </aside>
            </>
            :
            <></>
        }
        {logout ? <>
            <div className={styles.greyOverlay}></div>
            <div className={styles.logout_card}>
                <p style={{ height: "50%", width: "100%", paddingTop: "5%", textAlign: "center", fontSize: "30px", overflow: "hidden" }}>Are you sure, want to logout?</p>
                <div style={{ height: "15%", width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-around", overflow: "hidden" }}>
                    <button onClick={handleLogoff} style={{ width: "20%", border: "none", borderRadius: "5px", backgroundColor: "blue" }}>yes</button>
                    <button onClick={handleLogout} style={{ width: "20%", border: "none", borderRadius: "5px", backgroundColor: "blue" }}>No</button>
                </div>
            </div>
        </>
            : <></>}
    </>
    )
}

export default Header