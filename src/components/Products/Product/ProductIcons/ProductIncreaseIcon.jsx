import PropTypes from 'prop-types';
import {GoChevronRight} from 'react-icons/go';
import useProductActions from '../../../../hooks/useProductActions';

const ProductIncreaseIcon = ({ id }) => {
  const { increaseItem } = useProductActions();

  const increaseItemHandler = () => {
    increaseItem(id);
  };

  return (
    <GoChevronRight className='mx-auto text-xl font-semibold cursor-pointer transition duration-500 hover:text-orange-600 hover:scale-110' onClick={increaseItemHandler} />
  );
};

ProductIncreaseIcon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProductIncreaseIcon;