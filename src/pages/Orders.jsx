import Modal from "../ui/Modal";
import {FiEye, FiEyeOff} from 'react-icons/fi';
import Button from '../ui/Button';
import { useState } from "react";
import Sidebar from "../ui/Sidebar";


const Orders = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };


  return (
    <>
    <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum blanditiis nostrum molestias, ipsam deserunt esse quis velit pariatur aperiam. Sint similique nostrum, accusamus non impedit mollitia magni accusantium soluta ab modi velit inventore numquam, neque pariatur vero ipsam architecto autem iste in! Illum quos repellat quod perferendis eius ducimus commodi facere. Enim nobis quisquam ratione assumenda iure necessitatibus beatae officiis.</p>
      </Sidebar>
    </>
  );
};

export default Orders;