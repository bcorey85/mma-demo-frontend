const sumTotal = array => {
	return array.reduce((acc, cur) => {
		return acc + cur;
	}, 0);
};

export default sumTotal;
