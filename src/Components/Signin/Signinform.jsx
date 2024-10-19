import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInAPI, getTransactionsAPI } from '../../apis';

const SigninForm = () => {

    const [formState, setFormstate] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    const handleRegistration = () => {
        //console.log("Sign up clicked");
        dispatch({ type: "to register new user" });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormstate({ ...formState, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can handle the form submission (e.g., authentication logic)
        console.log(formState);
        try {
            const { msg, userObj, token } = await signInAPI(formState);
            localStorage.setItem("user", JSON.stringify(userObj));
            localStorage.setItem("token", token);
            const transactions = await getTransactionsAPI(userObj._id);
            alert(msg);
            dispatch({ type: "user logged in", userObj, transactions, });
        }
        catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="container mt-5" style={{
            borderLeft: "3px solid green", paddingTop: "5%", paddingBottom: "5%"
        }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                            <div onClick={handleRegistration} style={{ marginTop: "20px", textAlign: "center", cursor: "pointer", color: 'blue', fontSize: "15px" }}>Signup</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SigninForm;
