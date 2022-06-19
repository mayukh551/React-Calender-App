import React from "react";
import classes from "./FormModal.module.css";

const FormModal = (props) => {
    const formEventHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form
            className={`${classes["anime-form"]} justify-evenly absolute top-16 left-6 h-[80%] w-[300px] shadow-2xl bg-cyan-400 flex flex-col py-5 px-7 rounded-2xl`}
            onSubmit={formEventHandler}
        >
            <label htmlFor="" className="text-lg font-semibold">
                Date
            </label>
            <input type="date" name="" id="" className="rounded-lg py-2 pl-2" />
            <label htmlFor="timeSlot" className="text-lg font-semibold">
                Choose Time Slot
            </label>
            <input type="text" id="timeSlot" className="rounded-lg py-2 pl-2" />
            <label htmlFor="task" className="text-lg font-semibold">
                Enter Task
            </label>
            <input
                type="text"
                id="task"
                className="h-10 rounded-lg py-2 pl-2"
            />
            <div className="w-full text-right mt-3">
                <button
                    onClick={props.onClose}
                    className="rounded-full bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 active:bg-purple-500"
                >
                    Close
                </button>
                <button className="ml-4 rounded-full bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 active:bg-purple-500">
                    Add
                </button>
            </div>
        </form>
    );
};

export default FormModal;
