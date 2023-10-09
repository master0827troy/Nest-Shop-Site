import { useEffect, useState } from "react";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import Loading from "../ui/Loading";
import { toast } from "react-toastify";

const AccountInfo = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
    reFetchData: reFetchUserData,
  } = useGetFirestoreData("users", auth.currentUser.uid);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword1, setCurrentPassword1] = useState("");
  const [currentPassword2, setCurrentPassword2] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setPhone(userData.phone);
    }
  }, [userData]);

  useEffect(() => {
    if (userDataError && !userDataLoading) {
      toast.error("An error occurred!");
    }
  }, [userDataError, userDataLoading]);

  if (userDataLoading) {
    return <Loading />;
  }

  const submitHandler = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: firstName,
      });

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword1
      );

      await reauthenticateWithCredential(user, credential);

      await updateEmail(auth.currentUser, email);

      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        firstName,
        lastName,
        email,
        phone,
      });

      reFetchUserData();
      toast.success("Updated your profile successfully!");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  const changePasswordHandler = async () => {
    if (newPassword1 !== newPassword2) {
      toast.error("Both passwords need to match!");
    } else if (newPassword1.length < 6) {
      toast.error("New password should be at least 6 characters!");
    } else {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword2
      );
      await reauthenticateWithCredential(user, credential);

      updatePassword(auth.currentUser, newPassword1)
        .then(() => {
          toast.success("Changed your password successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("An error occurred!");
        });
    }
  };

  return (
    <>
      <div className="w-full mb-10 p-5 bg-gray-100 shadow-lg">
        <div className="w-fit mb-3">
          <h3 className="pb-2 text-xl font-semibold tracking-wide">
            Account Info
          </h3>
          <div className="w-1/2 border border-orange-600"></div>
        </div>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end gap-8">
          <Input
            label="First Name"
            bgColor="!bg-gray-100"
            className="w-full"
            value={firstName}
            setValue={setFirstName}
          />
          <Input
            label="Last Name"
            bgColor="!bg-gray-100"
            className="w-full"
            value={lastName}
            setValue={setLastName}
          />
          <Input
            label="Email Address"
            bgColor="!bg-gray-100"
            className="w-full"
            value={email}
            setValue={setEmail}
          />
          <Input
            label="Phone Number"
            bgColor="!bg-gray-100"
            className="w-full"
            value={phone}
            setValue={setPhone}
          />
          <Input
            type="password"
            label="Current Password"
            bgColor="!bg-gray-100"
            className="w-full"
            value={currentPassword1}
            setValue={setCurrentPassword1}
          />
          <Button bg text="Save" className="h-fit" onClick={submitHandler} />
        </div>
      </div>
      <div className="p-5 bg-gray-100 shadow-lg">
        <div className="w-fit mb-3">
          <h3 className="pb-2 text-xl font-semibold tracking-wide">
            Change Password
          </h3>
          <div className="w-1/2 border border-orange-600"></div>
        </div>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end gap-8">
          <Input
            type="password"
            label="Current Password"
            bgColor="!bg-gray-100"
            className="w-full"
            value={currentPassword2}
            setValue={setCurrentPassword2}
          />
          <Input
            type="password"
            label="New Password"
            bgColor="!bg-gray-100"
            className="w-full"
            value={newPassword1}
            setValue={setNewPassword1}
          />
          <Input
            type="password"
            label="Repeat New Password"
            bgColor="!bg-gray-100"
            className="w-full"
            value={newPassword2}
            setValue={setNewPassword2}
          />
          <Button
            bg
            text="Save"
            className="h-fit"
            onClick={changePasswordHandler}
          />
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
