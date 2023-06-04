import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { licenseService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const license = props?.license;
    const pack = props?.pack;
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        user: Yup.string()
            .required('User is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(license ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (license) {
        formOptions.defaultValues = props.license;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        try {
            // create or update user based on user prop
            let message;
            if (license) {
                data['user'] = pack.alias + '_' + data['user'];
                await licenseService.update(license.id_license, data);
                message = 'license updated';
            } else {
                data['id_pack'] = pack.id_pack;
                data['user'] = pack.alias + '_' + data['user'];
                await licenseService.register(data);
                message = 'License added';
            }

            // redirect to user list with success message
            router.push('/licenses');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    return (
        <div className="card bg-blur p-4">
                <div className="card-body">
                    <h1 className='text-center fs-2 mb-4 text-white'>Manage License</h1>
                    <p className='border border-warning p-2 rounded text-white lh-1 fs-6 text-center'>User Name cannot contain spaces or special characters.</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="mb-2 col">
                                <div className="input-group ">
                                    <span className="input-group-text" id="basic-addon3">{pack.alias}_</span>
                                    <input placeholder='UserName' type="text" name="user" {...register('user')}  className={`form-control ${errors.user ? 'is-invalid' : ''}`} aria-describedby="basic-addon3" 
                                        onKeyPress={(e) => {
                                            if (new RegExp(/[A-Za-z0-9]+$/).test(e.key)) {
                                            } else e.preventDefault();
                                        }} />
                                </div>
                                <div className="invalid-feedback">{errors.user?.message}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col">
                                <input placeholder={`Password ${license ? "(Leave blank to keep the same password)" : ""}`} name="password" type="password" {...register('password')} className={`form-control tiny-placeholder ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mb-1">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                                Save
                            </button>
                            <Link href="/licenses" className="btn btn-outline-danger">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
    );
}