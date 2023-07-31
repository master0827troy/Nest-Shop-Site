import Button from "../ui/Button";
import Input from "../ui/Input";

const AccountInfo = () => {
  return (
    <>
      <div className='mb-10 p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-3'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Account Info</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='mb-8 flex flex-row gap-10'>
          <Input label='First Name' bgColor='!bg-gray-100' />
          <Input label='Last Name' bgColor='!bg-gray-100' />
          <Input label='Email Address' bgColor='!bg-gray-100' />
        </div>
        <div className='mb-8 flex flex-row items-end gap-10'>
          <Input label='Phone Number' bgColor='!bg-gray-100' />
          <Input label='Password' bgColor='!bg-gray-100' />
          <Button bg text='Save' className='h-fit' />
        </div>
      </div>
      <div className='p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-3'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Change Password</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='mb-8 flex flex-row gap-10'>
          <Input label='Current Password' bgColor='!bg-gray-100' />
          <Input label='New Password' bgColor='!bg-gray-100' />
          <Input label='Repeat New Password' bgColor='!bg-gray-100' />
        </div>
        <Button bg text='Apply Changes' className='h-fit' />
      </div>
    </>
  );
};

export default AccountInfo;