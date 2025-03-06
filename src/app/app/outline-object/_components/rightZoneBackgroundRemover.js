"use client"
import React from "react"

export default function RightEditZone({ outLineValue, setOutLineValue, outLineColor, setOutLineColor }) {
    const handleThickValueChange = (e) => {
        setOutLineValue(e.target.value);
    };
    const handleThickColorChange = (e) => {
        setOutLineColor(e.target.value);
    };



    return (
        <div className="flex flex-col gap-y-2 px-2 py-4">
            <span className="text-sm opacity-80 font-semibold text-left">Adjust Thickness Value</span>
            <input
                type="range"
                min="0"
                max="20"
                value={outLineValue}
                onChange={handleThickValueChange}
                className="slider"
            />

            <span className="text-sm opacity-80 font-semibold text-left mt-4">Select Outline Color</span>
            <input
                type="color"
                min="0"
                max="20"
                value={outLineColor}
                onChange={handleThickColorChange}
                className="slider"
            />
        </div>
    );
}