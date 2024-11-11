import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (!credentials.name || !credentials.email || !credentials.password) {
            alert("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://gofood-mern-backend-5wvd.onrender.com/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                navigate("/login");
            } else {
                alert("Error: " + (json.message || "Enter valid credentials"));
            }
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <Navbar />
            <div className='container'>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label text-light">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label text-light">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} required />
                    </div>
                    <div className="m-3">
                        <label htmlFor="password" className="form-label text-light">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' required />
                    </div>
                    <button type="submit" className="m-3 btn btn-success" disabled={loading}>Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </div>
    );
}
