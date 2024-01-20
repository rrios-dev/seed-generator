import type {BareFetcher} from 'swr';
import useSWRImmutable from 'swr/immutable';

import type {GeneratorOptions} from '../interfaces';
import parseModule from '../utils/parse-module';

export const fetcher: BareFetcher<string[]> = async (
	props: Omit<GeneratorOptions, 'modulesCount'>,
) => parseModule(props);

const useGenerator = (props: Omit<GeneratorOptions, 'modulesCount'>) => {
	const {data, error, isValidating} = useSWRImmutable<string[], Error>(
		props.seed ? props : null,
		fetcher,
	);

	return {
		data,
		error,
		isLoading: isValidating && Boolean(data),
	};
};

export default useGenerator;
