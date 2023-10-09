import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import Loading from "../ui/Loading";
import ProfileProducts from "../components/Products/ProfileProducts";

const RecentlyViewed = () => {
  const auth = getAuth();
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useGetFirestoreData("users", auth.currentUser.uid);

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetFirestoreData("products");

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useGetFirestoreData("reviews");

  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    if (userData?.recentlyViewed && products && reviews) {
      setRecentlyViewed(
        userData.recentlyViewed.map((item) => {
          const matchingProduct = products.find(
            (product) => product.id === item
          );

          let productTotalReviews = 0;
          let productRating = 0;
          for (const review of reviews) {
            if (review.productId == matchingProduct.id) {
              productTotalReviews += 1;
              productRating += review.rating;
            }
          }
          return {
            ...matchingProduct,
            rating: productTotalReviews
              ? productRating / productTotalReviews
              : productRating,
          };
        }) || []
      );
    }
  }, [products, reviews, userData?.recentlyViewed]);

  useEffect(() => {
    if (
      (userDataError || productsError || reviewsError) &&
      !userDataLoading &&
      !productsLoading &&
      !reviewsLoading
    ) {
      toast.error("An error occurred!");
    }
  }, [
    productsError,
    productsLoading,
    reviewsError,
    reviewsLoading,
    userDataError,
    userDataLoading,
  ]);

  if (userDataLoading || productsLoading || reviewsLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="p-5 bg-gray-100 shadow-lg">
        <div className="w-fit mb-5">
          <h3 className="pb-2 text-xl font-semibold tracking-wide">
            Recently Viewed
          </h3>
          <div className="w-1/2 border border-orange-600"></div>
        </div>
        {recentlyViewed.length > 0 ? (
          <ProfileProducts products={recentlyViewed} />
        ) : (
          <p>You have no products in your recently viewed!</p>
        )}
      </div>
    </>
  );
};

export default RecentlyViewed;
