import React, { useContext } from 'react';
import axios from 'axios';

import useInputState from '../../hooks/useInputState';
import useMessage from '../../hooks/useMessage';
import { AuthContext } from '../../contexts/AuthContext';
import { withRouter } from 'react-router-dom';

import MessageContainer from '../../components/MessageContainer/MessageContainer';
import AdminFormInput from '../../components/admin/AdminForm/AdminFormInput';

const AdminLogin = props => {
	const auth = useContext(AuthContext);
	const [ message, setMessage, clearMessage ] = useMessage('');
	const [ adminName, setAdminName, resetAdminName ] = useInputState('admin');
	const [ password, setPassword, resetPassword ] = useInputState('admin111');

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/admin/login`,
				{
					adminName: adminName,
					password: password
				}
			);

			if (res.status !== 200) {
				console.log(res);
				throw new Error(res.data.error);
			}
			const { token, userId, isAdmin } = res.data;

			auth.login(userId, token, isAdmin);
			props.history.push('/admin/dashboard');
		} catch (error) {
			if (error.response) {
				resetAdminName();
				resetPassword();

				setMessage({
					type: 'error',
					description: error.response.data.error
				});
				clearMessage();
			}
		}
	};

	return (
		<main className='main-content'>
			<div className='u-full-width'>
				<h2>admin</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<AdminFormInput
							type='text'
							name='adminName'
							placeholder='Admin Name'
							value={adminName}
							handleChange={setAdminName}
							autoComplete='username'
						/>
					</div>
					<div>
						<AdminFormInput
							type='password'
							name='password'
							placeholder='Password'
							value={password}
							handleChange={setPassword}
							autoComplete='password'
						/>
					</div>

					<div className='form__footer-controls'>
						<button className='btn btn-primary'>Log In</button>
						<MessageContainer
							type={message.type ? message.type : 'hidden'}>
							{message.description}
						</MessageContainer>
					</div>
				</form>
			</div>
		</main>
	);
};

export default withRouter(AdminLogin);
