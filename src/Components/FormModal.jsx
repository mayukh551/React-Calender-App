import React, { useRef, useReducer } from "react";
import classes from "./FormModal.module.css";
import Select from "./Select";
import tasks from "./taskInfo.json";

const formReducer = (state, action) => {
    if (action.type === "UPDATE_TITLE")
        return {
            ...state,
            enteredTitle: action.val,
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
    } else if (action.type === "TIME_SLOT_CONFLICT") {
        return {
            ...state,
            conflictTimeSlot: action.val,
        };
    }

    return state;
};

const FormModal = (props) => {
    const [formState, dispactAction] = useReducer(formReducer, {
        isExist: false,
        enteredTitle: "",
        isTitleInputTouched: false,
        conflictTimeSlot: false,
    });

    const titleIsValid = formState.enteredTitle.trim() !== "";
    const titleInputHasError = !titleIsValid && formState.isTitleInputTouched;

    const updateTitleInput = (event) => {
        dispactAction({ type: "UPDATE_TITLE", val: event.target.value });
    };

    const titleBlurHandler = () => {
        dispactAction({ type: "TITLE_TOUCHED", val: true });
    };

    const dayRef = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    const slotNo = ["09:30 hrs", "10:30 hrs", "11:30 hrs", "12:30 hrs"];

    const formEventHandler = (event) => {
        event.preventDefault();

        var enteredDay = dayRef.current.value;
        var enteredStartTime = startTimeRef.current.value;
        var enteredEndTime = endTimeRef.current.value;

        if (
            enteredStartTime === enteredEndTime ||
            enteredStartTime.slice(0, 2) > enteredEndTime.slice(0, 2)
        ) {
            dispactAction({ type: "TIME_SLOT_CONFLICT", val: true });
            if (!titleIsValid) {
                dispactAction({ type: "TITLE_TOUCHED", val: true });
                return;
            }
            return;
        }

        dispactAction({ type: "TIME_SLOT_CONFLICT", val: false });

        if (!titleIsValid) {
            dispactAction({ type: "TITLE_TOUCHED", val: true });
            return;
        }

        var day = weekdays.findIndex((el) => el === enteredDay);
        var startIndex = slotNo.findIndex((el) => el === enteredStartTime);
        var endIndex = slotNo.findIndex((el) => el === enteredEndTime);

        // There is already an existing task
        var count = 0;

        // Checking for empty cells if present
        for (let i = startIndex + 1; i <= endIndex; i++) {
            if (Object.keys(tasks[i][day]).length === 0) count = count + 1;
            else if (
                Object.keys(tasks[i][day]).length !== 0 &&
                tasks[i][day].title === ""
            )
                count = count + 1;
        }

        if (count < endIndex - startIndex) {
            dispactAction({ type: "IF_EXIST", val: true });
            return;
        }

        dispactAction({ type: "IF_EXIST", val: false });

        for (let i = startIndex + 1; i <= endIndex; i++) {
            const newSchedule = {
                startTime: slotNo[i - 1],
                endTime: slotNo[i],
                day: enteredDay,
                title: formState.enteredTitle,
                description: formState.enteredTask,
            };
            props.newTaskHandler(newSchedule, i, day);
        }

        dispactAction({ type: "TITLE_TOUCHED", val: true });

        props.onClose();
    };

    return (
        <form
            className={`${classes["anime-form"]} absolute top-2 left-3 h-[530px] w-[380px] shadow-2xl bg-cyan-400 flex flex-col py-5 px-7 rounded-2xl`}
            onSubmit={formEventHandler}
        >
            <Select label={`Choose Week Day`} options={weekdays} ref={dayRef} />
            <Select label={`Start Time`} options={slotNo} ref={startTimeRef} />
            <Select label={`End Time`} options={slotNo} ref={endTimeRef} />
            <label htmlFor="title" className="text-lg font-semibold mb-2">
                Title
            </label>
            <input
                type="text"
                id="title"
                className={`h-10 rounded-lg py-2 pl-2 ${
                    titleInputHasError
                        ? "bg-red-300 border-2 border-red-800"
                        : ""
                }`}
                onChange={updateTitleInput}
                onBlur={titleBlurHandler}
                // ref={taskTitleRef}
            />
            {titleInputHasError && (
                <p className="text-sm text-red-500">Title cannot be Empty!</p>
            )}
            <div className="w-full text-right mt-7">
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
                {formState.conflictTimeSlot && (
                    <p className="text-md text-red-600">
                        End Time should come after Start Time
                    </p>
                )}
                {!formState.conflictTimeSlot && formState.isExist && (
                    <p className="text-md text-red-600">
                        Time and Date already occupied
                    </p>
                )}
            </div>
        </form>
    );
};

export default FormModal;
