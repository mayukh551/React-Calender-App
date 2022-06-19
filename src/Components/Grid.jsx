import Timeline from "./Timeline";

const Grid = () => {
    const timeSlots = [];

    const days = [];

    for (let i = 1; i <= 16; i++) {
        if (i <= 7) days.push(i);

        timeSlots.push(i);
    }

    return (
        <div className="h-full overflow-y-scroll">
            <div className="flex">
                <Timeline />
                <div>
                    {timeSlots.map((e1) => {
                        return (
                            <div className="w-full flex flex-grow" key={e1}>
                                {days.map((el) => {
                                    return (
                                        <div
                                            className="py-3 px-2 border-[1px] border-gray-900 h-28 inline-block text-center bg-orange-400"
                                            key={el}
                                        >
                                            Lorem ipsum dolor sit amet.
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
