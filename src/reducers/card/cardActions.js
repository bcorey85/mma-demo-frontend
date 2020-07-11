export const createCardAction = numFights => {
	return {
		type: 'CREATE_CARD',
		payload: {
			numFights
		}
	};
};

export const editCardAction = card => {
	return {
		type: 'EDIT_CARD',
		payload: card
	};
};

export const updateMetaFieldAction = (field, value) => {
	return {
		type: 'UPDATE_META_FIELD',
		payload: {
			field,
			value
		}
	};
};

export const updateFightFieldAction = (field, value) => {
	return {
		type: 'UPDATE_FIGHT_FIELD',
		payload: {
			field,
			value
		}
	};
};

export const updateResultsCardAction = (field, value) => {
	return {
		type: 'UPDATE_RESULTS_CARD',
		payload: {
			field,
			value
		}
	};
};
