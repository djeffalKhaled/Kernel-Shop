import "../styles/SignupPage.css"

// @ts-ignore
function Signup({onClose}) {
  
  return (
    <>
        <div className = "FormBackground">
            <div className = "Form">  

                <button type = "submit" className="SignupButton" onClick={onClose}>Exit</button>

                <div className = "InputVal">
                    <label htmlFor = "username">Username :</label>
                    <input type="text" id="username" name="username"></input>
                </div>   

                <div className = "InputVal">
                    <label htmlFor = "email">Email :</label>
                    <input type="email" id="email" name="email"></input>
                </div>   

                <div className = "InputVal">
                    <label htmlFor = "password">Password :</label>
                    <input type="password" id="password" name="password"></input>
                </div>   

                <button type = "submit" className="SignupButton">Submit</button>


                <button type = "submit" className="SignupGoogle">Signup with Google</button>

            </div>
        </div>
    </>
  )
}

export default Signup
