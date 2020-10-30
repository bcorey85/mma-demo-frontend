import React, { useContext, useState, useEffect, useCallback } from 'react';

import AdminFormHeader from '../../../components/admin/AdminForm/AdminFormHeader';
import MessageContainer from '../../../components/MessageContainer/MessageContainer';

import Modal from '../../../components/shared/Modal';
import httpRequest from '../../../utils/httpRequest';
import './SendEmail.scss';
import { AuthContext } from '../../../contexts/AuthContext';
import useMessage from '../../../hooks/useMessage';

import useDemo from '../../../hooks/useDemo';

import './EditUser.scss';

const SendEmail = props => {
	const auth = useContext(AuthContext);
	const [ message, setMessage, clearMessage ] = useMessage('');
	const [ selectedUser, setSelectedUser ] = useState('');
	const [ selectedUserData, setSelectedUserData ] = useState({});
	const [ userList, setUserList ] = useState([]);
	const [ firstName, setFirstName ] = useState('');
	const [ fightName, setFightName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ deleteUserModalShowing, setDeleteUserModalShowing ] = useState(
		false
	);

	const { handleDemoClick } = useDemo(setMessage);

	const getData = useCallback(
		async () => {
			try {
				// Get user list
				const response = await httpRequest({
					method: 'get',
					url: `${process.env.REACT_APP_API_URL}/admin/user/`,
					token: auth.token
				});

				if (response && response.type === 'error') {
					setMessage({
						type: 'error',
						description: response.type.description
					});
					clearMessage();
					return;
				}

				setUserList(response.data.users);
			} catch (error) {
				console.log(error);
				props.history.push('/500');
			}
		},
		[ auth.token, clearMessage, props.history, setMessage ]
	);

	useEffect(
		() => {
			getData();
		},
		[ getData ]
	);

	const toggleModal = e => {
		e.preventDefault();
		setDeleteUserModalShowing(!deleteUserModalShowing);
	};

	const handleUserSelect = e => {
		setSelectedUser(e.target.value);
	};

	const handleFirstName = e => {
		setFirstName(e.target.value);
	};

	const handleFightName = e => {
		setFightName(e.target.value);
	};

	const handleLastName = e => {
		setLastName(e.target.value);
	};

	const handleUserDataFetch = async e => {
		if (selectedUser === '') {
			setMessage({
				type: 'error',
				description: 'Please select a user name'
			});
			clearMessage();
			return;
		}

		try {
			const response = await httpRequest({
				method: 'get',
				url: `${process.env
					.REACT_APP_API_URL}/admin/user/${selectedUser}`,
				token: auth.token
			});
			if (response && response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.type.description
				});
				clearMessage();
				return;
			}
			setSelectedUserData(response.data.user);
			setFirstName(response.data.user.firstName);
			setFightName(response.data.user.fightName);
			setLastName(response.data.user.lastName);
		} catch (error) {
			console.log(error);
			props.history.push('/500');
		}
	};

	// eslint-disable-next-line
	const handleDeleteUser = async () => {
		try {
			const response = await httpRequest({
				method: 'delete',
				url: `${process.env
					.REACT_APP_API_URL}/admin/user/${selectedUser}`,
				token: auth.token
			});

			if (response && response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.type.description
				});
				clearMessage();
				return;
			}

			setMessage({
				type: 'success',
				description: 'User deleted successfully'
			});
			clearMessage();
			setSelectedUserData({});
			getData();
		} catch (error) {
			console.log(error);
			props.history.push('/500');
		}
	};

	// eslint-disable-next-line
	const handleEditUser = async () => {
		const payload = {
			firstName,
			fightName,
			lastName
		};

		try {
			const response = await httpRequest({
				method: 'put',
				url: `${process.env
					.REACT_APP_API_URL}/admin/user/${selectedUser}`,
				token: auth.token,
				payload: payload
			});

			if (response && response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.type.description
				});
				clearMessage();
				return;
			}

			setMessage({
				type: 'success',
				description: 'User edited successfully'
			});
			clearMessage();
			setSelectedUserData({});
			setFirstName('');
			setFightName('');
			setLastName('');
			getData();
		} catch (error) {
			console.log(error);
			props.history.push('/500');
		}
	};

	const selectedUserFields = (
		<React.Fragment>
			<label htmlFor='user-firstname'>First Name</label>
			<input value={firstName || ''} onChange={handleFirstName} />
			<label htmlFor='user-fightname'>Fight Name</label>
			<input value={fightName || ''} onChange={handleFightName} />
			<label htmlFor='user-lastname'>Last Name</label>
			<input value={lastName || ''} onChange={handleLastName} />
			<p>Email: {selectedUserData.email}</p>
			<p>Registration Date: {selectedUserData.createdAt}</p>
			<div className='edit-users__controls'>
				<button
					className='btn btn-primary--outline'
					onClick={handleDemoClick}>
					Update User
				</button>
				<button
					className='btn btn-delete--outline'
					onClick={toggleModal}>
					Delete User
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<main className='main-content--fw'>
			<AdminFormHeader title='Edit Users' />
			<section className='edit-users'>
				<label htmlFor='user-list'>Select User</label>
				<select id='user-list' onChange={handleUserSelect}>
					<option value={null} />
					{userList.map(user => {
						return (
							<option value={user._id} key={user._id}>
								{user.fightName} {user.lastName}
							</option>
						);
					})}
				</select>
				<button
					className='btn btn-primary'
					onClick={handleUserDataFetch}>
					Select User
				</button>
				{selectedUserData ? selectedUserFields : ''}

				<MessageContainer type={message.type}>
					{message.description}
				</MessageContainer>
			</section>

			{deleteUserModalShowing && (
				<Modal
					header1={`Are you sure you wish to delete this user?`}
					header2='WARNING - This action is Permanent!'
					toggleModal={toggleModal}
					modalAction={handleDemoClick}
					modalActionText='Delete'
				/>
			)}
		</main>
	);
};

export default SendEmail;
