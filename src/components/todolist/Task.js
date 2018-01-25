import React, { Component } from 'react';
import { firestore } from '../../fire';
import { TaskContainer, TaskName, DueTime, DeleteButton } from './styles';

export default class Task extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
		};

		this.deleteItem = this.deleteItem.bind(this);
	}

	deleteItem() {
		firestore
			.collection('users')
			.doc(this.props.uid)
			.collection('Tasks')
			.where('id', '==', this.props.task.id)
			.get()
			.then(querySnapshot => {
				const batch = firestore.batch();

				querySnapshot.forEach(doc => {
					batch.delete(doc.ref);
				});
				return batch.commit();
			});
	}

	render() {
		const { name, dueDate } = this.props.task;

		return (
			<TaskContainer>
				<TaskName>{name}</TaskName>
				<DueTime>{dueDate}</DueTime>
				<DeleteButton onClick={this.deleteItem}>Delete</DeleteButton>
			</TaskContainer>
		);
	}
}
