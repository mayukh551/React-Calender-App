import React from "react";

const Timeline = ({ timeSlots }) => {
    return (
        <div className="w-[15%] text-center">
            {timeSlots.map((el, index) => {
                return (
                    <div
                        key={index}
                        className={`${
                            el === "9:30 hrs" ? "h-[122px]" : "h-28"
                        } flex flex-col justify-end`}
                    >
                        {el}
                    </div>
                );
            })}
        </div>
    );
};

export default Timeline;
