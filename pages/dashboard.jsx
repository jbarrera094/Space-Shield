import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PacksList from "components/PacksList";

import { alertService, userService, packService } from "services";

export default Dashboard;

function Dashboard() {
  const [loaded, setLoaded] = useState(true);
  const [anyPack, setAnyPack] = useState(false);
  const router = useRouter();

  useEffect(() => {
    packService
      .getAll({ id_user: userService.userValue?.id_user })
      .then((x) => {
        setAnyPack(x.some((pack) => pack.paid));
        setLoaded(false);
      });
  }, []);

  function onSubmit() {
    if (!loaded) {
      if (anyPack) {
        router.push("/licenses");
      } else {
        alertService.error(
          "No packages available, you must first purchase one or contact us to request your Beta test."
        );
      }
    }
  }

  return (
    <div className="pt-5">
      <div className="container pt-3">
        <h1>Hola {userService.userValue?.firstName}!</h1>
        <hr />
        <div>
          <section className="d-flex justify-content-center">
            <button
              onClick={onSubmit}
              className={`${
                anyPack ? "btn btn-primary btn-lg" : "btn btn-secondary btn-lg"
              } `}
            >
              {loaded && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              Manage Licenses
            </button>
          </section>
          <hr className="" />
        </div>
      </div>
      <div className="mb-4 container">
        <PacksList />
      </div>
    </div>
  );
}
