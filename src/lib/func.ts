import random from 'random';

export function StringENC(text: string) {
	return btoa(Buffer.from(text, 'utf8').toString('hex'));
}

export function StringDEC(base64: string) {
	return Buffer.from(atob(base64), 'hex').toString('utf8');
}

export function genCoef() {
	const a = random.int(1, 1000); // 1–1000 scale for better precision
	let coef: number;

	if (a <= 350) {
		// 35%: 1.00x – 1.20x
		coef = random.int(100, 120) / 100;
	} else if (a <= 650) {
		// 30%: 1.21x – 2.00x
		coef = random.int(121, 200) / 100;
	} else if (a <= 850) {
		// 20%: 2.01x – 5.00x
		coef = random.int(201, 500) / 100;
	} else if (a <= 950) {
		// 10%: 5.01x – 10.00x
		coef = random.int(501, 1000) / 100;
	} else if (a <= 990) {
		// 4%: 10.01x – 50.00x
		coef = random.int(1001, 5000) / 100;
	} else if (a <= 999) {
		// 0.9%: 50.01x – 100.00x
		coef = random.int(5001, 10000) / 100;
	} else {
		// 0.1%: 100.01x – 500.00x
		coef = random.int(10001, 50000) / 100;
	}

	return coef;
}
