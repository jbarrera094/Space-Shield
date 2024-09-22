import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Layout } from "components/account";
import { userService, alertService } from "services";
import { useEffect } from "react";

export default ResetPassword;

function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ password }) {
    alertService.clear();

    if (!token) return alertService.error("Token is required");

    return userService
      .resetPassword(token, password)
      .then(() => {
        router.push("/account/login");
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="card bg-blur p-4">
        <div className="card-body">
          <h1 className="text-center fs-2 mb-4 text-white">Reset Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="New Password"
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="mb-4">
              <input
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm New Password"
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </div>
            <button
              disabled={formState.isSubmitting}
              className="d-block btn btn-light w-100 fw-bold mb-2"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
