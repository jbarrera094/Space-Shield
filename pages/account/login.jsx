import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Login;

function Login() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Not a proper email').required('email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ email, password }) {
        alertService.clear();
        return userService.login(email, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                // const returnUrl = router.query.returnUrl || '/';
                const returnUrl = '/dashboard';
                router.push(returnUrl);
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card bg-blur p-4">
                <div className="card-body">
                    <h1 className='text-center fs-2 mb-4 text-white'>Login Here</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder='Email'/>
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="mb-4">
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder='Password' />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="d-block btn btn-light w-100 fw-bold mb-2">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Sing In
                        </button>
                        <div className="d-flex">
                            <span className='text-white me-2'>not registered yet?</span>
                            <Link href="/account/register" className="text-decoration-none">Sing In!</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
