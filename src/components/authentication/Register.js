import React, { Component } from 'react';
import { firebase, firestore } from '../../fire';

import {
	TabContent,
	TabTitle,
	SubmitButton,
	ButtonText,
	TextInput,
} from './styles';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailError: '',
			passwordError: '',
			loading: true,
		};
		this.createAccount = this.createAccount.bind(this);
	}

	createAccount() {
		const { email, password } = this.state;

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(result => {
				const userRef = firestore.collection('users').doc(result.uid);
				userRef.set({
					email: email,
					profilePic:
						'https://firebasestorage.googleapis.com/v0/b/devicttalk.appspot.com/o/profilePictures%2Fprofile-placeholder.gif?alt=media&token=c275920d-11ac-4fba-b768-b17c9abb20ac',
				});
			})
			.catch(error => {
				this.setState({ error: error.message });
			});
	}

	componentDidMount() {}
	render() {
		return (
			<TabContent>
				<TabTitle>Register</TabTitle>
				<TextInput
					error={this.state.emailError}
					placeholder="Email"
					onChange={e => {
						this.setState({ email: e.target.value });
					}}
				/>
				<TextInput
					last
					error={this.state.passwordError}
					type="password"
					placeholder="Password"
					onChange={e => {
						this.setState({ password: e.target.value });
					}}
				/>
				<SubmitButton onClick={this.createAccount}>
					{' '}
					<ButtonText>Create Account</ButtonText>{' '}
				</SubmitButton>
			</TabContent>
		);
	}
}
