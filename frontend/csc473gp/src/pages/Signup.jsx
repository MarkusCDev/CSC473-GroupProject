import React, {useState} from 'react'
import { useUserAuth } from '../components/UserAuthentication'
import { useNavigate, Link } from "react-router-dom"
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import logo from '../assets/logo.png'
import axios from "axios"


const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signUp} = useUserAuth()
    const navigate = useNavigate()
    const [confirmPwd, setconfirmPwd] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const passwordValidation = validatePassword(password)
        if (!passwordValidation.valid) {
          setError(passwordValidation.message)
        return
        }
        try {
            await signUp(email, password)
            //await addUserdata()
            await addBackEndData()
            navigate("/")
          } catch (err) {
            console.log(err)
          }
      }

      const addUserdata = async () => {
        try {
          await setDoc(doc(db, "Users", email), {
            email,
            fname: "",
            lname: "",
            address: "",
            cart: [],
            balance: 0,
          });
          console.log("Document added successfully")
        } catch (error) {
          console.log("Sign In Error:", error)
        }
      }

      const addBackEndData = async () => {
        try {
          // Make an API call to create user profile
          const response = await axios.post(
            `${import.meta.env.VITE_APP_CLOUD_API_URL}/profile/create_profile`,
            {
              email: email,
              cart: [],
              transactions: [],
              selling: [],
              trading: [],
              auctions: []
            },
            {
              headers: {
                Authorization: `${email}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          console.log("Profile created:", response.data);
    
          navigate("/");
        } catch (error) {
          setError("Error creating profile. Please try again.");
          console.error(error);
        }
      }

      const validatePassword = (password) => {
        const hasLowercase = /[a-z]/.test(password)
        const hasUppercase = /[A-Z]/.test(password)
        const hasNumber = /\d/.test(password)
        const hasSpecial = /[@$!%*?&]/.test(password)
        const isAtLeast8Chars = password.length >= 8
      
        let missingChars = [];
        if (!hasLowercase) missingChars.push("lowercase letter")
        if (!hasUppercase) missingChars.push("uppercase letter")
        if (!hasNumber) missingChars.push("number")
        if (!hasSpecial) missingChars.push("special character (@$!%*?&)");
        if (!isAtLeast8Chars) missingChars.push("minimum length of 8 characters")
      
        return missingChars.length === 0 
          ? { valid: true, message: "" } 
          : { valid: false, message: "Missing: " + missingChars.join(", ") }
      }
    

  return (
    <div className='flex min-h-screen bg-gradient-to-b from-stone-300 to-stone-500 items-center justify-center px-4 mt-2 sm:px-6 lg:px-8'>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto bg-white rounded-lg p-5">

        <p className='text-center font-bold text-xl'><h1>Sign Up</h1></p>
        {/* SignUp Form */}
        <form onSubmit={handleSubmit}>
          {/* Error Message */}
          <div className="text-center text-red-500 mb-3">{error}</div>

          {/* Username Input */}
          <div>
            <label className="block mb-2" htmlFor="username">
              Username/Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
              name="username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                name="password"
              />
              <button
                type="button"
                className="flex items-center absolute top-0 right-0 mt-3 mr-4 p-0.25 rounded"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaklEQVR4nO2YS0tVURTHf2CRkNpjkmaPWegogug7lIpGo4j6LEWYWlE0CZr0+AI26YGE6cRhRAQV2iBBSYKbllEidE9sWcL1cvY+e51z7tVg/WCBiP/12HuftdcWDMMwDMMwjP+B3U3SNIRWYAi4CfTm0PeK1vnYwzZwELgGfAe+AMcK+DoOzIuvq8ABmsB+YAT4CSTAGnCyBL+nxFcC/ACGJVZDuAQsSbBNcytYFm6Ha31/BS6W6H/j2LyqC+KsArQHdIPANPBLbAoYCPx9B7CcEmei4NHdYEjObpJi9wO6UY8mkWPj44FHU5GFUbMLuAtUAwn5VncwoNm0/hzaKnAHaIktYh/wMiKZox79dIT2daCDJRn2Qo5hkC7gfYSzRO6QNFYjtK7rpdEaGfsd0ElgNeYiHSWBD71IIe2K+LNpTaBLWYSzE55kpiK0kx5tjzKH2fqdmVE6SKSjpTEQoe3zaC/kyGOmaCEP8TMc0F0P6J4ULeQQ8EnpoCIdzke/dKdVscnATiAjybIyh4+S+xa6gc9KR6HLTcuYMvac5JyK++jfKpz9AU6XUMQZ8ZVE2pu0nainwzNb+WwBOFKgCHexLiriTWTMeFtokcn2b6TzRVnVPOP7fGSMKnAv76vyPLCiOGYjGQ2g9sMeq3mDZNlKoN1H427854qtd9PyIwnsLrg2sR5ZmMfK7vSsjDG+/qJbUHaWIrYEXKGBb/Xbyg6jtd/ArWa93bvlvx/aCyzrSI4Ch9kG2mT73ftlPUfy6/K+uAzsZYfgijoH3ACeAh+Ab9KZ1uRn97txmQjO7qTkDcMwDMMwDLz8A0oKJQWhP1MnAAAAAElFTkSuQmCC"
                      alt="Eye Icon"
                      className="h-6 w-6  mr-2"
                    />
                    <span className="">Hide</span>
                  </>
                ) : (
                  <>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nO3UP2oCQRTH8Y9FDpBsQq5gFSSXsRQ7ixwjdYpAIJ2NeoBcQCxtPISFShJIkRTRJmHhFcvinwFXsNgvPBjmzfx+b2YeQ01NlWQRJ9MZYXGkyV1oDLYlmxgeYdDGD+ahtZcHPOM6QfgGffxhgtuUanrYREWvaJXyDdzjCd9Y4xEXEsmPuMJXbM6r+8QUsxjnc7+xZpVyLUXxZTxWE1fo4gUfeI/r6+CysH6ZYpKVxMuMI8oUTfY2SRadtKuS8Q6DKrrwoEElvEWc/XdSUyOdf16GMBUdhzIFAAAAAElFTkSuQmCC"
                      alt="Eye Icon"
                      className="h-6 w-6 mr-2"
                    />
                    <span className="">Show</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              className="block mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPwd}
                onChange={(e) => setconfirmPwd(e.target.value)}
                className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                name="confirmPassword"
              />
              <button
                type="button"
                className="flex items-center absolute top-0 right-0 mt-3 mr-4 p-0.25 rounded"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaklEQVR4nO2YS0tVURTHf2CRkNpjkmaPWegogug7lIpGo4j6LEWYWlE0CZr0+AI26YGE6cRhRAQV2iBBSYKbllEidE9sWcL1cvY+e51z7tVg/WCBiP/12HuftdcWDMMwDMMwjP+B3U3SNIRWYAi4CfTm0PeK1vnYwzZwELgGfAe+AMcK+DoOzIuvq8ABmsB+YAT4CSTAGnCyBL+nxFcC/ACGJVZDuAQsSbBNcytYFm6Ha31/BS6W6H/j2LyqC+KsArQHdIPANPBLbAoYCPx9B7CcEmei4NHdYEjObpJi9wO6UY8mkWPj44FHU5GFUbMLuAtUAwn5VncwoNm0/hzaKnAHaIktYh/wMiKZox79dIT2daCDJRn2Qo5hkC7gfYSzRO6QNFYjtK7rpdEaGfsd0ElgNeYiHSWBD71IIe2K+LNpTaBLWYSzE55kpiK0kx5tjzKH2fqdmVE6SKSjpTEQoe3zaC/kyGOmaCEP8TMc0F0P6J4ULeQQ8EnpoCIdzke/dKdVscnATiAjybIyh4+S+xa6gc9KR6HLTcuYMvac5JyK++jfKpz9AU6XUMQZ8ZVE2pu0nainwzNb+WwBOFKgCHexLiriTWTMeFtokcn2b6TzRVnVPOP7fGSMKnAv76vyPLCiOGYjGQ2g9sMeq3mDZNlKoN1H427854qtd9PyIwnsLrg2sR5ZmMfK7vSsjDG+/qJbUHaWIrYEXKGBb/Xbyg6jtd/ArWa93bvlvx/aCyzrSI4Ch9kG2mT73ftlPUfy6/K+uAzsZYfgijoH3ACeAh+Ab9KZ1uRn97txmQjO7qTkDcMwDMMwDLz8A0oKJQWhP1MnAAAAAElFTkSuQmCC"
                      alt="Eye Icon"
                      className="h-6 w-6 mr-2"
                    />
                    <span className="">Hide</span>
                  </>
                ) : (
                  <>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nO3UP2oCQRTH8Y9FDpBsQq5gFSSXsRQ7ixwjdYpAIJ2NeoBcQCxtPISFShJIkRTRJmHhFcvinwFXsNgvPBjmzfx+b2YeQ01NlWQRJ9MZYXGkyV1oDLYlmxgeYdDGD+ahtZcHPOM6QfgGffxhgtuUanrYREWvaJXyDdzjCd9Y4xEXEsmPuMJXbM6r+8QUsxjnc7+xZpVyLUXxZTxWE1fo4gUfeI/r6+CysH6ZYpKVxMuMI8oUTfY2SRadtKuS8Q6DKrrwoEElvEWc/XdSUyOdf16GMBUdhzIFAAAAAElFTkSuQmCC"
                      alt="Eye Icon"
                      className="h-6 w-6 mr-2"
                    />
                    <span className="">Show</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {!passwordsMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}

          {/* SignUp Button */}
          <button className="w-full bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded transition-colors duration-300" type="submit">Sign up</button>
        </form>

        {/* Login Link */}
        <div className="text-center">
            <Link className="text-blue-700 hover:text-purple-700 text-sm" to="/login">Already have an Account? Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup