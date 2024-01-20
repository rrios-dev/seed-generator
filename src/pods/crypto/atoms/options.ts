import {atom} from 'nanostores';

import {type GeneratorOptions} from '../interfaces';

export const INITIAL_OPTIONS: GeneratorOptions = {
	tokensByModule: 10,
	tokenLength: 50,
	modulesCount: 12,
	seed: '',
};

const optionsAtom = atom<GeneratorOptions>(INITIAL_OPTIONS);

export default optionsAtom;
