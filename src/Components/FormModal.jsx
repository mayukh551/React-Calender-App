import React, { useRef, useState } from "react";
import classes from "./FormModal.module.css";
import tasks from "./taskInfo.json";

const FormModal = (props) => {
    const [isExist, setIsExist] = useState(false);

    const [enteredTask, setEnteredTask] = useState("");
    const [isTaskInputTouched, setIsTaskInputTouched] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState("");
    const [isTitleInputTouched, setIsTitleInputTouched] = useState(false);

    const taskIsValid = enteredTask.trim() !== "";
    const taskInputHasError = !taskIsValid && isTaskInputTouched;

    const titleIsValid = enteredTitle.trim() !== "";
    const titleInputHasError = !titleIsValid && isTitleInputTouched;

    const updateTitleInput = (event) => {
        setEnteredTitle(event.target.value);
    };

    const titleBlurHandler = () => {
        setIsTitleInputTouched(true);
    };

    const updateTaskInput = (event) => {
        setEnteredTask(event.target.value);
    };

    const taskBlurHandler = () => {
        setIsTaskInputTouched(true);
    };

    const dayRef = useRef();
    const timeRef = useRef();

    const formEventHandler = (event) => {
        event.preventDefault();

        if (!taskIsValid || !titleIsValid) {
            setIsTaskInputTouched(true);
            setIsTitleInputTouched(true);
            return;
        }

        var enteredDay = dayRef.current.value;
        var enteredTime = timeRef.current.value;

        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
        const slotNo = ["9:30 hrs", "10:30 hrs", "11:30 hrs"];

        var slot = slotNo.findIndex((el) => el === enteredTime);
        var day = weekdays.findIndex((el) => el === enteredDay);

        // There is already an existing task
        if (Object.keys(tasks[slot][day]).length !== 0) {
            if (
                tasks[slot][day].title !== "" &&
                tasks[slot][day].description !== ""
            ) {
                setIsExist(true);
                return;
            }
        }

        const newSchedule = {
            time: enteredTime,
            day: enteredDay,
            title: enteredTitle,
            description: enteredTask,
        };

        setIsTaskInputTouched(false);
        setIsTitleInputTouched(false);

        props.onClose();
        props.newTaskHandler(newSchedule);
    };

    return (
        <form
            className={`${classes["anime-form"]} justify-evenly absolute top-16 left-6 h-[80%] w-[380px] shadow-2xl bg-cyan-400 flex flex-col py-5 px-7 rounded-2xl`}
            onSubmit={formEventHandler}
        >
            <label htmlFor="" className="text-lg font-semibold">
                Choose Week Day
            </label>
            <select className="rounded-lg py-2 pl-2" ref={dayRef}>
                <option value="Sun">Sun</option>
                <option value="Mon">Mon</option>
                <option value="Tue">Tue</option>
                <option value="Wed">Wed</option>
                <option value="Thurs">Thurs</option>
                <option value="Fri">Fri</option>
                <option value="Sat">Sat</option>
            </select>
            {/* <input type="date" name="" id="" className="rounded-lg py-2 pl-2" /> */}
            <label htmlFor="timeSlot" className="text-lg font-semibold">
                Choose Time Slot
            </label>
            <select className="rounded-lg py-2 pl-2" ref={timeRef}>
                <option value="9:30 hrs">9:30 hrs</option>
                <option value="10:30 hrs">10:30 hrs</option>
                <option value="11:30 hrs">11:30 hrs</option>
            </select>
            {/* <input type="text" id="timeSlot" className="rounded-lg py-2 pl-2" /> */}
            <label htmlFor="title" className="text-lg font-semibold">
                Title
            </label>
            <input
                type="text"
                id="title"
                className="h-10 rounded-lg py-2 pl-2"
                onChange={updateTitleInput}
                onBlur={titleBlurHandler}
                // ref={taskTitleRef}
            />
            {titleInputHasError && (
                <p className="text-sm text-red-500">Title cannot be Empty!</p>
            )}
            <label htmlFor="task" className="text-lg font-semibold">
                Enter Task
            </label>
            <input
                type="text"
                id="task"
                className="h-10 rounded-lg py-2 pl-2"
                onChange={updateTaskInput}
                onBlur={taskBlurHandler}
                // ref={taskRef}
            />
            {taskInputHasError && (
                <p className="text-sm text-red-500">Task cannot be Empty!</p>
            )}
            <div className="w-full text-right mt-3">
                <button
                    onClick={props.onClose}
                    className="rounded-full bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 active:bg-purple-500"
                >
                    Close
                </button>
                <button
                    type="submit"
                    className="ml-4 rounded-full bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 active:bg-purple-500"
                >
                    Add
                </button>
                {isExist && (
                    <p className="text-sm text-red-500">
                        Time and Date already occupied
                    </p>
                )}
            </div>
        </form>
    );
};

export default FormModal;
