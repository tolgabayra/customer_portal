import React, { useRef, useState } from 'react'
import { appAxios } from '../utils/appAxios'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { admin_login } from '../features/authSlice'

export default function AdminLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const toast = useRef(null)


    const submitLogin = () => {
        appAxios.post("/api/v1/auth/admin_login", {
            email,
            password
        },{withCredentials: true})
        .then((res) => {
            toast.current.show({ severity: 'success', summary: 'Giriş Başarılı', detail: 'Admin Sayfasına Yönlendiriliyorsunuz...' });
            localStorage.setItem("admin", process.env.store_token)
            console.log(res);
            setTimeout(() => {
            dispatch(admin_login())
            navigate("/admin")
            }, 2000);
        })
        .catch(err => {
            console.log(err);
            toast.current.show({ severity: 'warn', summary: 'Giriş Başarısız', detail: 'Kullanıcı Adı veya Şifre Hatalı' });
        })
}




    return (
        <div>

            <div className="flex align-items-center justify-content-center m-8">
                <div className="surface-card p-4 shadow-2 border-round w-full md:w-5 lg:w-5 xl:w-3">
                    <div className="text-center mb-5">

                        <div className="text-900 text-3xl font-medium mb-2">Admin Giriş</div>
                        <Toast ref={toast} />

                    </div>

                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <InputText onChange={(e) => setEmail(e.target.value)} id="email" type="text" className="w-full mb-3 p-2" />

                        <label htmlFor="password" className="block text-900 font-medium mb-2">Şifre</label>
                        <InputText onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="w-full mb-3 p-2" />


                        <Button onClick={submitLogin} label="Giriş Yap" icon="pi pi-sign-in" className="w-full bg-indigo-400 p-2" />
                    </div>
                    <div className='text-center mt-3'>
                        <span>email: root@epati.com</span> <br/>
                        <span>parola: root</span>
                    </div>
                    

                </div>
            </div>



        </div>
    )
}
