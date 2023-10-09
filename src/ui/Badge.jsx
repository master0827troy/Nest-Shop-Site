import PropTypes from "prop-types";

const Badge = ({ text, icon: Icon, containerStyle, iconStyle, textStyle }) => {
  let containerClasses =
    "w-fit px-3 py-1 flex flex-row items-center gap-2 bg-orange-600 rounded-md text-gray-100";

  let iconClasses = "text-xs mt-0.5";
  let textClasses =
    "text-sm font-semibold uppercase tracking-wider select-none";

  containerClasses += containerStyle ? " " + containerStyle : "";
  iconClasses += iconStyle ? " " + iconStyle : "";
  textClasses += textStyle ? " " + textStyle : "";

  return (
    <div className={containerClasses}>
      {Icon && <Icon className={iconClasses} />}
      <span className={textClasses}>{text}</span>
    </div>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  containerStyle: PropTypes.string,
  iconStyle: PropTypes.string,
  textStyle: PropTypes.string,
};

export default Badge;
