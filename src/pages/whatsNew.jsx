import Promotions from '../components/Promotions';
import Products from '../components/Products';
import Filters from '../components/Filters';

const whatsNew = () => {
  const promotionsList = [
    {
      id: 1,
      title: '20% Off On Tank Tops',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/banner-03.jpg',
      imageClasses: '!bg-left-top'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-10 mb-10">
        <Promotions promotions={promotionsList} />
      </div>
      <h2 className='section-heading'>What's New</h2>
      <Filters />
      <Products />
    </>
  );
};

export default whatsNew;