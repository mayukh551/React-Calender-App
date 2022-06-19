import React, { useState } from "react";
import FormModal from "./FormModal";

const Form = () => {
    const [addTask, setAddTask] = useState(false);
    const showFormHandler = () => {
        setAddTask((prevTask) => !prevTask);
    };

    return (
        <>
            <div className="flex h-full w-full justify-center items-center">
                {!addTask && (
                    <button
                        className="bg-orange-500 hover:bg-orange-600 active:bg-orange-400 text-white px-6 py-2 rounded-3xl"
                        onClick={showFormHandler}
                    >
                        Add Task
                    </button>
                )}
                {addTask && <FormModal onClose={showFormHandler}/>}
            </div>
        </>
    );
};

export default Form;
