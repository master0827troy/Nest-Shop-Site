import {FaMapMarkerAlt, FaPen, FaPhoneAlt} from 'react-icons/fa';
import Button from '../ui/Button';
import Input from '../ui/Input';
import {FiTrash2} from 'react-icons/fi';
const AddressBook = () => {
  return (
    <div className='flex flex-row gap-8'>
      <div className='h-fit p-5 grow bg-gray-100 shadow-lg'>
        <div className='w-fit mb-3'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Addresses</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='mb-8 flex flex-row gap-10'>
          <div className='flex flex-row items-center gap-2'>
            <FaMapMarkerAlt className='text-lg text-orange-600' />
            <p className='font-semibold mr-4'>22 zbi street, Cairo, Egypt, 11777</p>
            <FaPen />
            <FiTrash2 />
          </div>
        </div>
        <Button bg text='Add' className='h-fit' />
      </div>
      <div className='h-fit p-5 grow bg-gray-100 shadow-lg'>
        <div className='w-fit mb-3'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Phone Numbers</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='mb-8 flex flex-row gap-10'>
          <div className='flex flex-row items-center gap-2'>
            <FaPhoneAlt className='text-lg text-orange-600' />
            <p className='font-semibold mr-4'>01020938271</p>
            <FaPen />
            <FiTrash2 />
          </div>
        </div>
        <Button bg text='Add' className='h-fit' />
      </div>
    </div>
  );
};

export default AddressBook;