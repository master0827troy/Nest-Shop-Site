import PropTypes from "prop-types";
import "./Backdrop.css";

const Backdrop = (props) => {
  return <div className={props.backdropClasses} onClick={props.onClose} />;
};

Backdrop.propTypes = {
  backdropClasses: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Backdrop;
