import React, { Component } from 'react';
import { firestore } from '../../fire';

import {
	CreateContainer,
	CreateText,
	InputContainer,
	TextInput,
	SaveButton,
} from './styles';

export default class CreateTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createActive: false,
			name: '',
			dueDate: '',
		};

		this.createTask = this.createTask.bind(this);
	}

	createTask() {
		const { uid } = this.props;
		const { name, dueDate } = this.state;
		let newTaskRef = firestore
			.collection('users')
			.doc(uid)
			.collection('Tasks')
			.doc();
		newTaskRef.set({ name, dueDate, id: newTaskRef.id }).then(() => {
			this.setState({ createActive: false, name: '', dueDate: '' });
		});
	}

	render() {
		return (
			<CreateContainer>
				<CreateText onClick={() => this.setState({ createActive: true })}>
					Create a Task
				</CreateText>
				{this.state.createActive && (
					<InputContainer>
						<TextInput
							type="text"
							placeholder="Task Name"
							onChange={e => this.setState({ name: e.target.value })}
						/>
						<TextInput
							type="date"
							placeholder="Due Date"
							onChange={e => {
								this.setState({ dueDate: e.target.value });
							}}
						/>
						<SaveButton onClick={this.createTask}> Save </SaveButton>
					</InputContainer>
				)}
			</CreateContainer>
		);
	}
}
