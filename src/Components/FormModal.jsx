import React, { useRef, useReducer } from "react";
import classes from "./FormModal.module.css";
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

        if (!titleIsValid) {
            dispactAction({ type: "TITLE_TOUCHED", val: true });
            return;
        }

        var enteredDay = dayRef.current.value;
        var enteredStartTime = startTimeRef.current.value;
        var enteredEndTime = endTimeRef.current.value;

        if (
            enteredStartTime === enteredEndTime ||
            enteredStartTime.slice(0, 2) > enteredEndTime.slice(0, 2)
        ) {
            dispactAction({ type: "TIME_SLOT_CONFLICT", val: true });
            return;
        }
        console.log(
            formState.conflictTimeSlot,
            enteredStartTime,
            enteredEndTime
        );

        var slot = slotNo.findIndex((el) => el === enteredEndTime);
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
            startTime: enteredStartTime,
            endTime: enteredEndTime,
            day: enteredDay,
            title: formState.enteredTitle,
            description: formState.enteredTask,
        };

        dispactAction({ type: "TITLE_TOUCHED", val: true });
        dispactAction({ type: "IF_EXIST", val: false });
        dispactAction({ type: "TIME_SLOT_CONFLICT", val: false });

        props.onClose();
        props.newTaskHandler(newSchedule, slot, day);
    };

    return (
        <form
            className={`${classes["anime-form"]} absolute top-16 left-6 h-[530px] w-[380px] shadow-2xl bg-cyan-400 flex flex-col py-5 px-7 rounded-2xl`}
            onSubmit={formEventHandler}
        >
            <label htmlFor="" className="text-lg font-semibold mb-2">
                Choose Week Day
            </label>
            <select className="rounded-lg py-2 pl-2 mb-6" ref={dayRef}>
                {weekdays.map((el) => {
                    return <option value={`${el}`}>{el}</option>;
                })}
            </select>

            <label htmlFor="startTime" className="text-lg font-semibold mb-2">
                Start Time
            </label>
            <select className="rounded-lg py-2 pl-2 mb-6" ref={startTimeRef}>
                {slotNo.map((el) => {
                    return <option value={`${el}`}>{el}</option>;
                })}
            </select>

            <label htmlFor="endTime" className="text-lg font-semibold mb-2">
                End Time
            </label>
            <select className="rounded-lg py-2 pl-2 mb-6" ref={endTimeRef}>
                {slotNo.map((el) => {
                    return <option value={`${el}`}>{el}</option>;
                })}
            </select>
            <label htmlFor="title" className="text-lg font-semibold mb-2">
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
                {formState.isExist && (
                    <p className="text-sm text-red-600">
                        Time and Date already occupied
                    </p>
                )}
            </div>
        </form>
    );
};

export default FormModal;
