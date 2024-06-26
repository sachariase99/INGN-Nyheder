import React from 'react'

const Footer = () => {
  return (
    <div className='px-32 py-8 bg-white'>
      {/* Grid layout for footer */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 font-semibold'>
        {/* Column 1 */}
        <ul className='mt-4 md:0 lg:mt-0'>
          {/* Address section */}
          <li className='mb-2'>Adresse:</li>
          <li className='mb-1 cursor-pointer'>Intet nyt - Godt nyt ApS</li>
          <li className='-mb-1 cursor-pointer'>Tulipanvej 232</li>
          <li className='-mb-1 cursor-pointer'>7320</li>
          <li className='cursor-pointer'>Valby Øster</li>
        </ul>
        {/* Column 2 */}
        <ul className='mt-4 md:0 lg:mt-0'>
          {/* Links section */}
          <li className='mb-2'>Links</li>
          <li className='cursor-pointer'>Vikanweb.dk</li>
          <li className='cursor-pointer'>overpådenandenside.dk</li>
          <li className='cursor-pointer'>retsinformation.dk</li>
          <li className='cursor-pointer'>nogetmednews.dk</li>
        </ul>
        {/* Column 3 */}
        <ul className='mt-4 lg:mt-0'>
          {/* Politics section */}
          <li className='mb-2'>Politik</li>
          <li className='cursor-pointer'>Privatlivspolitik</li>
          <li className='cursor-pointer'>Cookiepolitik</li>
          <li className='cursor-pointer'>Købsinformation</li>
          <li className='cursor-pointer'>Delingspolitik</li>
        </ul>
        {/* Column 4 */}
        <ul className='mt-4 lg:mt-0'>
          {/* Contact section */}
          <li className='mb-2'>Kontakt</li>
          <li className='cursor-pointer'>ingn@nyhed.dk</li>
          <li className='cursor-pointer'>telefon: 23232323</li>
          <li className='cursor-pointer'>fax: 123123-333</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
