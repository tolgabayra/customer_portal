import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import {Password} from "primereact/password"
import React, { useRef, useState } from 'react'
import { appAxios } from '../utils/appAxios'
import { Link, useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider'

export default function ResetPassword() {
  const [oldpassword, setOldPassword] = useState("")
  const [newpassword, setNewPassword] = useState("")
  const [new2password, setNew2Password] = useState("")
  const navigate = useNavigate()
  const toast = useRef(null); 






const submitPassword = () => {
  appAxios.post(`/api/v1/user/resetpassword/${localStorage.getItem("user_id")}`,{
    oldpassword,
    newpassword,
  },{withCredentials: true})
  .then((res) => {
    console.log(res.data);
    toast.current.show({severity: 'success', summary: 'Şifreniz Başarıyla Değiştirilmiştir.', detail: 'Login sayfasına yönlendiriliyorsunuz...'});
    localStorage.clear()

     setTimeout(() => {
      navigate("/login")
     },2500)
  })
  .catch(err=>{
    toast.current.show({severity:'warn', summary: 'İşlem Başarısız', detail:'Bilgilerinizi Kontrol Ediniz', life: 3000});
    console.log(err);
  })
}


const header = <h6>Güçlü Bir Parola Giriniz</h6>;
const footer = (
    <React.Fragment>
        <Divider />
        <p className="mt-2">Öneri</p>
        <ul className="pl-2 ml-2 mt-0" style={{lineHeight: '1.5'}}>
            <li>En az bir küçük harf</li>
            <li>En az bir büyük harf</li>
            <li>En az bir rakam</li>
            <li>Minimum 8 karakter</li>
        </ul>
    </React.Fragment>
);





  return (
    <div>
        <Toast ref={toast} />

        <div className="flex align-items-center justify-content-center m-8">
        <div className="text-center mb-5">

        </div>

        <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2 mt-3">Eski Şifreniz</label>
            <Password onChange={(e)=>setOldPassword(e.target.value)} className='' feedback={false} toggleMask />

            <label htmlFor="password" className="block text-900 font-medium mb-2 mt-3">Yeni Şifreniz</label>
            <Password onChange={(e)=>setNewPassword(e.target.value)} toggleMask header={header} footer={footer} />


            <label htmlFor="password" className="block text-900 font-medium mb-2 mt-3">Yeni Şifre Tekrarı</label>
            <Password onChange={(e)=> setNew2Password(e.target.value)} toggleMask header={header} footer={footer} />

            <Button onClick={submitPassword} label='Onayla' icon="pi pi-check-circle" className="w-5 bg-green-400 p-2 mt-3" />
             

             <div className='mt-4'>
             <Link to="/" >Anasayfaya Dön</Link>

             </div>
        </div>
  
</div>



    </div>
  )
}
