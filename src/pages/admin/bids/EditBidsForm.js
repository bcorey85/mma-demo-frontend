import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';
import useMessage from '../../../hooks/useMessage';
import calcPoints from '../../../utils/calcPoints';
import httpRequest from '../../../utils/httpRequest';

import Modal from '../../../components/shared/Modal';
import AdminFormHeader from '../../../components/admin/AdminForm/AdminFormHeader';
import AdminFormFooterControls from '../../../components/admin/AdminForm/AdminFormFooterControls';
import MessageContainer from '../../../components/MessageContainer/MessageContainer';
import EditBidsFormHeader from '../../../components/admin/EditBidsForm/EditBidsFormHeader';
import EditBidsFormBids from '../../../components/admin/EditBidsForm/EditBidsFormBids';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const EditBidsForm = props => {
	const auth = useContext(AuthContext);
	const { seasonID, cardID, fightID } = props.match.params;
	const [ isLoading, setIsLoading ] = useState(true);
	const [ fighters, setFighters ] = useState();
	const [ bids, setBids ] = useState();
	const [ message, setMessage, clearMessage ] = useMessage('');
	const [ deleteBidsModalShowing, setDeleteBidsModalShowing ] = useState(
		false
	);

	useEffect(
		() => {
			const getBids = async () => {
				try {
					const response = await httpRequest({
						method: 'get',
						url: `${process.env
							.REACT_APP_API_URL}/admin/season/${seasonID}/card/${cardID}/fight/${fightID}/edit`,
						token: auth.token
					});

					if (response && response.type === 'error') {
						setMessage({
							type: 'error',
							description: response.description
						});
						clearMessage();
						return;
					}

					setFighters({
						fighter1: response.data.fight.fighter1,
						fighter2: response.data.fight.fighter2
					});
					setBids({
						fighter1Bids: response.data.fighter1Bids,
						fighter2Bids: response.data.fighter2Bids
					});
				} catch (error) {
					console.log(error);
					props.history.push('/500');
				}

				setIsLoading(false);
			};
			getBids();
		},
		[
			auth.token,
			cardID,
			fightID,
			seasonID,
			setBids,
			setFighters,
			clearMessage,
			props.history,
			setMessage
		]
	);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const toggleDeleteBidsModal = e => {
		e.preventDefault();
		setDeleteBidsModalShowing(!deleteBidsModalShowing);
	};

	const deleteBids = async e => {
		e.preventDefault();
		try {
			const response = await httpRequest({
				method: 'delete',
				url: `${process.env
					.REACT_APP_API_URL}/admin/season/${seasonID}/card/${cardID}/fight/${fightID}`,
				token: auth.token,
				history: props.history,
				redirectURL: `/admin/season/${seasonID}/card/${cardID}/edit`,
				message: 'Bids deleted successfully'
			});

			if (response && response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.description
				});
				clearMessage();
			}
		} catch (error) {
			console.log(error);
			props.history.push('/500');
		}
	};

	const updateSingleBid = (bid, moneyLine, outcome, newBid) => {
		if (outcome === 'x' || outcome === '') {
			return {
				...bid, //spread previous bid to keep player names
				bid: newBid || bid.bid, //update to new bid if given or keep old one
				outcome,
				points: ''
			};
		} else {
			const points = calcPoints(moneyLine, bid.bid, outcome);
			return {
				...bid,
				bid: newBid || bid.bid,
				outcome,
				points
			};
		}
	};

	const handleOutcomeChange = e => {
		const identifiers = e.target.name.split('-');
		const fighter = identifiers[0];
		const outcome = e.target.value.toLowerCase();

		// loop through bids to change child & calc points
		updateOutcomeState(fighter, outcome);
	};

	const handleBidChange = e => {
		const identifiers = e.target.name.split('-');
		const fighterBids = identifiers[0];
		const index = identifiers[1];
		const field = identifiers[2];
		if (bids[fighterBids][index].outcome) {
			const newBidState = { ...bids };
			const prevBid = newBidState[fighterBids][index];
			// fighterBids = 'fighter1Bids', substring = 'fighter1'
			const fighter = fighterBids.substring(0, 8);
			const moneyLine = fighters[fighter].moneyLine;
			const outcome = fighters[fighter].outcome;
			const newBid = e.target.value;

			const updatedBid = updateSingleBid(
				prevBid,
				moneyLine,
				outcome,
				newBid
			);
			newBidState[fighterBids][index] = updatedBid;
			setBids(newBidState);
		} else {
			const newBidState = { ...bids };
			newBidState[fighterBids][index][field] = e.target.value;
			setBids(newBidState);
		}
	};

	const updateOutcomeState = (fighter, outcome) => {
		let outcome1;
		let outcome2;
		if (
			// if f1 input changed to w, set f2 to loss OR if f2 input changed to l, change f1 to w
			(fighters[fighter].name === fighters.fighter1.name &&
				outcome === 'w') ||
			(fighters[fighter].name === fighters.fighter2.name &&
				outcome === 'l')
		) {
			outcome1 = 'w';
			outcome2 = 'l';
		} else if (
			// if f1 input changed to l, set f2 to win OR if f1 input changed to w, change f1 to l
			(fighters[fighter].name === fighters.fighter1.name &&
				outcome === 'l') ||
			(fighters[fighter].name === fighters.fighter2.name &&
				outcome === 'w')
		) {
			outcome1 = 'l';
			outcome2 = 'w';
		} else if (
			(fighters[fighter].name === fighters.fighter1.name &&
				outcome === 'x') ||
			(fighters[fighter].name === fighters.fighter2.name &&
				outcome === 'x')
		) {
			outcome1 = 'x';
			outcome2 = 'x';
		} else {
			outcome1 = '';
			outcome2 = '';
		}

		setFighters(
			{ ...fighters },
			(fighters.fighter1.outcome = outcome1),
			(fighters.fighter2.outcome = outcome2)
		);

		updateBidState();
	};

	const updateBidState = () => {
		let f1Bids = [ ...bids.fighter1Bids ];
		let f2Bids = [ ...bids.fighter2Bids ];

		f1Bids = f1Bids.map(bid =>
			updateSingleBid(
				bid,
				fighters.fighter1.moneyLine,
				fighters.fighter1.outcome
			)
		);
		f2Bids = f2Bids.map(bid =>
			updateSingleBid(
				bid,
				fighters.fighter2.moneyLine,
				fighters.fighter2.outcome
			)
		);

		const updatedState = { ...bids };
		updatedState.fighter1Bids = f1Bids;
		updatedState.fighter2Bids = f2Bids;

		setBids(updatedState);
	};

	//Send to DB
	const editBids = async e => {
		e.preventDefault();
		const newBids = {
			fighter1: fighters.fighter1,
			fighter2: fighters.fighter2,
			fighter1Bids: bids.fighter1Bids,
			fighter2Bids: bids.fighter2Bids
		};

		try {
			const response = await httpRequest({
				method: 'put',
				url: `${process.env
					.REACT_APP_API_URL}/admin/season/${seasonID}/card/${cardID}/fight/${fightID}`,
				token: auth.token,
				payload: newBids,
				history: props.history,
				redirectURL: `/admin/season/${seasonID}/card/${cardID}/edit`,
				message: 'Bids updated successfully'
			});

			if (response && response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.description
				});
				clearMessage();
			}
		} catch (error) {
			console.log(error);
			props.history.push('/500');
		}
	};

	return (
		<main className='main-content--fw'>
			<AdminFormHeader
				title='Edit Bids'
				subtitle={`Season ${seasonID} - Card ${cardID} - Fight ${fightID}`}
			/>

			<div>
				<form className='fight-card-form admin-form'>
					<div className='fight-card-form__body'>
						<div className='fight-card-form__body--left'>
							<EditBidsFormHeader
								fighter={fighters.fighter1}
								fighterNumber='1'
								handleChange={handleOutcomeChange}
							/>
							<EditBidsFormBids
								bids={bids.fighter1Bids}
								fighterNumber='1'
							/>
						</div>

						<div className='fight-card-form__body--right'>
							<EditBidsFormHeader
								fighter={fighters.fighter2}
								fighterNumber='2'
								handleChange={handleOutcomeChange}
							/>
							<EditBidsFormBids
								bids={bids.fighter2Bids}
								fighterNumber='2'
								handleChange={handleBidChange}
							/>
						</div>
					</div>

					{deleteBidsModalShowing && (
						<Modal
							header1='Are you sure you wish to delete these BIDS?'
							header2='WARNING - This action is Permanent!'
							toggleModal={toggleDeleteBidsModal}
							modalAction={deleteBids}
							modalActionText='Delete'
						/>
					)}
				</form>

				<AdminFormFooterControls
					b1Text='Submit'
					b1HandleClick={editBids}
					b2Text={`Delete Fight ${fightID} Bids`}
					b2HandleClick={toggleDeleteBidsModal}
				/>
				<MessageContainer type={message.type}>
					{message.description}
				</MessageContainer>
			</div>
		</main>
	);
};

export default EditBidsForm;
