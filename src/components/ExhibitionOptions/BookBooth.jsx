import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookBooth = ({ id, title, btn, features, subtitle, description, booth, price, category }) => {
  const navigate = useNavigate();

  const handleC = (e) => {
    e.preventDefault();
    navigate("/exhibitionOptions/Expayment", { state: { booth, price, category } });
  }
  const handlePriceList = (e) => {
    e.preventDefault();
    // navigate("/pricelist?scrollTo=exhibition");
    Swal.fire({
      title: "The event is over",
      text: "",
      icon: "info",
      confirmButtonText: "OK",
      showCancelButton: false, // Disable the cancel button
      showDenyButton: false, // Disable the deny button
      customClass: {
        confirmButton: "swal-confirm-button", // Optional: Apply custom styles if needed
      },
    });
  }
  return (
    <div className=' flex flex-col gap-4 lg:gap-8'>
      <div className='border-[1px] border-footerblue/30 rounded-3xl -mx-4 lg:-mx-8 p-4 lg:px-8 text-base lg:text-xl xl:text-2xl'>
        <div className='flex justify-between'>
          <div className=''>
            <div className='font-bold'>{id}. {title}  </div>
            <div className='font-semibold'>{subtitle}</div>
          </div>
          <button onClick={handlePriceList} className='mt-2 bg-blue-500 text-white py-1 px-4 rounded-full'>{btn}</button>
        </div>
        {id === "C4" && (
          <div className='mb-2 text-base lg:text-xl xl:text-2xl'>{description}</div>
        )}
        <ul className='list-disc list-inside'>
          {features.map((item, index) => (
            <li key={index} className='text-base lg:text-xl xl:text-2xl'>{item}</li>
          ))}
        </ul>

      </div>



    </div>
  )
}

export default BookBooth