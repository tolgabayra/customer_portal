import React, { useRef, useState } from 'react'
import UserListTable from '../components/UserListTable'
import LisansLine from '../components/LisansLine';
import OptionLine from '../components/OptionLine';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { appAxios } from '../utils/appAxios';
import { Toast } from 'primereact/toast';


export default function Admin() {

const toast = useRef(null); 
const navigate = useNavigate()
const [lisanslar, setLisanslar] = useState("")
const [kullanicilar, setKullanicilar] = useState("")


const logout = () => {
    appAxios.post("api/v1/auth/logout")
    .then((res) => {
      toast.current.show({severity: 'success', summary: 'Çıkış Başarılı', detail: 'Login sayfasına yönlendiriliyorsunuz...'});
      console.log(res.data);
      setTimeout(() => {
        localStorage.clear()
        navigate("/admin_login")
      },2000)

    })
    .catch(err=>console.log(err))

}



const getLicensesNumber = () => {
  appAxios.get('api/v1/admin/totallicenses')
  .then((res) => {
    console.log(res.data);

  })
}


 
    
  return (
    <div>
              <Toast ref={toast} />

        <div className="grid h-screen">
        <div className="col-2 bg-gray-900 border-round-lg">
        <h2 className='text-white text-center mt-4 pb-3'>Admin Yönetim Paneli</h2>
        <hr />

        <div className='text-white text-center'>
            <span className=' mt-3 ml-2'>
             <p className=''>root@epati.com</p>
            </span>
        </div>
    </div>
    <div className="col-10 bg-gray-300">
        <div className="grid">
          
            <div className="col-12 bg-gray-800 p-4 flex justify-content-end">
             <div className=''>
             <Button onClick={logout} label='Çıkış Yap' className="bg-gray-500 border-white" aria-label="Cancel" />

             </div>
            </div>
            <div className="col-12 bg-gray-300">

                
            <div className="grid p-2">
    <div className="col-12 md:col-6 lg:col-4">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Lisanslar</span>
                    <div className="text-900 font-medium text-xl">152</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-key text-blue-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">24 new </span>
            <span className="text-500">since last visit</span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-4">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Şubeler</span>
                    <div className="text-900 font-medium text-xl">$2.100</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">%52+ </span>
            <span className="text-500">since last week</span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-4">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Müşteriler</span>
                    <div className="text-900 font-medium text-xl">28441</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">520  </span>
            <span className="text-500">newly registered</span>
        </div>
    </div>
 
</div>         

                <div>
                <UserListTable />
                </div>



                <div className='flex'>
                    
             
{/* 

                <div className='m-2 w-6 bg-gray-100 p-2 border-round-lg mt-5'>
                <LisansLine />
                </div>


                <div className='m-2 w-6 bg-gray-100 p-2 border-round-lg mt-5'>
                <OptionLine />
                </div> */}


                </div>
            </div>

            <div className="card flex justify-content-center">
        </div>
            {/* <div className="col-6 bg-gray-300">
                <h3>Lisans Yönetimi</h3>
            </div> */}
        </div>
    </div>
   
</div>
    </div>
  )
}
