import random from 'random';

export function StringENC(text: string) {
	return btoa(Buffer.from(text, 'utf8').toString('hex'));
}

export function StringDEC(base64: string) {
	return Buffer.from(atob(base64), 'hex').toString('utf8');
}

export function genCoef() {
	const a = random.int(1, 10000); // higher range for more granular control
	let coef: number;

	if (a <= 5000) {
		// 50%: 1.00x – 2.00x
		coef = random.float(1.00, 2.00);
	} else if (a <= 8000) {
		// 30%: 2.01x – 5.00x
		coef = random.float(2.01, 5.00);
	} else if (a <= 9500) {
		// 15%: 5.01x – 20.00x
		coef = random.float(5.01, 20.00);
	} else if (a <= 9950) {
		// 4.5%: 20.01x – 100.00x
		coef = random.float(20.01, 100.00);
	} else if (a <= 9995) {
		// 0.45%: 100.01x – 1000.00x
		coef = random.float(100.01, 1000.00);
	} else {
		// 0.05%: 1000.01x – 3000.00x (ultra rare)
		coef = random.float(1000.01, 3000.00);
	}

	// Round to 2 decimal places for display
	return parseFloat(coef.toFixed(2));
}

