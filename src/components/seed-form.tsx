import { Input } from '@nextui-org/react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Form, Formik, useFormikContext } from 'formik';
import { useEffect, useRef, useState } from 'react';

import yup from '@/pods/common/yup';
import { initialOptions } from '@/pods/crypto/atoms/options';
import {
    useGeneratorOptionsHandlers,
} from '@/pods/crypto/hooks/use-generator-options';
import type { GeneratorOptions } from '@/pods/crypto/interfaces';
import FormikControl from './formik-control';

const validationSchema = yup.object().shape({
    tokensByModule: yup.number().required().min(1),
    tokenLength: yup.number().required().min(1),
    modulesCount: yup.number().required().min(1),
    seed: yup.string().required(),
});

const SeedCleaner = () => {
    const generatorHandlers = useGeneratorOptionsHandlers();
    const { errors } = useFormikContext<GeneratorOptions>();

    useEffect(() => {
        if (errors.seed) {
            generatorHandlers.set({ ...generatorHandlers.get(), seed: '' });
        }
    }, [errors.seed]);

    return null;
};

const SeedSubmit = () => {
    const { handleSubmit, values } = useFormikContext<yup.InferType<typeof validationSchema>>();
    const timer = useRef<number | undefined>();
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                handleSubmit();
            }, 1000);
        } else {
            mounted.current = true;
        }
    }, [values.seed, values.tokenLength, values.modulesCount, values.tokensByModule]);

    return null;
};

const Menu = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const options = useGeneratorOptionsHandlers();
    return (
        <Formik
            initialValues={initialOptions}
            validationSchema={validationSchema}
            onSubmit={options.set}
        >

            <Form className='flex flex-col gap-2'>
                <SeedCleaner />
                <SeedSubmit />
                <div className='flex gap-4 content-center'>
                    <FormikControl
                        size='sm'
                        Input={Input}
                        name='seed'
                        label='Seed'
                        type={isVisible ? 'text' : 'password'}
                        startContent={
                            <button
                                className='focus:outline-none'
                                type='button'
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeOpenIcon className='text-2xl text-default-400 pointer-events-none' />
                                ) : (
                                    <EyeClosedIcon className='text-2xl text-default-400 pointer-events-none' />
                                )}
                            </button>
                        }
                    />
                </div>
                <div className='flex gap-2 flex-col md:flex-row'>
                    <FormikControl
                        type='number'
                        size='sm'
                        name='tokensByModule'
                        Input={Input}
                        left
                        label='Tokens by module'
                    />
                    <FormikControl
                        type='number'
                        size='sm'
                        name='tokenLength'
                        Input={Input}
                        label='Token lenght'
                    />
                    <FormikControl
                        type='number'
                        size='sm'
                        name='modulesCount'
                        Input={Input}
                        label='Count of modules'
                    />
                </div>
            </Form>

        </Formik>
    );
};

export default Menu;
