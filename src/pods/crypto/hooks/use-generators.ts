import type {BareFetcher} from 'swr';
import useSWR from 'swr/immutable';

import type {GeneratorOptions} from '../interfaces';
import parseModule from '../utils/parse-module';
import makeModuleKey from '../utils/make-module-key';

const fetcher: BareFetcher<string[][]> = async ({
	modulesCount,
	...props
}: GeneratorOptions) => Promise.all(
	Array.from({length: modulesCount}).map(async (_, idx) =>
		parseModule({...props, seed: makeModuleKey(idx, props.seed)}),
	),
);

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
