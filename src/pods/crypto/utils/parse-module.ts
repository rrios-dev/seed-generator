import sha3 from 'crypto-js/sha3';

import {formatPassword} from '../crypto';
import type {GeneratorOptions} from '../interfaces';

const parseModule = ({
	tokensByModule,
	tokenLength,
	seed,
}: Omit<GeneratorOptions, 'modulesCount'>) => Array.from({length: tokensByModule}).map((_, idx) => {
	const password = sha3(`${seed}${idx}`).toString();
	const formatedPassword = formatPassword(password, idx.toString());
	return formatedPassword.slice(0, tokenLength);
});

export default parseModule;
