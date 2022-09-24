import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { appAxios } from '../utils/appAxios'
import { Toast } from 'primereact/toast'
import { Message } from 'primereact/message';


export default function ForgetPassword() {
    const navigate = useNavigate()
    const [loading1, setLoading1] = useState(false);
    const [email , setEmail] = useState("")
    const [statu, setStatu] = useState(false)
    const toast = useRef(null)






    const submitResetLink = () => {
      setLoading1(true)
      appAxios.post("/api/v1/reset_password",{
        email
      })
      .then((res) => {
        console.log(res.data);
        toast.current.show({severity: 'success', summary: 'İşlem Başarılı', detail: 'Parola Sıfırlama Bağlantınız Mail Adresinize Gönderilmiştir...'});
        setStatu(true)
        setLoading1(false)
        setTimeout(() => {
          //navigate("/login")
        },4000)

      })
      .catch(err =>{
        setLoading1(false)
        console.log(err);
        toast.current.show({severity: 'warn', summary: 'İşlem Başarısız', detail: 'Parola Sıfırlama İşleminizi Gerçekleştiremiyoruz...'});

      })
    }

  return (
    <div>

<Toast ref={toast} />

{
  statu ? 
  <div className='grid'>

  <Message className='col-12 p-4' severity="success" text="İşlem Başarılı ... Mail Adresinizi Kontrol Ediniz" /> 
  <Link className='col-12 text-center mt-2' to="/login">Giriş Ekranına Geri Dön</Link> 
  </div>

  :
  <div className="flex align-items-center justify-content-center mt-8">
  <div className="surface-card p-4 shadow-2 border-round w-5 lg:w-3">
      <div className="text-center mb-5">
          <img src="assets/images/blocks/logos/hyper.svg" alt="epati" height={50} className="mb-3" />
          <div className="text-900 text-2xl font-medium mb-3">Parolanızı mı unuttunuz ?</div>
      </div>

      <div>
          <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
          <InputText id="email" type="email" className="w-full mb-3" onChange={(e)=> setEmail(e.target.value)} />


        

          <Button onClick={submitResetLink}  label="Parola Sıfırlama Bağlantısını Gönder" loading={loading1} icon="pi pi-check-circle" className="w-full" />
      </div>
      <div className='mt-4 text-center'>

      <Link to="/login" >Giriş Ekranına Geri Dön</Link>
      </div>

  </div>
</div>
}



    </div>
  )
}
