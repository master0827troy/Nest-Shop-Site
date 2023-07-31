import Button from "../ui/Button";
import StarInput from "../ui/StarInput";

const ReviewForm = () => {
  return (
    <>
      <h3 className='text-2xl text-center lg:text-left font-semibold mb-5'>Leave a review</h3>
      <textarea className='w-full py-1 px-2 border min-h-[5rem] max-h-40 mb-4 outline-none transition duration-500 focus:border-orange-600' />
      <div className="flex flex-row items-start justify-between">
        <StarInput numberOfStars={5} />
        <Button text='Submit' />
      </div>
    </>
  );
};

export default ReviewForm;