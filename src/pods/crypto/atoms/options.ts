import {atom} from 'nanostores';

import {type GeneratorOptions} from '../interfaces';

export const initialOptions: GeneratorOptions = {
    tokensByModule: 10,
    tokenLength: 50,
    modulesCount: 12,
    seed: '',
};

const optionsAtom = atom<GeneratorOptions>(initialOptions);

export default optionsAtom;
