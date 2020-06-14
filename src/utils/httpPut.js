import axios from 'axios';

const httpPut = async (
	url,
	payload,
	token,
	redirectURL,
	history,
	message,
	setMessage,
	clearMessage
) => {
	try {
		await axios.put(url, payload, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
		return history.push({
			pathname: redirectURL,
			message: {
				type: 'success',
				description: message
			}
		});
	} catch (error) {
		console.log(error);
		if (error.response) {
			console.log(error.response);
			setMessage({
				type: 'error',
				description: error.response.data.error
			});
			clearMessage();
		}
	}
};

export default httpPut;
