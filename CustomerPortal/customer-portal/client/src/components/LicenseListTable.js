import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'
import { appAxios } from '../utils/appAxios'
import { Dialog } from 'primereact/dialog';
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { Toast } from 'primereact/toast'


export default function LicenseListTable() {


  let emptyProduct = {
    sozlesmeBitis: ""
  }
  const [date1, setDate1] = useState(null);
  const [product, setProduct] = useState(emptyProduct);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState('center');
  const [licenses, setLicenses] = useState([])
  const toast = useRef(null);


  useEffect(() => {
    getAllLicenses()
  }, [])


  const getAllLicenses = () => {
    appAxios.get("/api/v1/admin/license",{withCredentials: true})
      .then((res) => {
        console.log(res.data);
        setLicenses(res.data)
      })
      .catch(err => console.log(err))

  }




  const saveProduct = (name) => {
    console.log("SAVE PRODUCT:::::::::::::::::::",name);
    console.log("SAVE PRODUCT",product);
    
    appAxios.put(`/api/v1/admin/license/${product.id}`,{
      sozlesmeBitis: product.sozlesmeBitis,
    })
    .then((res) => {
      setDisplayBasic(false)
      getAllLicenses()
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


  const formatCurrency = (value) => {
    const date = new Date(value)
    return date.toLocaleString()
  }

  const dateBodyTemplate = (rowData) => {
    return formatCurrency(rowData.sozlesmeBitis)
  }




  const dialogFuncMap = {
    'displayBasic': setDisplayBasic
  }


  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
    if (position) {
      setPosition(position);
    }
  }


  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }





  const editProduct = (product) => {
    setProduct({ ...product });
    onClick('displayBasic')
    console.log("USER:",product.sozlesmeBitis);
  }



  const renderFooter = (name) => {
    return (
      <div className='flex mt-2'>
        <Button label="Kaydet" icon="pi pi-check" onClick={() => saveProduct(name)} autoFocus />
        <Button label="İptal" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />

      </div>
    );
  }




  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button label='Bitiş Tarihi Düzenle' icon="pi pi-pencil" className="p-button-warning mr-2" onClick={() => editProduct(rowData)} />
      </React.Fragment>
    );
  }



  return (
    <div>
      <Toast ref={toast} />


      <Dialog header="Bitiş Tarihi Düzenle" visible={displayBasic} style={{ width: '14vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
        <div>
        <InputText className='p-3' id="basic" value={product.sozlesmeBitis} onChange={(e) => onInputChange(e, 'sozlesmeBitis')}  />
        </div>
      </Dialog>


      <div className="card">

        <DataTable value={licenses} showGridlines responsiveLayout="scroll" size='small'>

          <Column header="#" headerStyle={{ width: '3em' }} body={(data, options) => options.rowIndex + 1}></Column>
          <Column field="urunadi" header="Ürün Adı"></Column>
          <Column field="modeladi" header="Model Adı"></Column>
          <Column field="aciklama" header="Ürün Açıklama"></Column>
          <Column field="anahtar" header="Anahtar"></Column>
          <Column field="sozlesmeBitis" body={dateBodyTemplate} header="Bitiş Tarihi"></Column>
          <Column field="" body={actionBodyTemplate} header="Lisans Tarih Ayarları"></Column>
        </DataTable>
      </div>



    </div>
  )
}
