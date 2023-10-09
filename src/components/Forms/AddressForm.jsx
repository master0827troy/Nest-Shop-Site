import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const AddressForm = (props) => {
  const [apartment, setApartment] = useState(props.address?.apartment || "");
  const [street, setAStreet] = useState(props.address?.street || "");
  const [city, setCity] = useState(props.address?.city || "");
  const [country, setCountry] = useState(props.address?.country || "");
  const [postalNumber, setPostalNumber] = useState(
    props.address?.postalNumber || ""
  );

  const addAddressHandler = async () => {
    try {
      props.changeHandler((prevState) => !prevState);
      await updateDoc(doc(db, "users", props.userId), {
        addresses: [
          ...props.addresses,
          { apartment, street, city, country, postalNumber },
        ],
      });

      props.callbackFunction();
      toast.success("Address added successfully!");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  const editAddressHandler = async () => {
    try {
      const filteredAddresses = props.addresses.filter(
        (ele) =>
          props.addresses.indexOf(ele) !==
          props.addresses.indexOf(props.address)
      );

      props.changeHandler(null);
      await updateDoc(doc(db, "users", props.userId), {
        addresses: [
          ...filteredAddresses,
          { apartment, street, city, country, postalNumber },
        ],
      });

      props.callbackFunction();
      toast.success("Updated address successfully!");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  return (
    <>
      {props.show && (
        <form>
          <div className="mb-8">
            <div className="mb-4 flex flex-row gap-6">
              <Input
                label="Apartment"
                className="w-44"
                bgColor="!bg-gray-100"
                value={apartment}
                setValue={setApartment}
              />
              <Input
                label="Street"
                className="w-56"
                bgColor="!bg-gray-100"
                value={street}
                setValue={setAStreet}
              />
            </div>
            <div className="flex flex-row gap-5">
              <Input
                label="City"
                className="w-32"
                bgColor="!bg-gray-100"
                value={city}
                setValue={setCity}
              />
              <Input
                label="Country"
                className="w-32"
                bgColor="!bg-gray-100"
                value={country}
                setValue={setCountry}
              />
              <Input
                label="ZIP Code"
                className="w-32"
                bgColor="!bg-gray-100"
                value={postalNumber}
                setValue={setPostalNumber}
              />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <Button
              bg
              text="Cancel"
              className="h-fit"
              onClick={() =>
                props.address
                  ? props.changeHandler(null)
                  : props.changeHandler(false)
              }
            />
            <Button
              bg
              text="Save"
              className="h-fit"
              onClick={props.address ? editAddressHandler : addAddressHandler}
            />
          </div>
        </form>
      )}
    </>
  );
};

AddressForm.propTypes = {
  userId: PropTypes.string,
  show: PropTypes.bool,
  addresses: PropTypes.array,
  address: PropTypes.object,
  changeHandler: PropTypes.func,
  callbackFunction: PropTypes.func,
};

export default AddressForm;
