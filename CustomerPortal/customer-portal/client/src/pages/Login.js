import React, { useRef, useState } from 'react'
import {appAxios} from "../utils/appAxios"
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {useDispatch} from "react-redux"
import {login} from "../features/authSlice"
import {Button} from "primereact/button"
import "../i18n"
import {InputText} from "primereact/inputtext"
import { Toast } from 'primereact/toast';


export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [loading1, setLoading1] = useState(false);

  const {t, i18n} = useTranslation()
  const toast = useRef(null)
  const dispatch = useDispatch()



const submitLogin = () => {
  setLoading1(true)
  appAxios.post("/api/v1/auth/login",{
    email,
    password
  },{withCredentials: true})
  .then((res) => {
    toast.current.show({ severity: 'success', summary: 'Giriş Başarılı', detail: 'Lisans Portal Sayfasına Yönlendiriliyorsunuz...' });
    setTimeout(() => {
      setLoading1(false)
      dispatch(login())
      navigate("/home")

    }, 1500)
    localStorage.setItem("email", res.data.userdata.email)
    localStorage.setItem("user_id", res.data.userdata.id)
    localStorage.setItem("bayi_id", res.data.userdata.id)
  }).catch(err=>{
    if(err.response.status === 404){
      setLoading1(false)
      setErr("Email ya da şifreniz yanlış!")
      toast.current.show({severity: 'warn', summary: 'Giriş Başarısız', detail: 'Kullanıcı Adı veya Şifre Hatalı'});
    }else{
      setLoading1(false)
      toast.current.show({severity: 'error', summary: 'Giriş Başarısız', detail: 'Yanlış İşlem Yaptınız'});
    }

  })
}

const changeLanguage = () => {
  
  i18n.changeLanguage("en")
}

const changeLanguage2 = () => {
  i18n.changeLanguage("tr")
}



  return (
  <div>

<div className="flex align-items-center justify-content-center m-8">
    <div className="surface-card p-4 shadow-2 border-round w-full md:w-5 lg:w-5 xl:w-3">
        <div className="text-center mb-5">

            <div className="text-800 text-3xl font-medium mb-2">{t("userlogin")}</div>
            <Toast ref={toast} />

        </div>

        <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText onChange={(e)=>setEmail(e.target.value)} id="email" type="text" className="w-full mb-3 p-2" />

            <label htmlFor="password" className="block text-900 font-medium mb-2">{t("password")}</label>
            <InputText onChange={(e)=>setPassword(e.target.value)} id="password" type="password" className="w-full mb-3 p-2 " />

           
            <Button loading={loading1} onClick={submitLogin} label={t("loginbtn")} icon="pi pi-sign-in" className="w-full bg-indigo-400 p-2 hover:bg-indigo-500" />
        </div>
        <div className='text-center mt-2'>Dil Seçiniz:  <button className='w-1 mr-1 border-transparent bg-gray-600 border-round-sm text-50 cursor-pointer hover:bg-gray-500' onClick={changeLanguage}>en</button>
         
            <button className='w-1 border-transparent bg-gray-600 border-round-sm text-50 cursor-pointer hover:bg-gray-500' onClick={changeLanguage2}>tr</button> </div>
            <div className='mt-4 text-center'>
              <p>gamze@gmail.com   123123</p>

              <Link className='no-underline'  to='/forgetpassword' >Şifremi Unuttum ?</Link>
            </div>
    </div>
</div>

  </div>
  )
}
