import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const addReview = async (userId, coffeeShopId, rating, reviewText) => {
  try {
    const newReviewRef = await addDoc(collection(db, "reviews"), {
      userId,
      coffeeShopId,
      rating,
      reviewText,
      timestamp: serverTimestamp()
    });
    console.log("Review added with ID:", newReviewRef.id);
  } catch (e) {
    console.error("Error adding review: ", e);
  }
};

export const getReviewsByCoffeeShop = async (coffeeShopId) => {
  const reviewsRef = collection(db, "reviews");
  const querySnapshot = await getDocs(query(reviewsRef, where("coffeeShopId", "==", coffeeShopId)));

  const reviews = [];
  querySnapshot.forEach((doc) => {
    reviews.push(doc.data());
  });
  return reviews;
};
