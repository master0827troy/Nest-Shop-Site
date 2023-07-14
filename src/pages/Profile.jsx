import React from 'react'

const Profile = () => {
  return (
    <ul className='flex flex-col gap-5 text-xl font-semibold bg-red-200 w-fit'>
      <li className='px-5 py-2'>Account Info</li>
      <li>Address Book</li>
      <li>Orders</li>
      <li>Saved Items</li>
      <li>Recently Viewed</li>
      <li>Vouchers</li>
    </ul>
  )
}

export default Profile