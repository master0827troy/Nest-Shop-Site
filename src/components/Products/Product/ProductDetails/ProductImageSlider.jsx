import { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

const ProductImageSlider = ({ images }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const firstSliderSettings = {
    infinite: true,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    asNavFor: nav2,
  };

  const secondSliderSettings = {
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: nav1,
  };

  return (
    <div className="flex flex-col gap-4">
      <Slider {...firstSliderSettings} ref={(slider1) => setNav1(slider1)}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className="w-full h-full object-cover border rounded-lg cursor-pointer"
          />
        ))}
      </Slider>
      <Slider {...secondSliderSettings} ref={(slider2) => setNav2(slider2)}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt=""
              className="w-16 h-16 object-cover border border-slate-200 rounded-lg cursor-pointer transition duration-500 hover:border-slate-400"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

ProductImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ProductImageSlider;
