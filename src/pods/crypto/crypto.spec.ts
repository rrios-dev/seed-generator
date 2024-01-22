import { initialOptions } from './atoms/options';
import { makeModules } from './crypto';

describe('crypto', () => {
    it.each(['seed-test', 'test-1', 'main-seed', 'secretSeed with parameters'])(
        'seed crypto generations %s',
        (seed) => {
            const result = makeModules({
                ...initialOptions,
                seed,
                modulesCount: 1,
                tokenLength: 10,
                tokensByModule: 1,
            });

            expect(result).toMatchSnapshot();
        }
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
