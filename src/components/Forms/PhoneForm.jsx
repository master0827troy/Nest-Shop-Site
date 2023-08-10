import Input from '../../ui/Input';
import {useState} from 'react';
import Button from '../../ui/Button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const PhoneForm = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('')

  const addPhoneHandler = async () => {
    if (props.show) {
      await updateDoc(doc(db, 'users', props.userId), {
        phoneNumbers: [...props.phoneNumbers, phoneNumber]
      });

      props.changeHandler(false);
    } else {
      props.changeHandler(prevState => !prevState);
    }
  };

  return (
    <>
      {
        props.show &&
        <form>
          <div className="mb-8">
            <Input label='Phone' className='w-fit' bgColor='!bg-gray-100' value={phoneNumber} setValue={setPhoneNumber} />
          </div>
          <div className='flex flex-row gap-5'>
            <Button bg text='Cancel' className='h-fit' onClick={() => props.changeHandler(false)} />
            <Button bg text='Save' className='h-fit' onClick={addPhoneHandler} />
          </div>
        </form>
      }
    </>
  );
};

export default PhoneForm;