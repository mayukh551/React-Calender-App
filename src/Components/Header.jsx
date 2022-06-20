import React from "react";

const Header = () => {
    return (
        <div className="flex flex-row justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold cursor-default">Timeline</h1>
            <div className="font-semibold text-slate-600">
                <span className="mr-4 cursor-default">15 - 21 June, 2022 </span>
                <i
                    className="bi bi-arrow-left-short px-3 py-2 border-2 hover:bg-slate-600 hover:text-white"
                ></i>
                <i
                    className="bi bi-arrow-right-short px-3 py-2 border-2 hover:bg-slate-600 hover:text-white"
                ></i>
            </div>
        </div>
    );
};

export default Header;
