import Button from '../ui/Button';
import Input from '../ui/Input';
import Products from '../components/Products';
import {products} from '../data';
const SavedItems = () => {
  return (
    <>
      <div className='p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-5'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Saved Items</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <Products products={products} />
      </div>
    </>
  );
};

export default SavedItems;