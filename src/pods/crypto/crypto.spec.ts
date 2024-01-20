import {makeModules} from './crypto';
import {initialOptions} from './atoms/options';

describe('crypto', () => {
	it.each(['seed-test', 'test-1', 'main-seed', 'secretSeed with parameters'])(
		'seed crypto generations %s',
		seed => {
			const result = makeModules({
				...initialOptions,
				seed,
			});

			expect(result).toMatchSnapshot();
		},
	);

	// It.each([
	// 	['seed-test', 12, 10, 10],
	// 	['seed-test', 12, 10, 10],
	// ])(
	// 	'seed crypto generations with custom parameters',
	// 	(seed, modulesCount, tokenLength, tokensByModule) => {
	// 		const result = makeModules({
	// 			modulesCount,
	// 			tokenLength,
	// 			tokensByModule,
	// 			seed,
	// 		});

	// 		expect(result).toMatchSnapshot();
	// 	},
	// );
});
