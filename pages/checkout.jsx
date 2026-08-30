import { useEffect, useState } from "react";

export default function Checkout() {
  const [paddleReady, setPaddleReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Paddle) {
      window.Paddle.Environment.set("sandbox");

      window.Paddle.Initialize({
        token: "test_b11ea0158066749b3a24e9df5b8",
        checkout: {
          settings: {
            displayMode: "overlay",
            theme: "light",
            locale: "en",
          },
        },
      });

      setPaddleReady(true);
    }
  }, []);

  const openCheckout = () => {
    if (!window.Paddle || !paddleReady) return;

    window.Paddle.Checkout.open({
      items: [
        {
          priceId: "pri_01m1a2d28bp2fbdfagae2fzwba",
          quantity: 1,
        },
      ],
    });
  };

  return (
    <div className="container mt-5 pt-5 text-center">
      <h1 className="fs-3 fw-bold">LPS CAD Checkout</h1>

      <p>Secure subscription checkout.</p>

      <button
        className="btn btn-primary mt-3"
        onClick={openCheckout}
        disabled={!paddleReady}
      >
        Test Basic Plan - €99/month
      </button>
    </div>
  );
}