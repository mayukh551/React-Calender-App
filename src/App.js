import { useState } from "react";
import Grid from "./Components/Grid";
import Header from "./Components/Header";
import Week from "./Components/Week";

import taskData from './Components/taskInfo.json';

function App() {
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
	const slotNo = ['9:30 hrs', '10:30 hrs', '11:30 hrs'];

	const [taskSchedule, setTaskSchedule] = useState(taskData);

	const newTaskHandler = (newTask) => {
		var slot = slotNo.findIndex(el => el === newTask.time);
		var day = weekdays.findIndex(el => el === newTask.day);

		taskSchedule[slot][day].day = newTask.day;
		taskSchedule[slot][day].description = newTask.description;
		taskSchedule[slot][day].time = newTask.time;
		taskSchedule[slot][day].title = newTask.title;

		setTaskSchedule([...taskSchedule]);
	}

	return (
		<div className="h-screen overflow-hidden">
			<Header />
			<div className="rounded-3xl shadow-2xl pb-8 w-[95%] mx-8">
				<Week newTaskHandler={newTaskHandler} />
				<Grid taskSchedule={taskSchedule} />
			</div>
		</div>
	);
}

export default App;
