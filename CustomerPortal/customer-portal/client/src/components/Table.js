import React, { } from 'react'


export default function Table(props) {



  
  

  
  
  return (
    <div>


<div>


<div className="bg-white">

<div className="overflow-x-auto border-x border-t">
   <table className="table-auto w-full">
      <thead className="border-b">
         <tr className="bg-gray-100">
            <th className="text-left p-4 font-medium">
               Lisans Adı
            </th>
            <th className="text-left p-4 font-medium">
               Durum
            </th>
            <th className="text-left p-4 font-medium">
               Sahiplik
            </th>
         </tr>
      </thead>


      {
  props.lisanslar.map((lisans, i)=>(
   
    <tbody>
         <tr key={i} className="border-b hover:bg-gray-50">
            <td className="p-4">
            {lisans.name}
            </td>
            <td className="p-4 text-red-500">
              Aktif
            </td>
            <td className="p-4">
               {lisans.anahtar}
            </td>
         </tr>
     
      </tbody>

  ))
 }


  
   </table>
</div>
</div>

          
        </div>
    </div>
  )
}
