const formatDate = date => {
	const dateArray = date.split('-');

	const newDate = `${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`;

	return newDate;
};

export default formatDate;
