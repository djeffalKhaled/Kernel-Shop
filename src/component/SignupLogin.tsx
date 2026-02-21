import { useState } from "react";
import "../styles/SignupPage.css"

// @ts-ignore
function Signup({onClose}) {
    const [isRegister, setIsRegister] = useState(false);
    const [userType, setUserType] = useState(""); 

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        numTel: ""
    });


    // updates input values
    const handleChange = (e: any) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    // submit register
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (isRegister) {
            const dataToSend = {
                ...formData,
                numTel: Number(formData.numTel)  
            };

            console.log("Sending:", dataToSend);
            try {
                const response = await fetch("http://localhost:8080/api/" + userType + "/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    console.log("Account created : ", formData);
                    onClose(); 
                } else {
                    alert("Registration error : " + response.status);
                }

            } catch (error) {
                console.log("Server error", error);
            }
        } 
        else {
            const loginData = {
                email: formData.email,
                password: formData.password
            };
            try {
                const response = await fetch("http://localhost:8080/api/" + userType + "/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginData)
                });
            
                const result = await response.json();
                if (response.ok) {
                    console.log("Login success", result);
                    onClose(); // close form after login
                } else {
                    alert("Login error : " +  result.error);
                }
            } 
            catch (error) {
                console.log("Server error", error);
            }
        }
    };

    return (
    <div className = "FormBackground">
        <form className = "Form" onSubmit={handleSubmit}>              
            {isRegister && (
            <>
                <div className = "InputVal">
                    <label htmlFor = "username">Username :</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}required></input>
                </div>
                <div className = "InputVal">
                    <label htmlFor = "numTel">Phone Number :</label>
                    <input type="number" id="numTel" name="numTel"  onChange={handleChange} required></input>
                </div>   
            </>)}
            <div className = "InputVal">
                <label htmlFor = "email">Email :</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required></input>
            </div>   
            <div className = "InputVal">
                <label htmlFor = "password">Password :</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required></input>
            </div> 

            <div className = "UserType">
                <label>
                    <input type="radio" name="userType" value="Client" onChange = {() => setUserType("clients")}/>
                    Client
                </label>
                <label>
                    <input type="radio" name="userType" value="Supplier" onChange = {() => setUserType("suppliers")}/>
                    Supplier
                </label>
            </div>
                
            <button type = "submit" className="SignupButton">{isRegister ? "Register" : "Login"}</button>
            
            {!isRegister && (
                <div>
                    Don't have an account? {"    "}
                    <a onClick = {() => setIsRegister(true)}>Register</a>
                </div>
            )}
            {isRegister && (
                <div>
                    Already have an account? {"    "}
                    <a onClick = {() => setIsRegister(false)}>Login</a>
                </div>
            )}

            <button type = "button" className="SignupButton" onClick={onClose}>Exit</button>
        </form>
    </div>
    );
}

export default Signup
