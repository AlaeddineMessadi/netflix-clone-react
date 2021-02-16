import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import "./style.scss";

interface ProductType {
  description: string;
  name: string;
  prices: any;
  role?: string;
}

export const PlansScreen = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { user } = useSelector(selectUser);
  const [subscription, setSubscription] = useState<any>();

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_start
              .seconds,
            current_period_start: subscription.data().current_period_start
              .seconds,
          });
        });
      });
    return () => {};
  }, [user.uid]);

  console.log(subscription);
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products: ProductType[] = [];
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
    return () => {};
  }, []);

  const loadCheckout = async (priceId: string) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data() as any;
      if (error) {
        // show eerro to customer
        console.error(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const strip = await loadStripe(
          "pk_test_51II1PtGxI6aDbVhtuAfwj022qYAf7pTdzMr5VjP9mGLbv01fBHTryDo5lWfQXDWAnxLcYvu4X64jpim8dJ6VKiEU00wIjlZRpX"
        );

        strip?.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <div className="plansScreen">
      {subscription && (
        <p className="plansScreen__renewalDate">
          Renewal date:{" "}
          {new Date(
            subscription.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData?.role === subscription.role;
        // console.log(productData);
        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen_plan--disabled"
            } plansScreen_plan`}
          >
            <div className="plansscreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              disabled={isCurrentPackage}
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};
