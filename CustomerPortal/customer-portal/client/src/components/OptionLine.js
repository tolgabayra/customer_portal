import React, { useState } from 'react'
import { Chart } from 'primereact/chart'

export default function OptionLine() {
    const [basicData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Müşteri dataset',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Lisans dataset',
                backgroundColor: '#FFA726',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    });
    


  return (
    <div>
         <div className="card">
                <h5>Müşteri Grafiği</h5>
                <Chart type="bar" data={basicData}  />
            </div>
    </div>
  )
}
