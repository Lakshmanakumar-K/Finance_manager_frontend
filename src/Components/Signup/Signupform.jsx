import { useState } from 'react';
import { signUpAPI } from "../../apis.js"
import { useDispatch } from 'react-redux';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, phone, password, confirmPassword } = formData;
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(Number(phone))) {

            alert("Enter only number in phone number field");
            return;
        }
        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Submit form data (e.g., send to backend)
        console.log('Form submitted:', formData);
        try {
            const res = await signUpAPI(formData);
            alert(res);
            dispatch({ type: "user registered" });
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
                            <h3 className="card-title text-center mb-4">Sign Up</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
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
                                        value={password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
