export const limitMax = (value, max) => {
	let num;

	if (value <= max) {
		num = value;
	} else {
		num = max;
	}
	return num;
};

export const limitMin = (value, min) => {
	let num;

	if (value >= min) {
		num = value;
	} else {
		num = min;
	}
	return num;
};

export const limitRange = (value, min, max) => {
	let num;

	if (value === null || value === undefined || value === '') {
		return value;
	}

	if (value >= min && value <= max) {
		num = value;
	} else if (value > max) {
		num = max;
	} else if (value < min) {
		num = min;
	}

	return num;
};
