import { AiOutlineUser } from 'react-icons/ai'
import { NavLink, Outlet } from 'react-router-dom'
import {getAuth} from 'firebase/auth';

const ProfileLayout = () => {
  const list = [
    { id: 1, text: 'Account Info', path: '/profile/' },
    { id: 2, text: 'Address Book', path: 'address-book' },
    { id: 3, text: 'Orders', path: 'orders' },
    { id: 4, text: 'Saved Items', path: 'saved-items' },
    { id: 5, text: 'Recently Viewed', path: 'recently-viewed' },
    { id: 6, text: 'Reviews', path: 'reviews' }
  ];

  const auth = getAuth();

  return (
    <>
      <div className="sticky top-8 mt-12 mb-6 ml-4 flex flex-row gap-2">
        <AiOutlineUser className="text-3xl" />
        <h3 className="text-2xl font-semibold">
          Hello, {auth.currentUser.displayName}
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="sticky top-20 h-fit">
          <ul className="md:w-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-none text-xl font-semibold">
            {list.map((listItem) => (
              <NavLink
                key={listItem.id}
                to={listItem.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 transition duration-500"
                    : "hover:text-orange-600 transition duration-500"
                }
              >
                <li className="py-2 px-4 cursor-pointer">{listItem.text}</li>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default ProfileLayout