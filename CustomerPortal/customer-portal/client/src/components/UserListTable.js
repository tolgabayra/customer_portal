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



  /* Mevcut T??m M????teriler */
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

  /* Mevcut T??m Lisanslar */
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
      toast.current.show({ severity: 'success', summary: '????lem Ba??ar??l??', detail: 'Kullan??c?? Ba??ar??yla Silindi', life: 3000 });
      console.log(res.data);
      getMusteri()
    })
    .catch(err => {
      console.log(err);
      toast.current.show({ severity: 'error', summary: '????lem Ba??ar??s??z', detail: 'Kullan??c?? Silinemedi', life: 3000 });

    })
}









   /* M????teri S??LME */
  const acceptDelete = (rowData) => {
    confirmDialog({
      message: 'Bu kullan??c??y?? Silmek ??stiyor Musunuz?',
      header: 'Kullan??c?? Silme ????lemi',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptT(rowData),
  });
  }



  /* Lisans Atama ??ste??i */
  const acceptUpdate = () => {
    const lisanslar  = []
    selectedLicenses.map(i => lisanslar.push(i.id))


    console.log("SE????L?? L??SANSLAR",lisanslar);


 
    appAxios.post(`/api/v1/admin/license/assignment`, {
      "kullanici_id": nowUserId,
      "lisanslar": lisanslar
    }, { withCredentials: true })
      .then((res) => {
        toast.current.show({ severity: 'success', summary: '????lem Ba??ar??l??', detail: 'Se??ilen Lisanslar Kullan??c??ya Ba??ar??yla Atand??', life: 3000 });
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
      <h5 className="mx-0 my-1">Kullan??c?? Listesi</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Kullan??c?? Ara..." />
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
      toast.current.show({ severity: 'success', summary: '????lem Ba??ar??l??', detail: 'Kullan??c?? Ba??ar??yla G??ncellendi', life: 3000 });
    })
    .catch(err=>{
      console.log(err);
      toast.current.show({ severity: 'error', summary: '????lem Ba??ar??s??z', detail: 'Kullan??c?? Bilgileri D??zenlenemedi.', life: 3000 });

    })

  }








  /* //TODO  Product : User De??i??en De??er G??ncellenecek    */
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
        toast.current.show({ severity: 'success', summary: '????lem Ba??ar??l??', detail: 'Kullan??c?? Eklendi', life: 3000 });
        dialogFuncMap[`${name}`](false);
        console.log(res.data);
      }).catch((err) => {
        toast.current.show({ severity: 'error', summary: '????lem Ba??ar??s??z', detail: '????leminizi Ger??ekle??tiremiyoruz', life: 3000 });
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
        <Button label='D??zenle' icon="pi pi-pencil" className="p-button-warning mr-2" onClick={() => editProduct(rowData)} />
      </React.Fragment>
    );
  }





  const reject = (name) => {
    dialogFuncMap[`${name}`](false);
    toast.current.show({ severity: 'warn', summary: '????lem ??ptal Edilmi??tir', detail: '????leminiz ??ptal Edilmi??tir', life: 3000 });

  }


  const reject2 = (name) => {
    setProductDialog(false)
    toast.current.show({ severity: 'warn', summary: '????lem ??ptal Edilmi??tir', detail: 'Kullan??c?? D??zenleme ????leminiz ??ptal Edilmi??tir', life: 3000 });

  }



    /* //! Kullan??c?? Olu??turma // */
  const renderFooter = (name) => {
    return (
      <div>

        <Button className='bg-green-600' label="Onayla" icon="pi pi-check" onClick={() => submitCreate(name)} autoFocus />
        <Button label="??ptal" icon="pi pi-times" onClick={() => reject(name)} className="p-button-text" />

      </div>
    );
  }




    /* //! Lisans Atama // */
  const licenseAssignmentFooter = (name) => {

    return (
      <div>

        <Button className='bg-green-600' label="Kaydet" icon="pi pi-check" onClick={() => acceptUpdate()} autoFocus />
        <Button label="??ptal" icon="pi pi-times" onClick={() => reject(name)} className="p-button-text" />

      </div>
    )
  }


  

  /* //! Kullan??c??y?? G??ncelle // */
  const userUpdateFooter = (name) => {
    return (
      <div>
        <Button className='bg-green-600' label="Kullan??c??y?? Kaydet" icon="pi pi-check" autoFocus onClick={()=> saveProduct(name)} />
        <Button label="??ptal" icon="pi pi-times" onClick={() => reject2(name)} className="p-button-text" />

      </div>
    )
  }




  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Dialog className='' header="Yeni Kullan??c?? Ekle" visible={displayModal} modal={false} style={{ width: '25vw' }} footer={renderFooter('displayModal')} >

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
            <Column field="isim" sortable header="M????teriler" />
            <Column field="sube" sortable header="??ube" />
            <Column field="urunadi" sortable header="??r??n" />
            <Column field="modeladi" sortable header="Model" />
            <Column field="sozlesmeBitis" header="Biti?? Tarihi" />
          </DataTable>
        </div>
      </Dialog>






      {/* Kullan??c?? D??zenle  */}
      <Dialog visible={productDialog} style={{ width: '480px' }} header="Kullanici Bilgileri" modal className="p-fluid" footer={userUpdateFooter('displayModal3')} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Ad??</label>
          <InputText id="name" value={product.ad} onChange={(e) => onInputChange(e, 'ad')} required autoFocus className="w-full mb-3 p-3" />

          <label className='mt-2' htmlFor="name">Soyad??</label>
          <InputText id="name" value={product.soyad} onChange={(e) => onInputChange(e, 'soyad')} required autoFocus className="w-full mb-3 p-3" />

          <label className='mt-2' htmlFor="name">Email</label>
          <InputText id="name" value={product.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className="w-full mb-3 p-3" />

          <label className='mt-2' htmlFor="name">Kurum</label>
          <InputText id="name" value={product.kurum} onChange={(e) => onInputChange(e, 'kurum')} required autoFocus className="w-full mb-3 p-3" />
        </div>
        <Button className='bg-green-800' label='Parolay?? S??f??rla' />
        <div className="field">
        </div>

      </Dialog>








      <Dialog header="Kullan??c?? D??zenle" style={{ width: '30vw' }} visible={displayModal3} modal={false} footer={renderFooter('displayModal3')}>
        <div>
          <label htmlFor="ad" className="block text-900 font-medium mb-2">Ad</label>
          <InputText defaultValue={musteriler} id="ad" type="text" className="w-full mb-3 p-2" />

          <label htmlFor="soyad" className="block text-900 font-medium mb-2">Soyad</label>
          <InputText defaultValue={musteriler} id="soyad" type="text" className="w-full mb-3 p-2" />

          <label htmlFor="kurum" className="block text-900 font-medium mb-2">Kurum</label>
          <InputText id="kurum" type="text" className="w-full mb-3 p-2" />

          <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
          <InputText id="email" type="text" className="w-full mb-3 p-2" />

          <label htmlFor="??ifre" className="block text-900 font-medium mb-2">??ifre</label>
          <InputText id="??ifre" type="password" className="w-full mb-3 p-2" />
        </div>

      </Dialog>





      <div className="card mt-2 p-2">
                <TabView>
                    <TabPanel header="Kullan??c?? Y??netimi">
                    <h3 className='ml-2'>Yeni Kullan??c?? Ekle</h3>
                    <Button className='p-button-raised p-button-success ml-2 mt-2' label="Yeni Ekle" icon="pi pi-plus" onClick={() => onxClick('displayModal')} />



      <DataTable className='mt-2 p-2' scrollHeight="500px" paginator rows={25} value={musteriler} size="small" showGridlines responsiveLayout="scroll" header={header} globalFilter={globalFilter} >

        <Column field="ad" header="Ad" sortable></Column>
        <Column field="soyad" header="Soyad" sortable></Column>
        <Column field="kurum" header="Kurum" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="password" body={actionBodyTemplate} header="Yetkili Lisanslar"></Column>
        <Column field="password" body={userBodyTemplate} header="Kullan??c?? ????lemleri"></Column>

      </DataTable>
  
      </TabPanel>
               

      <TabPanel header="Lisans Y??netimi">
        <LicenseListTable />
      </TabPanel>


      </TabView>
            </div>







    </div>
  )
}
