import ProductRating from "../components/Products/Product/ProductDetails/ProductRating";
import { FaPen } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import { getAuth } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ReviewForm from "../components/Forms/ReviewForm";
import Loading from "../ui/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Reviews = () => {
  const [editingReview, setEditingReview] = useState(null);

  const auth = getAuth();

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
    reFetchData: reFetchReviews,
  } = useGetFirestoreData("reviews", null, {
    lhs: "userId",
    op: "==",
    rhs: auth.currentUser.uid,
  });

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetFirestoreData("products");

  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (reviews && products) {
      setUserReviews(
        reviews.map((review) => {
          const matchingProduct = products.find(
            (product) => product.id === review.productId
          );
          return {
            reviewId: review.id,
            reviewText: review.text,
            reviewRating: review.rating,
            productId: matchingProduct.id,
            productImage: matchingProduct.image,
            productTitle: matchingProduct.title,
          };
        })
      );
    }

    if (
      (reviewsError || productsError) &&
      !reviewsLoading &&
      !productsLoading
    ) {
      toast.error("An error occurred!");
    }
  }, [
    products,
    productsError,
    productsLoading,
    reviews,
    reviewsError,
    reviewsLoading,
  ]);

  if (reviewsLoading || productsLoading) {
    return <Loading />;
  }

  const deleteReviewHandler = async (review) => {
    try {
      const ref = doc(db, "reviews", review.reviewId);
      await deleteDoc(ref);

      reFetchReviews();
      toast.success("Review deleted successfully!");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  return (
    <>
      <div className="p-5 bg-gray-100 shadow-lg">
        <div className="w-fit mb-5">
          <h3 className="pb-2 text-xl font-semibold tracking-wide">
            Your Reviews
          </h3>
          <div className="w-1/2 border border-orange-600"></div>
        </div>
        {userReviews.length > 0 ? (
          userReviews.map((review) =>
            editingReview !== userReviews.indexOf(review) ? (
              <div key={review.productId} className="mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Link to={`/product/${review.productId}`}>
                    <img
                      src={review.productImage}
                      alt=""
                      className="min-w-[9rem] max-w-[9rem] min-h-[9rem] max-h-[9rem] object-cover border rounded-lg"
                    />
                  </Link>
                  <div>
                    <Link to={`/product/${review.productId}`}>
                      <p className="mb-2 text-xl font-semibold tracking-wide">
                        {review.productTitle}
                      </p>
                    </Link>
                    <ProductRating
                      max={5}
                      rating={review.reviewRating}
                      className="mb-3"
                    >
                      <p className="text-sm">{review.date}</p>
                    </ProductRating>
                    <p className="max-w-3xl tracking-wider leading-7">
                      {review.reviewText}
                    </p>
                  </div>
                  <div className="flex flex-row md:flex-col gap-5">
                    <FaPen
                      className="text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125"
                      onClick={() =>
                        setEditingReview(userReviews.indexOf(review))
                      }
                    />
                    <FiTrash2
                      className="text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125"
                      onClick={() => deleteReviewHandler(review)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div key={review.productId} className="mb-6">
                <ReviewForm
                  reviews={reviews}
                  review={review}
                  changeHandler={setEditingReview}
                  callbackFunction={reFetchReviews}
                />
              </div>
            )
          )
        ) : (
          <p>You didn&#39;t write any review yet!</p>
        )}
      </div>
    </>
  );
};

export default Reviews;
