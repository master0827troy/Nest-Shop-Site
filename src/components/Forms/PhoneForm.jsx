import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const PhoneForm = (props) => {
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber || "");

  const addPhoneHandler = async () => {
    if (!phoneNumber) {
      toast.error("Fill all the required fields.");
      return;
    }

    try {
      props.changeHandler((prevState) => !prevState);
      await updateDoc(doc(db, "users", props.userId), {
        phoneNumbers: [...props.phoneNumbers, phoneNumber],
      });

      props.callbackFunction();
      toast.success("Phone number added successfully!");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  const editAddressHandler = async () => {
    if (!phoneNumber) {
      toast.error("Fill all the required fields.");
      return;
    }

    try {
      const filteredPhoneNumbers = props.phoneNumbers.filter(
        (ele) =>
          props.phoneNumbers.indexOf(ele) !==
          props.phoneNumbers.indexOf(props.phoneNumber)
      );

      props.changeHandler(null);
      await updateDoc(doc(db, "users", props.userId), {
        phoneNumbers: [...filteredPhoneNumbers, phoneNumber],
      });

      props.callbackFunction();
      toast.success("Updated phone number successfully!");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  return (
    <>
      {props.show && (
        <form>
          <div className="mb-8">
            <Input
              label="Phone"
              className="w-fit"
              bgColor="!bg-gray-100"
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
          </div>
          <div className="flex flex-row gap-5">
            <Button
              bg
              text="Cancel"
              className="h-fit"
              onClick={() =>
                props.phoneNumber
                  ? props.changeHandler(null)
                  : props.changeHandler(false)
              }
            />
            <Button
              bg
              text="Save"
              className="h-fit"
              onClick={props.phoneNumber ? editAddressHandler : addPhoneHandler}
            />
          </div>
        </form>
      )}
    </>
  );
};

PhoneForm.propTypes = {
  userId: PropTypes.string,
  show: PropTypes.bool,
  phoneNumbers: PropTypes.array,
  phoneNumber: PropTypes.string,
  changeHandler: PropTypes.func,
  callbackFunction: PropTypes.func,
};

export default PhoneForm;
