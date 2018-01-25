import React, { Component } from 'react';

import { firestore } from '../../fire';

import { TodoContainer, Loader } from './styles';

import Task from './Task';
import CreateTask from './CreateTask';

export default class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			tasks: [],
		};

		this.handleTaskChange = this.handleTaskChange.bind(this);
	}

	handleTaskChange() {}

	componentDidMount() {
		// Used for a once pull, will have to refresh page to see updates

		// firestore
		// 	.collection('users')
		// 	.doc(this.props.uid)
		// 	.get()
		// 	.then(result => {
		// 		result.data().tasks &&
		// 			this.setState({ tasks: result.data().tasks, loading: false });
		// 	});

		// Used for real time data updates

		firestore
			.collection('users')
			.doc(this.props.uid)
			.collection('Tasks')
			.onSnapshot(result => {
				let tasks = [];
				result.forEach(doc => {
					tasks.push({ ...doc.data(), id: doc.id });
				});
				this.setState({ tasks: tasks, loading: false });
			});
	}

	render() {
		const { loading, tasks } = this.state;
		const { uid } = this.props;
		return (
			<TodoContainer>
				{loading ? (
					<React.Fragment>
						<Loader>
							<span role="img" aria-label="loading">
								🧜
							</span>
						</Loader>
					</React.Fragment>
				) : (
					tasks &&
					tasks.map((task, i) => {
						return <Task key={i} uid={uid} task={task} />;
					})
				)}
				{!loading && <CreateTask uid={uid} />}
			</TodoContainer>
		);
	}
}
