import { useEffect } from "react";

export default function Checkout() {
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
    }
  }, []);

  return (
    <div className="container mt-5 pt-5 text-center">
      <h1 className="fs-3 fw-bold">LPS CAD Checkout</h1>
      <p>Loading secure checkout...</p>
    </div>
  );
}