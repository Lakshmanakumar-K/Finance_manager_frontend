import styles from "./Login.module.css"
import Signinform from "../../Components/Signin/Signinform.jsx"
import Signupform from "../../Components/Signup/Signupform.jsx"
import { useSelector } from "react-redux"
//import { Home } from "../Home/Home.jsx"
import { useNavigate } from "react-router-dom"
//import { useEffect, useState } from "react"

export const Login = () => {

    const appReducer = useSelector((state) => state.appReducer);

    const navigate = useNavigate();

    //const [register, setRegister] = useState(appReducer.registered);

    // useEffect(() => {

    //     setRegister(appReducer.registered);

    // }, [appReducer.registered]);

    return (<>
        {console.log(appReducer.registered)}
        {console.log(appReducer.loggedin)}
        <div className={styles.login}>
            <div className={styles.image} >
                <img src="https://img.freepik.com/free-vector/financial-management-isometric-composition-with-3d-budget-planning-money-symbols-dark-background-vector-illustration_1284-73166.jpg" width="100%" height="100%" />
            </div>
            <div className={styles.loginform}>
                {appReducer.registered ? <>{appReducer.loggedin ? navigate("/home") : <Signinform />}</> : <Signupform />}
            </div>
        </div>
    </>)
}