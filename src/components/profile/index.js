import React, { Component } from 'react';

import { firestore } from '../../fire';
import { ProfilePictureContainer, ProfilePicture } from './styles';
import EditProfilePic from './EditProfilePic';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editPic: false,
			profilePic: '',
		};
		this.closeModal = this.closeModal.bind(this);
	}

	closeModal() {
		this.setState({ editPic: false });
	}

	componentDidMount() {
		firestore
			.collection('users')
			.doc(this.props.uid)
			.onSnapshot(result => {
				if (result.exists) {
					this.setState({
						profilePic: result.data().profilePic,
					});
				}
			});
	}

	render() {
		const { profilePic, editPic } = this.state;
		return (
			<div>
				{editPic && (
					<EditProfilePic
						uid={this.props.uid}
						closeModal={this.closeModal}
						profilePic={profilePic}
					/>
				)}
				<ProfilePictureContainer
					onClick={() => {
						this.setState({ editPic: !this.state.editPic });
					}}>
					<ProfilePicture src={profilePic} />
				</ProfilePictureContainer>
			</div>
		);
	}
}
