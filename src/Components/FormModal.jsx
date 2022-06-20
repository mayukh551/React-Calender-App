import React, { useRef, useReducer } from "react";
import classes from "./FormModal.module.css";
import tasks from "./taskInfo.json";

const formReducer = (state, action) => {
    if (action.type === "UPDATE_TITLE")
        return {
            ...state,
            enteredTitle: action.val,
        };
    else if (action.type === "UPDATE_TASK")
        return {
            ...state,
            enteredTask: action.val,
        };
    else if (action.type === "TASK_TOUCHED")
        return {
            ...state,
            isTaskInputTouched: action.val,
        };
    else if (action.type === "TITLE_TOUCHED")
        return {
            ...state,
            isTitleInputTouched: action.val,
        };
    else if (action.type === "IF_EXIST") {
        return {
            ...state,
            isExist: action.val,
        };
    }

    return state;
};

const FormModal = (props) => {
    const [formState, dispactAction] = useReducer(formReducer, {
        isExist: false,
        enteredTask: "",
        isTaskInputTouched: false,
        enteredTitle: "",
        isTitleInputTouched: false,
    });

    const taskIsValid = formState.enteredTask.trim() !== "";
    const taskInputHasError = !taskIsValid && formState.isTaskInputTouched;

    const titleIsValid = formState.enteredTitle.trim() !== "";
    const titleInputHasError = !titleIsValid && formState.isTitleInputTouched;

    const updateTitleInput = (event) => {
        dispactAction({ type: "UPDATE_TITLE", val: event.target.value });
    };

    const titleBlurHandler = () => {
        dispactAction({ type: "TITLE_TOUCHED", val: true });
    };

    const updateTaskInput = (event) => {
        dispactAction({ type: "UPDATE_TASK", val: event.target.value });
    };

    const taskBlurHandler = () => {
        dispactAction({ type: "TASK_TOUCHED", val: true });
    };

    const dayRef = useRef();
    const timeRef = useRef();

    const formEventHandler = (event) => {
        event.preventDefault();

        if (!taskIsValid || !titleIsValid) {
            dispactAction({ type: "TITLE_TOUCHED", val: true });
            dispactAction({ type: "TASK_TOUCHED", val: true });
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
                dispactAction({ type: "IF_EXIST", val: true });
                return;
            }
        }

        const newSchedule = {
            time: enteredTime,
            day: enteredDay,
            title: formState.enteredTitle,
            description: formState.enteredTask,
        };

        dispactAction({ type: "TITLE_TOUCHED", val: true });
        dispactAction({ type: "TASK_TOUCHED", val: true });
        dispactAction({ type: "IF_EXIST", val: false });

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
            <label htmlFor="timeSlot" className="text-lg font-semibold">
                Choose Time Slot
            </label>
            <select className="rounded-lg py-2 pl-2" ref={timeRef}>
                <option value="9:30 hrs">9:30 hrs</option>
                <option value="10:30 hrs">10:30 hrs</option>
                <option value="11:30 hrs">11:30 hrs</option>
            </select>
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
                {formState.isExist && (
                    <p className="text-sm text-red-500">
                        Time and Date already occupied
                    </p>
                )}
            </div>
        </form>
    );
};

export default FormModal;
