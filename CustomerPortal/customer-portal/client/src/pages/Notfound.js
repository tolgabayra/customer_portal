import React from 'react'

export default function Notfound() {
  return (
    <div>


<section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
		<h2 className='text-xl'>404</h2>
			<p className="text-2xl font-semibold md:text-3xl text-red-600">Üzgünüz, Bu sayfayı bulamadık.</p>
			<p className="mt-4 mb-8 dark:text-gray-400">Ama merak etmeyin, ana sayfamızda pek çok başka şey bulabilirsiniz.</p>
			<a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold text-red-900">Anasayfaya geri dön</a>
		</div>
	</div>
</section>



    </div>
  )
}
