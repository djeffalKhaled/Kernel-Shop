import { useState } from "react";
import "../styles/SignupPage.css";
import { createPortal } from "react-dom";

function Signup({ onClose }: { onClose: () => void }) {
    const [isRegister, setIsRegister] = useState(false);
    const [userType, setUserType] = useState("clients");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        numTel: "",
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (isRegister) { // registration
            const dataToSend = {
                ...formData,
                numTel: Number(formData.numTel),
            };

            try {
                const response = await fetch(
                    `http://localhost:8080/api/${userType}/register`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(dataToSend),
                    }
                );

                if (response.ok) {
                    console.log("Account created");
                    onClose();
                } else {
                    alert("Registration error: " + response.status);
                }
            } catch (error) {
                console.log("Server error", error);
            }
        } else { // login
            const loginData = {
                email: formData.email,
                password: formData.password,
            };

            try {
                const response = await fetch(
                    `http://localhost:8080/api/${userType}/login`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(loginData),
                    }
                );
                if (!response.ok) {
                    const errorText = await response.text();
                    alert("Login error: " + errorText);
                    return; 
                }

                const result = await response.json();
                console.log("Login success", result);

                localStorage.setItem("userid", result.id.toString());
                localStorage.setItem("type", userType);
                localStorage.setItem("username", result.username);
                localStorage.setItem("token", result.token);

                onClose();
            } catch (error) {
                console.log("Server error", error);
            }
        }
    };

    return createPortal(
        <div className="FormBackground" onClick={onClose}>
            <div
                className={`FormContainer ${isRegister ? "register-mode" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <form className="FormLeft" onSubmit={handleSubmit}>
                    <button className="CloseX" onClick={onClose}>
                        ×
                    </button>

                    <h1 className="FormTitle">
                        {isRegister ? "Sign Up" : "Sign In"}
                    </h1>

                    {isRegister && (
                        <>
                            <div className="InputVal">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="InputVal">
                                <input
                                    type="number"
                                    name="numTel"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="InputVal">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="InputVal">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="RoleSelect">
                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="clients"
                                checked={userType === "clients"}
                                onChange={() => setUserType("clients")}
                                required
                            />
                            Client
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="suppliers"
                                checked={userType === "suppliers"}
                                onChange={() => setUserType("suppliers")}
                                required
                            />
                            Supplier
                        </label>
                    </div>

                    <button type="submit" className="SignupButton">
                        {isRegister ? "Register" : "Sign In"}
                    </button>
                </form>

                <div className="FormRight">
                    <h2>Welcome, Friend!</h2>
                    <p className="FormRightText" style={{ marginBottom: "20px" }}>
                        Register with your personal details to use all features
                    </p>

                    <button onClick={() => setIsRegister(!isRegister)} className="SignupButton">
                        {isRegister ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Signup;