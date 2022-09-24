import { Button } from 'primereact/button'

import React, { useState, useRef } from 'react'
import {Card} from "primereact/card"
import { appAxios } from '../utils/appAxios'
import { useTranslation } from 'react-i18next'
import { ConfirmDialog,confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

export default function InfoCard() {
  const [loading1, setLoading1] = useState(false);

  const {t} = useTranslation()

  const toast = useRef(null);

  const accept = () => {
      toast.current.show({ severity: 'info', summary: 'Başarılı', detail: 'İşleminizi Gerçekleştiriyoruz', life: 3000 });

    setLoading1(true);

    setTimeout(() => {
        setLoading1(false);
        appAxios.get(`/api/v1/exec`, {withCredentials: true})
        .then((res) => {
          console.log(res.data); 
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement("a")
          link.href = url;
          link.setAttribute('download', 'file.txt')
          document.body.appendChild(link)
          link.click()
        })
        .catch(err=>console.log(err));
    }, 3000);
  }

  const reject = () => {
      toast.current.show({ severity: 'warn', summary: 'İptal', detail: 'İşleminiz İptal Edildi', life: 3000 });
  }
  
  



  const writeFile = () => {



    confirmDialog({
      message: 'Bu işlemi yapmak istediğinizden emin misiniz?',
      header: 'Lisans Yazdır',
      icon: 'pi pi-exclamation-triangle',
      accept,
      reject
  });

  }




  return (
    <div>
    <ConfirmDialog />
    <Toast ref={toast} />

<div className="mt-3">
<Card title={t("cardtitle")} className='text-center border-round-xl m-auto p-1' style={{ width: '25rem', marginBottom: '2em' }}>
<p className="m-0" style={{lineHeight: '1.5'}}>{t("cardtext")}               
</p>


{/* <Button label={t("cardbtn")} className='bg-green-500 mt-3' icon="pi pi-key" loading={loading1} onClick={writeFile} /> */}

</Card>



            

    
    
</div>



    </div>
  )
}


/*



 const getLicenses = () => {
   appAxios.get(`/api/v1/license/${localStorage.getItem("bayi_id")}`, {withCredentials: true}).then((res) => {
     console.log(res.data);
     setLisanslar(res.data)
     dispatch(login(true))
   }).catch(err=>{
     console.log(err);
     notify()
     localStorage.clear()
     setTimeout(() => {
       dispatch(logout())

     }, 5000);

   })
 }






*/