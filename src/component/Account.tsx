import { useEffect, useState } from "react";
import "../styles/Account.css";
import { auth } from "../config/auth"
import { useNavigate } from "react-router-dom";
import accountIcon from "../icons/account_circle.svg"

function Account({ onClose }: { onClose: () => void }) {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(auth.getUser().username || "");
    }, [auth.isLoggedIn()])
    

    function logout() {
        auth.logout();
        setUsername("");
        onClose();
    }
    return (
        <div className="Background" onClick={onClose}>
            <div className="Container">
                <div className="UserInfo">
                    <div className = "ProfilePicture">
                        <img src = {accountIcon} alt="Profile Picture"></img>
                    </div>
                    <h2>Welcome, {username}</h2>
                    <p>
                        You are logged in!
                    </p>
                    <p>
                        Your user type is {auth.getUser().type}
                    </p>
                    <button type="submit" className="SignupButton" onClick={logout}>
                       Log out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Account;