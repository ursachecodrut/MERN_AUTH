import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrivateScreen = ({ history }) => {
	const [error, setError] = useState('');
	const [privateData, setPrivateData] = useState('');

	useEffect(() => {
		if (!localStorage.getItem('authToken')) {
			history.push('/');
		}

		const fetchPrivateData = async () => {
			let config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.get('/api/private', config);
				setPrivateData(data.data);
			} catch (error) {
				console.log(error);
				localStorage.removeItem('authToken');
				setError('You are not authorized please login');
			}
		};

		fetchPrivateData();
	}, [history]);

	const logoutHandler = (e) => {
		localStorage.removeItem('authToken');
		history.push('/login');
	};

	return error ? (
		<span className="error-message">{error}</span>
	) : (
		<>
			<div style={{ background: 'green', color: 'white' }}>{privateData}</div>
			<button onClick={logoutHandler}>Logout</button>
		</>
	);
};

export default PrivateScreen;
