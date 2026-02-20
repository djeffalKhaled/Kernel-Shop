import { useState } from "react";
import "../styles/SignupPage.css"

// @ts-ignore
function Signup({onClose}) {
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    numTel: ""
  });


  // update input values
  const handleChange = (e: any) => {
    console.log(e.target.name, e.target.value);
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
        numTel: Number(formData.numTel)   // ⭐ VERY IMPORTANT
      };

      console.log("Sending:", dataToSend);
      try {
        const response = await fetch("http://localhost:8080/api/suppliers/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

      if (response.ok) {
        console.log("Account created successfully 🎉");
        onClose(); 
      } else {
        console.log("Registration failed ❌");
      }

      } catch (error) {
        console.log("Server error", error);
      }
    } else {
        const loginData = {
        email: formData.email,
        password: formData.password
      };

      try {
        const response = await fetch("http://localhost:8080/api/suppliers/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData)
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Login success ✅", result);
          onClose(); // close form after login
        } else {
          console.log("Login failed ❌", result.error);
        }

      } catch (error) {
        console.log("Server error", error);
      }
    }
  };
  
  return (
    
        <div className = "FormBackground">
            <form className = "Form" onSubmit={handleSubmit}>  

                <button type = "submit" className="SignupButton" onClick={onClose}>Exit</button>
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

                <button type = "submit" className="SignupButton">{isRegister ? "Register" : "Login"}</button>
                  {!isRegister && (
                    <p>Don't have an account?{" "}<span className="Link" onClick={() => setIsRegister(true)}>Register</span></p>
                  )}

                  {isRegister && (
                  <p>Already have an account?{" "}<span className="Link" onClick={() => setIsRegister(false)}>Login</span></p>)}
                  <button type = "submit" className="SignupGoogle">Signup with Google</button>

            </form>
        </div>
    
  );
}

export default Signup
