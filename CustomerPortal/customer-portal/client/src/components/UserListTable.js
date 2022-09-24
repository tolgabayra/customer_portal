import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { appAxios } from '../utils/appAxios'
import { Dialog } from "primereact/dialog"
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext"
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { TabView, TabPanel } from 'primereact/tabview';
import LicenseListTable from './LicenseListTable'



export default function UserListTable() {

  // user
  let emptyProduct = {
    id: null,
    ad: '',
    soyad: '',
    email: null,
    kurum: '',
    password: null

  };


  const [selectedLicenses, setSelectedLicenses] = useState([])
  const [defaultSelectedLicenses, setDefaultLicenses] = useState(null)

  const [musteriler, setMusteriler] = useState([])
  const navigate = useNavigate()
  const [displayModal, setDisplayModal] = useState(false);
  const [displayModal2, setDisplayModal2] = useState(false);
  const [displayModal3, setDisplayModal3] = useState(false);

  const [lisanslar, setLisanslar] = useState([])
  const [position, setPosition] = useState('center');
  const [displayPosition, setDisplayPosition] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [nowUserId, setNowUserId] = useState("")



  const [selectAll, setSelectAll] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);


  const toast = useRef(null);


  const [ad, setAd] = useState("")
  const [soyad, setSoyad] = useState("")
  const [kurum, setKurum] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const dialogFuncMap = {

    'displayModal': setDisplayModal,
    'displayModal2': setDisplayModal2,
    'displayModal3': setDisplayModal3,
    'displayPosition': setDisplayPosition,

  }

  const onxClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  }


  useEffect(() => {
    console.log(musteriler);
  },[musteriler])


  useEffect(() => {
    getMusteri()
    getLicenses()
  }, [])



  /* Mevcut Tüm Müşteriler */
  const getMusteri = () => {
    appAxios.get(`/api/v1/admin/user`, { withCredentials: true })
      .then((res) => {
        setMusteriler(res.data)
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        navigate("/login")
      })

  }

  /* Mevcut Tüm Lisanslar */
  const getLicenses = () => {
    appAxios.get("/api/v1/admin/license", { withCredentials: true })
      .then((res) => {
        setLisanslar(res.data)
        console.log(res.data);
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  }



const acceptT = (rowData) => {
  console.log(rowData);
  appAxios.delete(`/api/v1/admin/user/${rowData.id}`, { withCredentials: true })
    .then((res) => {
      toast.current.show({ severity: 'success', summary: 'İşlem Başarılı', detail: 'Kullanıcı Başarıyla Silindi', life: 3000 });
      console.log(res.data);
      getMusteri()
    })
    .catch(err => {
      console.log(err);
      toast.current.show({ severity: 'error', summary: 'İşlem Başarısız', detail: 'Kullanıcı Silinemedi', life: 3000 });

    })
}









   /* Müşteri SİLME */
  const acceptDelete = (rowData) => {
    confirmDialog({
      message: 'Bu kullanıcıyı Silmek İstiyor Musunuz?',
      header: 'Kullanıcı Silme İşlemi',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptT(rowData),
  });
  }



  /* Lisans Atama İsteği */
  const acceptUpdate = () => {
    const lisanslar  = []
    selectedLicenses.map(i => lisanslar.push(i.id))


    console.log("SEÇİLİ LİSANSLAR",lisanslar);


 
    appAxios.post(`/api/v1/admin/license/assignment`, {
      "kullanici_id": nowUserId,
      "lisanslar": lisanslar
    }, { withCredentials: true })
      .then((res) => {
        toast.current.show({ severity: 'success', summary: 'İşlem Başarılı', detail: 'Seçilen Lisanslar Kullanıcıya Başarıyla Atandı', life: 3000 });
        getMusteri()
        setDisplayModal2(false)
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

      



  }





  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
    console.log("USER:",product);
  }



  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  }


  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Kullanıcı Listesi</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Kullanıcı Ara..." />
      </span>
    </div>
  );





  const saveProduct = (name) => {
    setSubmitted(true);
    console.log("SAVE PRODUCT",product);
    
    appAxios.put(`/api/v1/admin/user/${product.id}`,{
      ad: product.ad,
      soyad: product.soyad,
      kurum: product.kurum,
      email: product.email,
      password: product.password
    })
    .then((res) => {
      setProductDialog(false)
      getMusteri()
      console.log(res);
      toast.current.show({ severity: 'success', summary: 'İşlem Başarılı', detail: 'Kullanıcı Başarıyla Güncellendi', life: 3000 });
    })
    .catch(err=>{
      console.log(err);
      toast.current.show({ severity: 'error', summary: 'İşlem Başarısız', detail: 'Kullanıcı Bilgileri Düzenlenemedi.', life: 3000 });

    })

  }








  /* //TODO  Product : User Değişen Değer Güncellenecek    */
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;
     
    console.log("CHANGE", _product);
    setProduct(_product);
  }







  const submitCreate = (name) => {
    appAxios.post("/api/v1/admin/user/create", {
      email,
      password,
      ad,
      soyad,
      kurum
    }, { withCredentials: true })
      .then((res) => {
        getMusteri()
        toast.current.show({ severity: 'success', summary: 'İşlem Başarılı', detail: 'Kullanıcı Eklendi', life: 3000 });
        dialogFuncMap[`${name}`](false);
        console.log(res.data);
      }).catch((err) => {
        toast.current.show({ severity: 'error', summary: 'İşlem Başarısız', detail: 'İşleminizi Gerçekleştiremiyoruz', life: 3000 });
        console.log(err);

      })

  }






 
  const userLicenses = (rowData) => {
    console.log(rowData);
    const klisanslar = rowData.klisanslar
    onxClick('displayModal2')
    //acceptUpdate(rowData)
    setSelectedLicenses(klisanslar)
    setNowUserId(rowData.id) 
  }



  


  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button label='Lisanslar' icon="pi pi-book" className="p-button-secondary mr-2" onClick={() => userLicenses(rowData)} />
      </React.Fragment>
    );
  }


  const userBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button label='Sil' icon="pi pi-trash" className=" p-button-danger mr-2" onClick={() => acceptDelete(rowData)} />
        <Button label='Düzenle' icon="pi pi-pencil" className="p-button-warning mr-2" onClick={() => editProduct(rowData)} />
      </React.Fragment>
    );
  }





  const reject = (name) => {
    dialogFuncMap[`${name}`](false);
    toast.current.show({ severity: 'warn', summary: 'İşlem İptal Edilmiştir', detail: 'İşleminiz İptal Edilmiştir', life: 3000 });

  }


  const reject2 = (name) => {
    setProductDialog(false)
    toast.current.show({ severity: 'warn', summary: 'İşlem İptal Edilmiştir', detail: 'Kullanıcı Düzenleme İşleminiz İptal Edilmiştir', life: 3000 });

  }



    /* //! Kullanıcı Oluşturma // */
  const renderFooter = (name) => {
    return (
      <div>

        <Button className='bg-green-600' label="Onayla" icon="pi pi-check" onClick={() => submitCreate(name)} autoFocus />
        <Button label="İptal" icon="pi pi-times" onClick={() => reject(name)} className="p-button-text" />

      </div>
    );
  }




    /* //! Lisans Atama // */
  const licenseAssignmentFooter = (name) => {

    return (
      <div>

        <Button className='bg-green-600' label="Kaydet" icon="pi pi-check" onClick={() => acceptUpdate()} autoFocus />
        <Button label="İptal" icon="pi pi-times" onClick={() => reject(name)} className="p-button-text" />

      </div>
    )
  }


  

  /* //! Kullanıcıyı Güncelle // */
  const userUpdateFooter = (name) => {
    return (
      <div>
        <Button className='bg-green-600' label="Kullanıcıyı Kaydet" icon="pi pi-check" autoFocus onClick={()=> saveProduct(name)} />
        <Button label="İptal" icon="pi pi-times" onClick={() => reject2(name)} className="p-button-text" />

      </div>
    )
  }




  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Dialog className='' header="Yeni Kullanıcı Ekle" visible={displayModal} modal={false} style={{ width: '25vw' }} footer={renderFooter('displayModal')} >

        <div>
          <label htmlFor="ad" className="block text-900 font-medium mb-2">Ad</label>
          <InputText onChange={(e) => setAd(e.target.value)} id="ad" type="text" className="w-full mb-3 p-3" />

          <label htmlFor="soyad" className="block text-900 font-medium mb-2">Soyad</label>
          <InputText onChange={(e) => setSoyad(e.target.value)} id="soyad" type="text" className="w-full mb-3 p-3" />

          <label htmlFor="kurum" className="block text-900 font-medium mb-2">Kurum</label>
          <InputText onChange={(e) => setKurum(e.target.value)} id="kurum" type="text" className="w-full mb-3 p-3" />

          <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
          <InputText onChange={(e) => setEmail(e.target.value)} id="email" type="text" className="w-full mb-3 p-3" />

          <label htmlFor="password" className="block text-900 font-medium mb-2">Parola</label>
          <InputText onChange={(e) => setPassword(e.target.value)} id="email" type="password" className="w-full mb-3 p-3" />

        </div>

      </Dialog>





      {/* Lisans Listesi - Lisans Atama          selection={[{id: 2}]}         */}
      <Dialog header="Lisans Listesi" visible={displayModal2} modal={false} style={{ width: '80vw', height: '60vw' }} footer={licenseAssignmentFooter('displayModal2')}>
        <div className="card">
          <DataTable value={lisanslar} selection={selectedLicenses} onSelectionChange={(e) => setSelectedLicenses(e.value)} responsiveLayout="scroll" dataKey="id"
            paginator rows={10}
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
            <Column field="id" header="Id" sortable />
            <Column field="anahtar" sortable header="Anahtar" />
            <Column field="isim" sortable header="Müşteriler" />
            <Column field="sube" sortable header="Şube" />
            <Column field="urunadi" sortable header="Ürün" />
            <Column field="modeladi" sortable header="Model" />
            <Column field="sozlesmeBitis" header="Bitiş Tarihi" />
          </DataTable>
        </div>
      </Dialog>






      {/* Kullanıcı Düzenle  */}
      <Dialog visible={productDialog} style={{ width: '480px' }} header="Kullanici Bilgileri" modal className="p-fluid" footer={userUpdateFooter('displayModal3')} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Adı</label>
          <InputText id="name" value={product.ad} onChange={(e) => onInputChange(e, 'ad')} required autoFocus className="w-full mb-3 p-3" />

          <label className='mt-2' htmlFor="name">Soyadı</label>
          <InputText id="name" value={product.soyad} onChange={(e) => onInputChange(e, 'soyad')} required autoFocus className="w-full mb-3 p-3" />

          <label className='mt-2' htmlFor="name">Email</label>
          <InputText id="name" value={product.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className="w-full mb-3 p-3" />

          <label className='mt-2' htmlFor="name">Kurum</label>
          <InputText id="name" value={product.kurum} onChange={(e) => onInputChange(e, 'kurum')} required autoFocus className="w-full mb-3 p-3" />
        </div>
        <Button className='bg-green-800' label='Parolayı Sıfırla' />
        <div className="field">
        </div>

      </Dialog>








      <Dialog header="Kullanıcı Düzenle" style={{ width: '30vw' }} visible={displayModal3} modal={false} footer={renderFooter('displayModal3')}>
        <div>
          <label htmlFor="ad" className="block text-900 font-medium mb-2">Ad</label>
          <InputText defaultValue={musteriler} id="ad" type="text" className="w-full mb-3 p-2" />

          <label htmlFor="soyad" className="block text-900 font-medium mb-2">Soyad</label>
          <InputText defaultValue={musteriler} id="soyad" type="text" className="w-full mb-3 p-2" />

          <label htmlFor="kurum" className="block text-900 font-medium mb-2">Kurum</label>
          <InputText id="kurum" type="text" className="w-full mb-3 p-2" />

          <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
          <InputText id="email" type="text" className="w-full mb-3 p-2" />

          <label htmlFor="şifre" className="block text-900 font-medium mb-2">Şifre</label>
          <InputText id="şifre" type="password" className="w-full mb-3 p-2" />
        </div>

      </Dialog>





      <div className="card mt-2 p-2">
                <TabView>
                    <TabPanel header="Kullanıcı Yönetimi">
                    <h3 className='ml-2'>Yeni Kullanıcı Ekle</h3>
                    <Button className='p-button-raised p-button-success ml-2 mt-2' label="Yeni Ekle" icon="pi pi-plus" onClick={() => onxClick('displayModal')} />



      <DataTable className='mt-2 p-2' scrollHeight="500px" paginator rows={25} value={musteriler} size="small" showGridlines responsiveLayout="scroll" header={header} globalFilter={globalFilter} >

        <Column field="ad" header="Ad" sortable></Column>
        <Column field="soyad" header="Soyad" sortable></Column>
        <Column field="kurum" header="Kurum" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="password" body={actionBodyTemplate} header="Yetkili Lisanslar"></Column>
        <Column field="password" body={userBodyTemplate} header="Kullanıcı İşlemleri"></Column>

      </DataTable>
  
      </TabPanel>
               

      <TabPanel header="Lisans Yönetimi">
        <LicenseListTable />
      </TabPanel>


      </TabView>
            </div>







    </div>
  )
}
