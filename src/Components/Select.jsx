import React from "react";

const Select = React.forwardRef((props, ref) => {
    const label = props.label;
    const options = props.options;

    return (
        <>
            <label htmlFor="" className="text-lg font-semibold mb-2">
                {label}
            </label>
            <select className="rounded-lg py-2 pl-2 mb-6" ref={ref}>
                {options.map((el, index) => {
                    return <option key={index} value={`${el}`}>{el}</option>;
                })}
            </select>
        </>
    );
});

export default Select;
