import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Layout } from "components/account";
import { userService, alertService, mailService } from "services";

export default PasswordRecovery;

function PasswordRecovery() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ email }) {
    alertService.clear();
    return userService
      .passwordRecovery(email)
      .then((res) => {
        alertService.success(
          "Recovery email sent, please check your email address."
        );

        mailService.resetPassword(res.token, email);
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="card bg-blur p-4">
        <div className="card-body">
          <h1 className="text-center fs-2 mb-4 text-white">
            Password Recovery
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                name="email"
                type="text"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email"
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <button
              disabled={formState.isSubmitting}
              className="d-block btn btn-light w-100 fw-bold mb-2"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              Send
            </button>
            <div className="d-flex">
              <span className="text-white me-2">
                Do you remember your password?
              </span>
              <Link href="/account/login" className="text-decoration-none">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
