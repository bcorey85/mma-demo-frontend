import axios from 'axios';

const httpRequest = async props => {
	const {
		method,
		url,
		payload,
		token,
		redirectURL,
		history,
		message
	} = props;

	if (method === 'get' || method === 'delete') {
		try {
			const response = await axios[method](url, {
				headers: {
					Authorization: 'Bearer ' + token
				}
			});

			if (redirectURL && history && message) {
				return history.push({
					pathname: redirectURL,
					message: {
						type: 'success',
						description: message
					}
				});
			} else {
				return response;
			}
		} catch (error) {
			if (error.response) {
				return {
					type: 'error',
					description: error.response.data.error
				};
			}
		}
	}

	try {
		const response = await axios[method](url, payload, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});

		if (redirectURL && history && message) {
			return history.push({
				pathname: redirectURL,
				message: {
					type: 'success',
					description: message
				}
			});
		} else {
			return response;
		}
	} catch (error) {
		if (error.response) {
			return {
				type: 'error',
				description: error.response.data.error
			};
		}
	}
};

export default httpRequest;
