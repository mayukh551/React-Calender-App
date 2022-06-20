import React from "react";
import Form from "./Form";

const Week = (props) => {
    const weekdays = ["Sun", "Mon", "Tue", " Wed", "Thurs", "Fri", "Sat"];
    const dayNo = [15, 16, 17, 18, 19, 20, 21];

    return (
        // <div className="h-28 w-full flex flex-row gap-x-24 justify-end">
        <div className="relative w-full flex h-32 ">
            <div className="w-[14%]">
                <Form newTaskHandler={props.newTaskHandler} />
            </div>
            <div className="w-full grid grid-cols-7 justify-items-center py-4 px-4">
                {weekdays.map((weekday, index) => {
                    return (
                        <div
                            key={index}
                            className="text-sm md:text-base w-10 md:w-14 flex flex-col items-center justify-evenly bg-indigo-600 text-white py-2 px-1 rounded-full"
                        >
                            <div>{weekday}</div>
                            <div>{dayNo[index]}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Week;
