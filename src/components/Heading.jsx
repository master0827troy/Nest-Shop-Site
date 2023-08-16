const Heading = ({ heading, className }) => {
  return (
    <p className={className ? 'text-2xl font-semibold ' + className : 'text-2xl font-semibold'}>{heading}</p>
  );
};

export default Heading;