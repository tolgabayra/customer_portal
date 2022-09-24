import { Route, Routes } from "react-router-dom";


import "primereact/resources/themes/md-light-deeppurple/theme.css";  //theme
//import "primereact/resources/themes/saga-green/theme.css"
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css'



import { useSelector } from "react-redux"



import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound"
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgetPassword from "./pages/ForgetPassword";
import AdminLogin from "./pages/AdminLogin";




const ProtectedRoute = ()=>{
  const user = useSelector((state)=> state.auth.user)
  console.log(user);
 if(!user){
  return <Login />
 }

 return <Home />
}


const ProtectedRoute2 = () => {
  const user = useSelector((state)=> state.auth.adminuser)
  if(!user){
    return <AdminLogin />
  }
  return <Admin />
}




function App() {
  

  
  return (
    <div>




      <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/admin_login" element={<AdminLogin />} />


       <Route element={<ProtectedRoute2 />}>
       <Route path="/admin" element = {<Admin />} />
       </Route>


        {/* Bu routerlar private olucak!!!!! */}
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset_password/:token" element={<ResetPasswordPage />} />



        <Route element={<ProtectedRoute/>}>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />}/>
        </Route> 
        <Route path="*" element={<Notfound />} />


      </Routes>

    </div>
  );
}

export default App;
