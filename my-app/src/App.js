import "./App.css";
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Navcomponents/Home";
import Profile from "./Components/Navcomponents/Profile";
import Blogs from "./Components/Blogspage/Blogs";
import Signup from "./Components/Navcomponents/Signup";
import { useState, useEffect} from "react";
import axios from "axios";
import Login from "./Components/Navcomponents/Login";
import Userprofilemain from "./Components/Userprofilepage/Userprofilemain";


function App() {
  //useNavigate instance for navigating pages
  const navigate = useNavigate()
  const [isLogin,setIsLogin]=useState("false")

  const [data, setData] = useState([]); //for blogs page
  // useEffect(() => {
  //   fetch("http://localhost:5000/Blogs", {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       return res.json()}
  //     )
  //     .then((data) => {
  //       console.log(data, "userdata");
  //       setData(data);
  //     });
  // }, []);

  const [categories, setCategories] = useState([
    "Web Dev",
    "Machine Learning",
    "Computer Networks",
    "NLP",
    "Cloud",
  ]);
  const defaultData = {
    name: "",
    uname: "",
    pswd: "",
    cpswd: "",
    phonenumber: "",
    email: "",
  }
  const [formdata, setFormdata] = useState(defaultData);

  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false); //flag for signup 
  //const latestformvalues = useRef(formdata);
 
  const onChangeHandeler = (e) => {
    //e.preventDefault();

    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
    // console.log(formdata);
  };
  

  const onSubmitHandler =async (e) => {
    e.preventDefault();
    const errors =validate(formdata)
    setFormErrors(errors || {});
    console.log("No.of formerrors"+Object.keys(errors).length);
    
    if(Object.keys(errors).length===0){
      setIsSubmit(true);
      const res = await axios.post("http://localhost:5000/signup", formdata);
    // console.log(res.data);
    
    if (res.data.includes("ok")) {
      navigate("/userprofile");
      //alert("SIgn up successful")
    } else {
      alert(res.data)
    }
  }
    };
     //user has clicked submit!'
    // fetch("http://localhost:5000/signup",{
    //   method: "POST",
    //   headers: {'Content-Type': 'application/json'},
    //   body:JSON.stringify(formdata)
    // })


  //   const res = await axios.post("http://localhost:5000/signup", formdata);
  //   // console.log(res.data);
  //   if (res.data.includes("ok")) {
  //     alert("SIgn up successful")
  //   } else {
  //     alert(res.data)
  //   }
  // }

  useEffect(()=>{
    console.log(formErrors);
    if(formErrors && Object.keys(formErrors).length===0 && isSubmit){
      //latestformvalues.current= formdata;
      console.log(formdata);
    }
  },[formErrors,isSubmit,formdata]); //when any change in formErrors

  const validate = (values)=>{
    const errors = {}
    const pswdmatch = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!values.name){
      errors.name = "Name is required!"
    }
    if(values.name.length<4){
      errors.name = "Name length is leses than 4"
    }
    /*if(values.pswd.length<6){
      errors.pswd = "Password less"
    }*/
    if(values.uname.length<4){
      errors.uname="User Name is less than 4 characters"
    }
    if(!values.email.match(emailRegex)){
      errors.email = "Not a valid email"
    }
    if(!values.pswd.match(pswdmatch)){
      errors.pswd = "Ïnvalid password"
    }
    console.log("confirm password is"+values.cpswd);
    if(values.pswd !== values.cpswd){
      errors.cpswd = "Confirm and Password are not same"
    }
    return errors;
  }

  //login form Handling
  const [loginData,setLoginData] = useState({
    username:"",
    password:"",
  });
  const onChangeLogin= (e) =>{
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
  })
  }
  const handleLogin = async(e)=>{
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/login", loginData);
    // .then()
    console.log(res.data);
   // const isLogin = res.data.status;
   
    if(res.data.status==="ok"){
      alert("successfuly logged in");
      setIsLogin("true");
    }
    else{
      alert(res.data.error);
    }
    
     
    // if (res.includes("ok")) {
    //   alert("Login successful")
    // } else {
    //   alert(res.data)
    }
    //console.log(loginData);
    

    
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Blogs"
            element={
              <Blogs
                data={data}
                setData={setData}
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          <Route path="/userprofile" element={<Userprofilemain />} />
          <Route
            path="/signup"
            element={
              <Signup
                formdata={formdata}
                formErrors={formErrors}
                setFormdata={setFormdata}
                onChangeHandeler={onChangeHandeler}
                onSubmitHandler={onSubmitHandler}
              />
            }
          />
          <Route 
          path="/login"
          element={
            <Login 
            handleLogin={handleLogin}
            onChangeLogin={onChangeLogin}
            isLogin={isLogin}
             />
          }/>
             

          {/*404*/}
          <Route
            path="*"
            element={
              <h2 style={{ "text-align": "center" }}>Error 404 not found.</h2>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
