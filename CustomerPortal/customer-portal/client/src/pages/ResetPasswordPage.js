import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { appAxios } from '../utils/appAxios'


export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("")
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const toast = useRef(null); 

const myToken = window.location.pathname



useEffect(() => {
    appAxios.get(`/api/v1${myToken}`,{
 
    })
    .then((res) => {
      console.log(res.data);
      setStatus(true)
    })
    .catch(err=>{
      console.log(err);
    })
},[])


const resetpassword = () => {
     appAxios.post(`/api/v1${myToken}`,{
      newpassword: newPassword
     })
     .then((res) => {
      toast.current.show({severity:'success', summary: 'İşlem Başarılı', detail:'Parolanız Başarıyla Değiştirilmiştir.', life: 3000});
      setTimeout(() => {
        navigate("/login")
       },2500)
       console.log(res);
     })
     .catch((err) => {
      toast.current.show({severity:'warn', summary: 'İşlem Başarısız', detail:'Bilgilerinizi Kontrol Ediniz', life: 3000});
       console.log(err)

     })
}






  return (
    <div>
    <Toast ref={toast} />
 
        
{
  status ? 
  <div className="flex align-items-center justify-content-center mt-8">
      <div className="surface-card p-4 shadow-2 border-round w-6 lg:w-4">
          <div className="text-center mb-5">
              <img src="assets/images/blocks/logos/hyper.svg" alt="epati" height={50} className="mb-3" />
              <div className="text-900 text-2xl font-medium mb-3">Yeni Şifrenizi Belirleyiniz</div>
          </div>
  
          <div>
              <label htmlFor="email" className="block text-900 font-medium mb-2">Yeni Parola</label>
              <InputText onChange={(e)=> setNewPassword(e.target.value)} id="email" type="password" className="w-full mb-3" />
  
              <label htmlFor="password" className="block text-900 font-medium mb-2">Yeni Parola Tekrar</label>
              <InputText id="password" type="password" className="w-full mb-3" />
  
            
  
              <Button onClick={resetpassword} label="Onayla" icon="pi pi-check-circle" className="w-full" />
          </div>
      </div>
  </div>
  :
  <h2 className='text-center text-xl border-1 m-2 p-3 border-round-lg'>Parola Sıfırlama Linkinin Süresi Dolmuştur...</h2>
}


    </div>



  )
}
