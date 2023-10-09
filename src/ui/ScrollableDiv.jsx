import "./ScrollableDiv.css";

const ScrollableDiv = (props) => {
  return (
    <div
      className={
        props.className ? "scrollableDiv " + props.className : "scrollableDiv"
      }
    >
      {props.children}
    </div>
  );
};

export default ScrollableDiv;
