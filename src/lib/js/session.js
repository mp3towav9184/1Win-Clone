//@ts-nocheck
export default {
	mines_traps: [],
	aviator_coef: parseFloat((Math.random() * (13 - 1) + 1).toFixed(2)),
	all_currencies: {
		USD: { sign: '$', mines_default: 1, mines_min: 0.1, mines_max: 200, aviator_default: 1, aviator_min: 0.1, aviator_max: 100, multiplys: [1, 2, 5, 10], crate: 0.1 },
		BDT: { sign: 'Tk', mines_default: 100, mines_min: 10, mines_max: 20000, aviator_default: 10, aviator_min: 10, aviator_max: 10000, multiplys: [100, 200, 500, 10000], crate: 10 },
		INR: { sign: '₹', mines_default: 100, mines_min: 10, mines_max: 16000, aviator_default: 10, aviator_min: 10, aviator_max: 8000, multiplys: [100, 200, 500, 1000], crate: 1 },
		NGN: { sign: '₦', mines_default: 100, mines_min: 10, mines_max: 10000, aviator_default: 30, aviator_min: 30, aviator_max: 30000, multiplys: [100, 200, 500, 10000], crate: 30 },
		ZAR: { sign: 'R', mines_default: 100, mines_min: 5, mines_max: 1000, aviator_default: 2, aviator_min: 2, aviator_max: 1800, multiplys: [10, 20, 50, 100], crate: 2 }
	},
	coef: {
		1: [
			0.99, 1.04, 1.09, 1.14, 1.19, 1.26, 1.33, 1.4, 1.49, 1.59, 1.71, 1.84, 1.99, 2.17, 2.39, 2.65,
			2.98, 3.41, 3.98, 4.78, 5.97, 7.96, 11.94, 23.88
		],
		3: [
			1.09, 1.24, 1.43, 1.65, 1.93, 2.27, 2.69, 3.23, 3.92, 4.83, 6.03, 7.68, 9.98, 13.31, 18.3,
			26.15, 39.22, 62.76, 109.83, 219.65, 549.13, 2196.5
		],
		5: [
			1.19, 1.51, 1.93, 2.49, 3.27, 4.36, 5.92, 8.2, 11.62, 16.9, 25.34, 39.42, 64.06, 109.83,
			201.35, 402.69, 906.06, 1937.37, 2968.69, 4000
		],
		7: [
			1.32, 1.86, 2.68, 3.93, 5.89, 9.11, 14.43, 23.6, 40.13, 71.34, 133.76, 267.52, 579.63,
			1463.71, 2347.78, 3231.85, 4115.93, 5000
		]
	}
};
