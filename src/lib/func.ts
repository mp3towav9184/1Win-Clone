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
		// 20%: 3.50x – 4.49x
		coef = random.int(350, 449) / 100;
	} else if (a <= 700) {
		// 50%: 4.50x – 6.49x
		coef = random.int(450, 649) / 100;
	} else if (a <= 900) {
		// 20%: 6.50x – 7.99x
		coef = random.int(650, 799) / 100;
	} else {
		// 10%: 8.00x – 8.99x
		coef = random.int(800, 899) / 100;
	}

	return coef;
}
