import type {BareFetcher} from 'swr';
import useSWR from 'swr/immutable';

import {makeModules} from '../crypto';
import type {GeneratorOptions} from '../interfaces';

const fetcher: BareFetcher<string[][]> = (props: GeneratorOptions) => makeModules(props);

const useGenerators = (props: GeneratorOptions) => {
	const {data, error, isLoading} = useSWR<string[][], Error>(
		props.seed ? props : null,
		fetcher,
	);

	return {
		data,
		error,
		isLoading,
	};
};

export default useGenerators;
