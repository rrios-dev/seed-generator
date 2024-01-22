import {Spinner} from '@nextui-org/react';

import useGeneratorOptions from '@/pods/crypto/hooks/use-generator-options';
import TokenModule from './token-module';
import useGenerators from '@/pods/crypto/hooks/use-generators';

const TokenModules = () => {
    const options = useGeneratorOptions();
    const {data, isLoading} = useGenerators(options);

    if (isLoading) {
        return <div className='flex w-full items-center justify-center'>
            <Spinner />
        </div>;
    }

    return (
        <div className='grid gap-8 lg:grid-cols-3 md:grid-cols-2 justify-items-center'>
            {data?.map((tokens, idx) => (
                <TokenModule key={idx} id={idx} tokens={tokens} />
            ))}
        </div>
    );
};

export default TokenModules;
