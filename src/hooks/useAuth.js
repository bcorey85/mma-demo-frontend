import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

const useAuth = () => {
	const [ token, setToken ] = useState(false);
	const [ userId, setUserId ] = useState(false);
	const [ isAdmin, setIsAdmin ] = useState(false);
	const [ tokenExpirationDate, setTokenExpirationDate ] = useState();

	//useCallback to ensure function is not recreated on rerender cycles
	const login = useCallback((uid, token, isAdmin, expirationData) => {
		setToken(token);
		setUserId(uid);
		setIsAdmin(isAdmin);
		const tokenExpirationTime =
			expirationData || new Date(new Date().getTime() + 1000 * 60 * 120);
		setTokenExpirationDate(tokenExpirationTime);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token,
				isAdmin,
				expiration: tokenExpirationTime.toISOString() //ISO string = preserves date data
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setIsAdmin(null);
		localStorage.removeItem('userData');
	}, []);

	//set auto-logout timer based on token expiration time from state
	useEffect(
		() => {
			if (token && tokenExpirationDate) {
				const remainingTime =
					tokenExpirationDate.getTime() - new Date().getTime();
				//set setTimeout id to logoutTimer variable outside app
				logoutTimer = setTimeout(logout, remainingTime);
			} else {
				//if user clicks logout & clears token, also clears logoutTimer
				clearTimeout(logoutTimer);
			}
		},
		[ token, logout, tokenExpirationDate ]
	);

	//auto login on page refresh if token is valid
	useEffect(
		() => {
			const storedData = JSON.parse(localStorage.getItem('userData'));

			//if localstorage has token && not expired
			if (
				storedData &&
				storedData.token &&
				new Date(storedData.expiration) > new Date()
			) {
				login(
					storedData.userId,
					storedData.token,
					storedData.isAdmin,
					new Date(storedData.expiration)
				);
			}
		},
		[ login ]
	);

	return { userId, token, isAdmin, login, logout };
};

export default useAuth;
