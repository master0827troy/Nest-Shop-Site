import { useEffect, useRef, useState } from "react";
import "./Input.css";

const Input = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [containerClasses, setContainerClasses] = useState("input-container");

  const inputRef = useRef(null);

  useEffect(() => {
    setContainerClasses(
      isActive || props.value.length !== 0
        ? "input-container active"
        : "input-container inactive"
    );
  }, [isActive, props.value.length]);

  const clickHandler = () => {
    setIsActive(true);
    inputRef.current.focus();
  };

  return (
    <div
      className={
        props.className
          ? containerClasses + " " + props.className
          : containerClasses
      }
    >
      <label
        className={props.bgColor ? props.bgColor : ""}
        htmlFor={props.id}
        onClick={clickHandler}
      >
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        ref={inputRef}
        autoComplete="off"
      />
      <div
        className={props.bgColor ? "after " + props.bgColor : "after"}
        onClick={clickHandler}
      ></div>
    </div>
  );
};

export default Input;
