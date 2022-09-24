import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { appAxios } from '../utils/appAxios'
import { ToastContainer, toast } from 'react-toastify';
import { Toast } from 'primereact/toast';

import 'react-toastify/dist/ReactToastify.css';
import { login } from "../features/authSlice"
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./Home.css"
import InfoCard from '../components/InfoCard';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import "../i18n"
import { classNames } from 'primereact/utils';


export default function Home() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const { t, i18n } = useTranslation()
  const toast = useRef(null); 




  // const notify = () => toast.error("Oturum süreniz dolmuştur...");
  // const logoutnotify = () => toast.success("Çıkış Başarılı", {
  //   position: toast.POSITION.TOP_CENTER
  // });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [lisanslar, setLisanslar] = useState([])
  //const token = useSelector((state)=>state.auth.token)

  useEffect(() => {    
    getLicenses()
    setInterval(() => {
      getLicenses()
    }, 5000);

  }, [])





  const changeLanguage = () => {

    i18n.changeLanguage("en")
  }

  const changeLanguage2 = () => {
    i18n.changeLanguage("tr")
  }






  const getLicenses = () => {
    appAxios.get(`/api/v1/license/${localStorage.getItem("bayi_id")}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setLisanslar(res.data)
      dispatch(login(true))
    }).catch(err => {
      console.log(err);
      toast.current.show({severity: 'error', summary: 'Oturum Süreniz Dolmuştur', detail: 'Çıkış ekranına yönlendiriliyorsunuz'});
      localStorage.clear()
      setTimeout(() => {
        dispatch(logout())

      }, 5000);

    })
  }

  axios.interceptors.response.use(response => {
    return response;
  }, function (err) {
    if (err.response.status === 401) {
      dispatch(logout())
    }
    return Promise.reject(err.response.data)
  })





   const getAllLicenses = () => {
     appAxios.get("/api/v1/license/")
     .then((res) => {
       console.log(res.data);
       setLisanslar(res.data)
       dispatch(login(true))
     })
     .catch(err=>{
       console.log(err);
       // notify()
       //  localStorage.clear()
       //   setTimeout(() => {
       //   dispatch(logout())
       
       //  }, 5500);
     });
   }


  const acceptLicense = (rowData) => {
    setLoading2(true)
    toast.current.show({ severity: 'success', summary: 'İşlem Başarılı', detail: 'Lisans Güncelleme Paketiniz İndiriliyor...', life: 3000 });
    setTimeout(() => {
      setLoading2(false)
      console.log(rowData.jeton_id);
      appAxios.get(`/api/v1/exec/license/${rowData.jeton_id}`, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement("a")
          link.href = url;
          link.setAttribute('download', 'license.txt')
          document.body.appendChild(link)
          link.click()
        })
        .catch(err => console.log(err))
    }, 3000)


  }




  const acceptSoftware = (rowData) => {
    setLoading1(true)
    toast.current.show({ severity: 'success', summary: 'İşlem Başarılı', detail: 'Yazılım Güncelleme Paketiniz İndiriliyor...', life: 3000 });

    setTimeout(() => {
      setLoading1(false)
      console.log(rowData.jeton_id);
      appAxios.get(`/api/v1/exec/software/${rowData.jeton_id}`, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement("a")
          link.href = url;
          link.setAttribute('download', 'software.txt')
          document.body.appendChild(link)
          link.click()
        })
        .catch(err => console.log(err))

    }, 3000)

  }


  const acceptDatabase = (rowData) => {
    setLoading3(true)
    toast.current.show({ severity: 'success', summary: 'İşlem Başarılı', detail: 'Veritabanı Güncelleme Paketiniz İndiriliyor...', life: 3000 });

    setTimeout(() => {
      setLoading3(false)
      console.log(rowData.jeton_id);
      appAxios.get(`/api/v1/exec/database/${rowData.jeton_id}`, {withCredentials: true})
        .then((res) => {
          console.log(res.data);
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement("a")
          link.href = url;
          link.setAttribute('download', 'database.txt')
          document.body.appendChild(link)
          link.click()
        })
        .catch(err=>console.log(err))


    }, 3000);


 
  }












  const logout = () => {
    appAxios.post("api/v1/auth/logout").then((res) => {
      console.log(res);
      localStorage.clear()
      toast.current.show({severity: 'success', summary: 'Çıkış Başarılı', detail: 'Login sayfasına yönlendiriliyorsunuz...'});
      setTimeout(() => {
        navigate("/login")
        window.location.reload()
      }, 2000);
    }).catch(err => {
      console.log(err);
    })
  }


  const formatCurrency = (value) => {
    const date = new Date(value)
    return date.toLocaleString()
  }


  const dateBodyTemplate = (rowData) => {
    return formatCurrency(rowData.sozlesmeBaslama)
  }



  const stockBodyTemplate = (rowData) => {
    const stockClassName = classNames({
      'outofstock': rowData.host_id.length < 50,

    });

    return (
      <div className={stockClassName}>
        {rowData.host_id}
      </div>
    );
  }



  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {
          rowData.jeton_id ? <Button  label='Yazılım' icon="pi pi-arrow-circle-down" className=" p-button-success mr-2" onClick={() => acceptSoftware(rowData)} /> : <Button disabled label='Yazılım' icon="pi pi-arrow-circle-down" className=" p-button-success mr-2" onClick={() => acceptSoftware(rowData)} />            
        }
        {
          rowData.jeton_id ? <Button label='Lisans' icon="pi pi-arrow-circle-down" className=" p-button-warning" onClick={() => acceptLicense(rowData)} /> : <Button disabled label='Lisans' icon="pi pi-arrow-circle-down" className=" p-button-warning" onClick={() => acceptLicense(rowData)} />
        }
        {
          rowData.jeton_id ? <Button label='Veritabanı' icon="pi pi-arrow-circle-down" className=" p-button-info  ml-2" onClick={() => acceptDatabase(rowData)} /> : <Button disabled label='Veritabanı' icon="pi pi-arrow-circle-down" className=" p-button-info ml-2" onClick={() => acceptDatabase(rowData)} />
        }
        
      </React.Fragment>
    );
  }



  return (
    <div className=''>


      <Toast ref={toast} />

      <ToastContainer />


      <div className="flex justify-content-center ">

        <div className="bg-gray-200 w-12 ">

          <header className="fixed w-12 text-white text-center bg-indigo-500 p-3 border-round-md flex justify-content-between">
            <h2><a href='/home' className='text-white no-underline'>{t("headertitle")} </a></h2>
            <aside > <label className='text-gray-400'>{t("headerwelcome")}</label>; {localStorage.getItem("email")}</aside>
            <div className='pl-4'>
            <Link className='text-white' to="/resetpassword">Şifre Değiştir</Link>


              <div className='inline-block pr-3 ml-3'>

                <button className='p-1 mr-1 border-transparent bg-gray-500 border-round-sm text-50 cursor-pointer hover:bg-gray-400 pl-2' onClick={changeLanguage}>en</button> 
                <button className='p-1 mr-1 pl-2 border-transparent bg-gray-500 border-round-sm text-50 cursor-pointer hover:bg-gray-400 ' onClick={changeLanguage2}>tr</button>

              </div>
              






              <Button onClick={logout} label={t("logoutbtn")} className="border-0 hover:bg-indigo-200 bg-indigo-300 align-content-end " aria-label="Cancel" />

            </div>
          </header>

          <main className="m-4 pt-8 h-screen">
            <div class="content">
              <InfoCard />

              <div className="flex align-items-center pt-5">
                {/* <FileUpload chooseOptions={{ label: 'CSV', icon: 'pi pi-file' }} mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" className="mr-2" />
                    <FileUpload chooseOptions={{ label: 'Excel', icon: 'pi pi-file-excel', className: 'p-button-success' }} mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="mr-2"  /> */}
              </div>


              <div className="card mt-2 p-2 border-round-md datatable-style-demo">
                <DataTable  scrollHeight="600px" groupRowsBy="anahtar" rowGroupMode="rowspan" showGridlines className='w-8 m-auto border-round-md' size='small' header={t("licensetabletitle")} value={lisanslar} responsiveLayout="scroll" sortable>
                <Column header="#" headerStyle={{ width: '3em' }} body={(data, options) => options.rowIndex + 1}></Column>
                  <Column field="urun" className='' style={{width:'12%'}} header={t("productname")} sortable></Column>
                  <Column field="model" header="Modeli" sortable ></Column>
                  <Column field="anahtar" style={{width:'27%'}} className='text-center' header={t("licensekey")} ></Column>
                  <Column field="sozlesmeBaslama" style={{width:'17%'}} body={dateBodyTemplate} header={t("startdate")} sortable></Column>
                  <Column field="sozlesmeBitis" style={{width:'18%'}} body={dateBodyTemplate} header={t("enddate")} sortable></Column>
                  <Column field="host_id" style={{width:'100%'}} header="Aktif Host" className='' body={stockBodyTemplate} sortable></Column>
                  <Column header="Çevrimdışı Guncelleme" className='text-center' field="" body={actionBodyTemplate} exportable={false} style={{ minWidth: '26rem' }}></Column>
                </DataTable>
              </div>

            </div>
            <aside>




            </aside>
          </main>
          <footer className="bg-indigo-500 text-white mt-6 p-2 text-center">© 2006-2022 ePati Siber Güvenlik</footer>
        </div>


      </div>







    </div>
  )
}
