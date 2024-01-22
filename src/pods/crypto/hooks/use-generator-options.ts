import {useStore} from '@nanostores/react';

import optionsAtom from '../atoms/options';

const useGeneratorOptions = () => useStore(optionsAtom);

export const useGeneratorOptionsHandlers = () => ({
    set: optionsAtom.set,
    get: optionsAtom.get,
});

export default useGeneratorOptions;
