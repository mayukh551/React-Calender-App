import Timeline from "./Timeline";
const Grid = () => {
    // const timeSlots = ['9:30 am', '10:30 am', '11:30 am', '12:30 pm'];

    const tasks = [
        [
            {},
            {
                time: "9:30 hrs",
                day: "Mon",
                title: "HW",
                description: "Do Maths hw immediately",
            },
            {},
            {},
            {},
            {},
            {},
        ],
        [
            {},
            {},
            {},
            {
                time: "10:30 hrs",
                day: "Wed",
                title: "HW",
                description: "Do Maths hw immediately",
            },
            {},
            {},
            {},
        ],
        [
            {},
            {},
            {},
            {},
            {},
            {},
            {
                time: "11:30 hrs",
                day: "Sat",
                title: "HW",
                description: "Do Maths hw immediately",
            },
        ],
    ];

    const timeSlots = [];

    const days = [];

    for (let i = 9; i <= 11; i++) {
        timeSlots.push(`${i}:${30} hrs`);
    }

    for (let i = 1; i <= 7; i++) {
        days.push(i);
    }

    return (
        <div className="h-full overflow-y-scroll">
            <div className="flex">
                <Timeline timeSlots={timeSlots} />
                <div className="w-full">
                    {timeSlots.map((e1, index1) => {
                        return (
                            // for every time slot, display 7 days
                            <div className="w-full flex flex-grow" key={e1}>
                                {days.map((el, index2) => {
                                    return (
                                        <div
                                            className="py-3 px-2 border-[0.1px] border-gray-900 h-28 w-[14.28%] inline-block text-center"
                                            key={el}
                                        >
                                            {console.log(index1, index2)}
                                            {Object.keys(tasks[index1][index2])
                                                .length !== 0 ? (
                                                <>
                                                    <h3>
                                                        {
                                                            tasks[index1][
                                                                index2
                                                            ].title
                                                        }
                                                    </h3>
                                                    <h5>
                                                        {
                                                            tasks[index1][
                                                                index2
                                                            ].description
                                                        }
                                                    </h5>
                                                </>
                                            ) : (
                                                ""
                                            )}
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

// const tasks = [
//     [
//         {
//             time: "",
//             day: "Sun",
//             title: "",
//             description: "",
//         },
//         {
//             time: "9:30 hrs",
//             day: "Mon",
//             title: "HW",
//             description: "Do Maths hw immediately",
//         },
//         {
//             time: "",
//             day: "Tue",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "Wed",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "Thurs",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "Fri",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "Sat",
//             title: "",
//             description: "",
//         },
//     ],
//     [
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "10:30 hrs",
//             day: "Wed",
//             title: "HW",
//             description: "Do Maths hw immediately",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//     ],
//     [
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "",
//             day: "",
//             title: "",
//             description: "",
//         },
//         {
//             time: "11:30 hrs",
//             day: "Sat",
//             title: "HW",
//             description: "Do Maths hw immediately",
//         },
//     ],
// ];
