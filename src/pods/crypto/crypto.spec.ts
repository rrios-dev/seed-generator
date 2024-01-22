import { expect, test } from 'vitest';
import { initialOptions } from './atoms/options';
import { makeModules } from './crypto';

['seed-test', 'test-1', 'main-seed', 'secretSeed with parameters'].forEach(
    (seed) => {
        test(`seed crypto generations ${seed}`, () => {
            const result = makeModules({
                ...initialOptions,
                seed,
            });

            expect(result).toMatchSnapshot();
        });
    }
);

[
    ['seed-test', 12, 10, 10],
    ['seed-test', 10, 14, 10],
].forEach(([seed, modulesCount, tokenLength, tokensByModule]) => {
    test(`seed crypto generations ${seed} with custom parameters`, () => {
        const result = makeModules({
            modulesCount: modulesCount as number,
            tokenLength: tokenLength as number,
            tokensByModule: tokensByModule as number,
            seed: seed as string,
        });

        expect(result).toMatchSnapshot();
    });
});