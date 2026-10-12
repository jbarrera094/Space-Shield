import { useEffect } from "react";

export default function Checkout({
  paddleEnvironment,
  clientToken,
}) {
  useEffect(() => {
    if (!window.Paddle || !clientToken) {
      return;
    }

    /*
     * Paddle usa Live por defecto.
     * Solo debemos activar explícitamente Sandbox
     * cuando estamos trabajando en Sandbox.
     */
    if (paddleEnvironment === "sandbox") {
      window.Paddle.Environment.set("sandbox");
    }

    window.Paddle.Initialize({
      token: clientToken,
    });
  }, [paddleEnvironment, clientToken]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    />
  );
}

export async function getServerSideProps() {
  const paddleEnvironment =
    process.env.PADDLE_ENV === "live"
      ? "live"
      : "sandbox";

  const clientToken =
    paddleEnvironment === "live"
      ? process.env.PADDLE_CLIENT_TOKEN_LIVE
      : process.env.PADDLE_CLIENT_TOKEN_SANDBOX;

  if (!clientToken) {
    console.error(
      `Paddle client token is missing for environment: ${paddleEnvironment}`
    );
  }

  return {
    props: {
      paddleEnvironment,
      clientToken: clientToken || "",
    },
  };
}