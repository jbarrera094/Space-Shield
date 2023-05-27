import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { alertService, packService, userService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const pack = props?.pack;
    const typePack = props?.typePack;
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        alias: Yup.string()
            .required('Alias is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        try {
            // create or update user based on user prop
            let message;
            if (pack) {
                await packService.update(pack.id_pack, data);
                message = 'Pack updated';
            }

            // redirect to user list with success message
            router.push('/licenses');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    async function onCreate(data) {
        try {
            // create or update user based on user prop
            let message;
            data['id_user'] = userService.userValue?.id_user;
            data['typePack'] = typePack;
            await packService.register(data);
            message = 'License added';

            // redirect to user list with success message
            router.push('/dashboard');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    if(typePack){
        return (
            <form onSubmit={handleSubmit(onCreate)}>
                <div className="row">
                    <div className="mb-3 col">
                        <label className="form-label" htmlFor="alias">Alias</label>
                        <input type="text" name="alias" {...register('alias')}  className={`form-control ${errors.alias ? 'is-invalid' : ''}`} aria-describedby="basic-addon3" />
                        <div className="invalid-feedback">{errors.alias?.message}</div>
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" disabled={formState.isSubmitting} className="btn btn-warning me-2">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Buy Now!
                    </button>
                </div>
            </form>
        );
    }else{
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="mb-3 col">
                        <label className="form-label" htmlFor="alias">Alias</label>
                        <input type="text" name="alias" {...register('alias')}  className={`form-control ${errors.alias ? 'is-invalid' : ''}`} aria-describedby="basic-addon3" />
                        <div className="invalid-feedback">{errors.alias?.message}</div>
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Save
                    </button>
                    <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                    <Link href="/licenses" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        );
    }
}