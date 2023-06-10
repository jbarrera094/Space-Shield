import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string().email('Not a proper email')
            .required('email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        checkTermCondition: Yup.boolean()
            .oneOf([true], "It's necessary to accept terms and conditions")            
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Registration successful', true);
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card bg-blur p-4">
                <div className="card-body">
                    <h1 className='text-center fs-2 mb-4 text-white'>Regiser Here</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <input placeholder='First Name' name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <input placeholder='Last Name' name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <input placeholder='Email' name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="mb-3">
                            <input placeholder='Password' name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="mb-3">
                            <input placeholder='Confirm Password' name="passwordConfirmation" type="password" {...register('passwordConfirmation')} className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.passwordConfirmation?.message}</div>
                        </div>
                        <div className="form-check mb-3">
                            <input name='checkTermCondition' type="checkbox" {...register('checkTermCondition')} className={`form-check-input ${errors.password ? 'is-invalid' : ''}`} />
                            <label className="form-check-label text-white" htmlFor="checkTermCondition">
                                I accept <Link href={'/termConditions'} className='text-decoration-none'>terms and conditions</Link>
                            </label>
                            <div className="invalid-feedback">{errors.checkTermCondition?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="d-block btn btn-light w-100 fw-bold mb-2">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Sing Up
                        </button>
                        <div className="d-flex">
                            <span className='text-white me-2'>already have an account?</span>
                            <Link href="/account/login" className="text-decoration-none">Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>            
        </Layout>
    );
}
