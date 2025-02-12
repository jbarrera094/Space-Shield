import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { alertService, packService, userService } from "services";

export { AddEdit };

function AddEdit(props) {
  const pack = props?.pack;
  const typePack = props?.typePack;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    alias: Yup.string().required("Alias is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    try {
      let message;
      if (pack) {
        data["id_user"] = userService.userValue?.id_user;
        await packService.update(pack.id_pack, data);
        message = "Pack updated";
      }

      // redirect to user list with success message
      router.push("/licenses");
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  }

  async function onCreate(data) {
    try {
      let message;
      data["id_user"] = userService.userValue?.id_user;
      data["typePack"] = typePack;
      const pack = await packService.register(data);

      if (pack) {
        message = "License added";
        alertService.success(message, false);
        router.push(
          "/api/payment/checkout_sessions?idPack=" +
          pack.idPack +
          "&typePack=" +
          typePack +
          "&token=" +
          userService.userValue?.token
        );
      } else {
        alertService.error("Error with payment gateway", true);
      }
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  }

  if (typePack) {
    return (
      <div className="card bg-blur p-4">
        <div className="card-body">
          <h1 className="text-center fs-2 mb-4 text-white">Create Pack</h1>
          <p className="border border-warning p-2 rounded text-white lh-1 fs-6 text-justify">
            To create a package, it is necessary to enter a unique
            identification, such as an alias, which will allow us to identify
            the licenses of your organization and also provide order to your
            license library. This alias cannot contain spaces or special
            characters.
          </p>
          <form onSubmit={handleSubmit(onCreate)}>
            <div className="row">
              <div className="mb-3 col">
                <input
                  placeholder="Alias"
                  type="text"
                  name="alias"
                  {...register("alias")}
                  className={`form-control ${errors.alias ? "is-invalid" : ""}`}
                  aria-describedby="basic-addon3"
                  onKeyPress={(e) => {
                    if (new RegExp(/[A-Za-z0-9]+$/).test(e.key)) {
                    } else e.preventDefault();
                  }}
                />
                <div className="invalid-feedback">{errors.alias?.message}</div>
              </div>
            </div>
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="d-block btn btn-warning w-100 fw-bold"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              Buy Now!
            </button>
            {/* <p className="text-white lh-1 fs-7 mt-2 text-justify">
              The subscription price is based on EUR and is updated every sunday
              according to
              <Link
                href="https://www.google.com/finance/quote/EUR-COP?sa=X&ved=2ahUKEwi4mKKd8-P_AhWDkIQIHUmsDQkQmY0JegQIBhAc&window=1M"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-decoration-none ms-1 text-white fw-semibold">
                  Google Finance
                </span>
              </Link>
              .
            </p> */}
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card bg-blur p-4">
        <div className="card-body">
          <h1 className="text-center fs-2 mb-4 text-white">Update Pack</h1>
          <p className="border border-warning p-2 rounded text-white lh-1 fs-6 text-center">
            Remember: You cannot use blank spaces or special characters.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="mb-3 col">
                <input
                  placeholder="Alias"
                  type="text"
                  name="alias"
                  {...register("alias")}
                  className={`form-control ${errors.alias ? "is-invalid" : ""}`}
                  aria-describedby="basic-addon3"
                  onKeyPress={(e) => {
                    if (new RegExp(/[A-Za-z0-9]+$/).test(e.key)) {
                    } else e.preventDefault();
                  }}
                />
                <div className="invalid-feedback">{errors.alias?.message}</div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="btn btn-primary mb-1"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                Save
              </button>
              <Link href="/licenses" className="btn btn-outline-danger">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
