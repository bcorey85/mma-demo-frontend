import axios from 'axios';

const httpDelete = async (
	url,
	token,
	redirectURL,
	history,
	setModal,
	message,
	setMessage,
	clearMessage
) => {
	try {
		await axios.delete(url, {
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
	setModal(false);
};

export default httpDelete;
