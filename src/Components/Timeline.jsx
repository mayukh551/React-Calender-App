import React from "react";

const Timeline = ({ timeSlots }) => {
    return (
        <div className="h-full w-[15%] text-center">
            {timeSlots.map((el) => {
                console.log(el);
                return (
                    <div
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
