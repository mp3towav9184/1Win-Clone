import random from 'random';

export function StringENC(text: string) {
	return btoa(Buffer.from(text, 'utf8').toString('hex'));
}

export function StringDEC(base64: string) {
	return Buffer.from(atob(base64), 'hex').toString('utf8');
}

export function genCoef() {
	const a = random.int(1, 1000);
	let coef: number;

	if (a <= 200) {
		// 20%: 3.50x – 3.50x
		coef = random.int(150, 190) / 100;
	} else if (a <= 700) {
		// 50%: 3.50x – 3.50x
		coef = random.int(191, 290) / 100;
	} else if (a <= 900) {
		// 3.50x – 3.50x
		coef = random.int(291, 340) / 100;
	} else {
		// 10%: 3.50x – 3.50x
		coef = random.int(341, 390) / 100;
	}

	return coef;
}
