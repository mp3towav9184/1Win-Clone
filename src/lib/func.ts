import random from 'random';

export function StringENC(text: string) {
	return btoa(Buffer.from(text, 'utf8').toString('hex'));
}

export function StringDEC(base64: string) {
	return Buffer.from(atob(base64), 'hex').toString('utf8');
}

export function genCoef() {
	const a = random.int(1, 10000); // random range for probability distribution
	let coef: number;

	if (a <= 6000) {
		// 60%: 500x – 1000x (most rounds)
		coef = random.float(500.0, 1000.0);
	} else if (a <= 9000) {
		// 30%: 1000x – 2000x
		coef = random.float(1000.0, 2000.0);
	} else if (a <= 9900) {
		// 9%: 2000x – 2500x
		coef = random.float(2000.0, 2500.0);
	} else {
		// 1%: 2500x – 3000x (ultra rare)
		coef = random.float(2500.0, 3000.0);
	}

	// Round to 2 decimals for display consistency
	return parseFloat(coef.toFixed(2));
}

