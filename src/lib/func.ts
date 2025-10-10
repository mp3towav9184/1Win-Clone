import random from 'random';

export function StringENC(text: string) {
	return btoa(Buffer.from(text, 'utf8').toString('hex'));
}

export function StringDEC(base64: string) {
	return Buffer.from(atob(base64), 'hex').toString('utf8');
}

export function genCoef() {
	const a = Math.random() * 100; // percentage chance
	let coef: number;

	if (a <= 40) {
		// 40% chance -> 1.00x – 2.00x
		coef = (Math.random() * (2.0 - 1.0) + 1.0);
	} else if (a <= 70) {
		// 30% chance -> 2.01x – 5.00x
		coef = (Math.random() * (5.0 - 2.01) + 2.01);
	} else if (a <= 90) {
		// 20% chance -> 5.01x – 20.00x
		coef = (Math.random() * (20.0 - 5.01) + 5.01);
	} else if (a <= 98) {
		// 8% chance -> 20.01x – 100.00x
		coef = (Math.random() * (100.0 - 20.01) + 20.01);
	} else if (a <= 99.8) {
		// 1.8% chance -> 100.01x – 1000.00x
		coef = (Math.random() * (1000.0 - 100.01) + 100.01);
	} else {
		// 0.2% chance -> 1000.01x – 3000.00x (super rare)
		coef = (Math.random() * (3000.0 - 1000.01) + 1000.01);
	}

	// Limit to 2 decimal places
	return Number(coef.toFixed(2));
}

