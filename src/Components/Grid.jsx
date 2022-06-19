import Timeline from "./Timeline";

const Grid = () => {
    // const timeSlots = ['9:30 am', '10:30 am', '11:30 am', '12:30 pm'];
    const timeSlots = [];

    const days = [];

    for (let i = 9; i <= 23; i++) {
        timeSlots.push(`${i}:${30} hrs`);
    }

    for (let i = 1; i <= 7; i++) {
        if (i <= 7) days.push(i);
    }

    return (
        <div className="h-full overflow-y-scroll pt-5">
            <div className="flex">
                <Timeline timeSlots={timeSlots} />
                <div className="w-full">
                    {timeSlots.map((e1) => {
                        return (
                            // for every time slot, display 7 days
                            <div className="w-full flex flex-grow" key={e1}>
                                {days.map((el) => {
                                    return (
                                        <div
                                            className="py-3 px-2 border-[0.1px] border-gray-900 h-28 w-[14.28%] inline-block text-center"
                                            key={el}
                                        >
                                            {/* Lorem ipsum dolor sit amet. */}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Grid;
