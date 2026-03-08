import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./App.css"
function App() {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")
  const [error, setError] = useState(false)

  function handelemail(evt) {
    setemail(evt.target.value)
  }
  function handelpass(evt) {
    setpass(evt.target.value)
  }
  function check() {
    try {
      if (email.trim() === "" || pass.trim() === "") {
        throw new Error("Empty fields")
      }

      axios.get(`https://login-backend-lqe2.onrender.com/login?Email=${email}&Password=${pass}`)
        .then(res => {
          if (res.data === true) {
            navigate("/Success")
          } else {
            navigate("/Fail")
          }
        })
        .catch(err => {
          setError("Server connection failed. Please try again")
          console.error(err)
        })
    } catch (err) {
      setError("Email and Password cannot be empty")
      console.error(err)
    }
  }
  return (
    <div className="heading">
      <div className="logoinbox">
        <h1 className="logo">NETFLIX</h1>
        <h2>SIGN IN</h2>
        <input onChange={handelemail} name="Email" placeholder=" Email"></input>
        <input type="password" onChange={handelpass} name="Password" placeholder=" Password"></input>
        <button onClick={check}>Sign in</button>
        {error && (
          <p className="error">Please try again!</p>
        )}
      </div>
    </div>


  )
}
export default App
