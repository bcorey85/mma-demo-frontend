import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../../contexts/AuthContext';
import useMessage from '../../../hooks/useMessage';
import MessageContainer from '../../../components/MessageContainer/MessageContainer';
import AdminFormHeader from '../../../components/admin/AdminForm/AdminFormHeader';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const EditSeasonList = () => {
	const auth = useContext(AuthContext);
	const [ message, setMessage, clearMessage ] = useMessage();
	const [ seasonNumbers, setSeasonNumbers ] = useState('');
	const [ isLoading, setIsLoading ] = useState(true);
	useEffect(
		() => {
			const getSeasonList = async () => {
				try {
					const res = await axios.get(
						`${process.env.REACT_APP_API_URL}/admin/season/`,
						{
							headers: {
								Authorization: 'Bearer ' + auth.token
							}
						}
					);
					setSeasonNumbers(res.data.seasonNumbers);
					setIsLoading(false);
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
			getSeasonList();
		},
		[ auth.token, clearMessage, setMessage ]
	);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<main className='main-content--fw'>
			<AdminFormHeader title='Select Season to Edit' />
			<ul className='link-list'>
				{seasonNumbers.map(seasonNumber => (
					<li key={seasonNumber}>
						<NavLink
							to={`/admin/season/${seasonNumber}/edit`}
							className='link-list__link'>
							Season {seasonNumber}
						</NavLink>
					</li>
				))}
			</ul>
			<MessageContainer type={message.type}>
				{message.description}
			</MessageContainer>
		</main>
	);
};

export default EditSeasonList;
