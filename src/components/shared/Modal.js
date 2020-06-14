import React from 'react';

import './Modal.scss';
const Modal = props => {
	return (
		<div className='modal' onClick={props.toggleModal}>
			<div className='modal__content'>
				<h2>{props.header1}</h2>
				<h3>{props.header2}</h3>
				<div className='modal__controls'>
					<button
						className='btn btn-primary'
						onClick={props.toggleModal}>
						Cancel
					</button>
					<button
						onClick={props.modalAction}
						className={`btn ${props.modalActionText.toLowerCase() ===
						'delete'
							? 'btn-delete'
							: 'btn-primary'}`}>
						{props.modalActionText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
