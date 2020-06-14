import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({
	component: Component,
	userRoute,
	adminRoute,
	match,
	...rest
}) => {
	const auth = useContext(AuthContext);
	const props = { ...rest };
	const user = props.computedMatch.params.userID;

	if (userRoute) {
		return (
			<Route
				{...rest}
				render={props =>
					auth.isLoggedIn &&
					auth.isAdmin === false &&
					auth.userId === user ? (
						<Component {...props} />
					) : (
						<Redirect to='/' />
					)}
			/>
		);
	} else if (adminRoute) {
		return (
			<Route
				{...rest}
				render={props =>
					auth.isLoggedIn && auth.isAdmin === true ? (
						<Component {...props} />
					) : (
						<Redirect to='/' />
					)}
			/>
		);
	} else {
		return <Redirect to='/' />;
	}
};

export default ProtectedRoute;
