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
}

export const PlansScreen = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { user } = useSelector(selectUser);
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
      .collection("costumers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
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
      {Object.entries(products).map(([productId, productData]) => {
        console.log(productId);
        console.log(productData);
        return (
          <div className="plansScreen_plan">
            <div className="plansscreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
};
