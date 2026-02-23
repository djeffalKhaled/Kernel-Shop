import { useState } from "react";
import "../styles/SignupPage.css";

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

    if (isRegister) {
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
          console.log("Account created ✅");
          onClose();
        } else {
          alert("Registration error: " + response.status);
        }
      } catch (error) {
        console.log("Server error", error);
      }
    } else {
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

        const result = await response.json();

        if (response.ok) {
          console.log("Login success ✅", result);
          onClose();
        } else {
          alert("Login error: " + result.error);
        }
      } catch (error) {
        console.log("Server error", error);
      }
    }
  };

  return (
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

          {/* user type */}
          <div className="RoleSelect">
            <label>
              <input
                type="radio"
                name="userType"
                value="clients"
                checked={userType === "clients"}
                onChange={() => setUserType("clients")}
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
          <p>
            Register with your personal details to use all features
          </p>

          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;