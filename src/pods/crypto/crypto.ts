import cryptoJS from 'crypto-js';

import type { GeneratorOptions } from './interfaces';

export const makeToken = ({
    seed,
    tokenLength,
}: Pick<GeneratorOptions, 'seed' | 'tokenLength'>): string => {
    const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    const seedBytes = cryptoJS
        .SHA256(`${seed}-${tokenLength}`)
        .toString(cryptoJS.enc.Hex);

    const permutedCharset = fisherYatesPermute(charset, seedBytes);

    let currentIndex = 0;
    let securePassword = '';

    while (securePassword.length < tokenLength) {
        securePassword += permutedCharset[currentIndex % permutedCharset.length];
        currentIndex++;
    }

    return securePassword;
};

const fisherYatesPermute = (array: string, seedBytes: string): string[] => {
    const { length } = array;
    const permutedArray = array.split('');

    for (let i = length - 1; i > 0; i--) {
        const j = parseInt(seedBytes[i % seedBytes.length], 16) % (i + 1);
        [permutedArray[i], permutedArray[j]] = [permutedArray[j], permutedArray[i]];
    }

    return permutedArray;
};

export const makeModule = ({
    seed,
    tokensByModule,
    tokenLength,
}: Omit<GeneratorOptions, 'modulesCount'>): string[] => {
    const finalSeed = cryptoJS.SHA256(seed).toString(cryptoJS.enc.Hex);

    return finalSeed && tokensByModule && tokenLength
        ? Array.from({ length: tokensByModule }, (_, i) =>
            makeToken({
                seed: `${finalSeed}-${tokensByModule}-${i}`,
                tokenLength,
            })
        )
        : [];
};

export const makeModules = ({
    modulesCount,
    seed,
    tokenLength,
    tokensByModule,
}: GeneratorOptions): string[][] => {
    if (!seed || !tokensByModule || !tokenLength || !modulesCount) {
        return [];
    }

    return Array.from({ length: modulesCount }, (_, idx) =>
        makeModule({
            seed: `${seed}-${modulesCount}-${idx}`,
            tokenLength,
            tokensByModule,
        })
    );
};
