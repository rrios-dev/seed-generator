import {useField, useFormikContext} from 'formik';
import {type ComponentProps, type ComponentType} from 'react';

type FormikControlProps<T extends ComponentType<any>> = ComponentProps<T> & {
	name: string;
	Input: T;
};

// TODO: Enhance typings
const FormikControl = <T extends ComponentType<any>>({
	Input,
	name,
	...rest
}: FormikControlProps<T>) => {
	const {submitCount} = useFormikContext();
	const [field, {error}] = useField(name as string);
	const displayError = submitCount > 0 && Boolean(error);

	return (
		<Input
			{...rest}
			{...field}
			name={name as string}
			errorMessage={displayError && error}
			isInvalid={displayError}
		/>
	);
};

export default FormikControl;
