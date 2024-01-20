const SPECIAL_CHARACTERS = ['!', '$', '%', '&', '?', '+', '-', '*', '^', '='];

const uppercaseWhenIdxIsEven = (word: string, idx: number) =>
	idx % 2 === 0 ? word.toUpperCase() : word;

let specialCharactersCount = 0;

const replaceWithSpecialCharacterWhenIdxIsEven = (
	digit: string,
	idx: number,
) => {
	if (idx % 2 === 0) {
		return digit;
	}

	const output = SPECIAL_CHARACTERS[specialCharactersCount];
	specialCharactersCount
    = SPECIAL_CHARACTERS.length - 1 === specialCharactersCount
    	? 0
    	: specialCharactersCount + 1;
	return output;
};

export const formatPassword = (
	password: string,
	specialCharaterStart: string,
): string => {
	specialCharactersCount = Number(
		specialCharaterStart[specialCharaterStart.length - 1],
	);

	return Array.from({length: password.length}).reduce<string>((acc, _, idx) => {
		const character = password[idx];
		const isWord = /[a-z]/.test(character);

		return `${acc}${
			isWord
				? uppercaseWhenIdxIsEven(character, idx)
				: replaceWithSpecialCharacterWhenIdxIsEven(character, idx)
		}`;
	}, '');
};
