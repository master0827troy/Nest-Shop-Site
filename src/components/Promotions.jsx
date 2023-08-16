import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import './Promotions.css';

const promotions = (props) => {
  const navigate = useNavigate();

  return (
    <div className='promotions'>
      {
        props.promotions.map(promotion =>
          <div key={promotion.id} className={promotion.imageClasses ? 'promotion ' + promotion.imageClasses : 'promotion'} style={{backgroundImage: `url('${promotion.image}')`}}>
            <div className='promotion-content'>
              <h3 className='promotion-title'>{promotion.title}</h3>
              <p className='promotion-text'>{promotion.text}</p>
              <Button text='Shop now' className='text-white !border-orange-600 rounded-sm' noBg onClick={() => navigate(promotion.path)} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default promotions