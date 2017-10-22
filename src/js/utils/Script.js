import React from "react";
import namor from "namor";

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPatient = () => {
    const statusChance = Math.random();
    return {
        firstName: namor.generate({ words: 1, numbers: 0 }),
        lastName: namor.generate({ words: 1, numbers: 0 }),
        mandatoryMedicine: 'Medicine ' + Math.floor(Math.random() * 130),
        optionalMedicine: 'Medicine ' + Math.floor(Math.random() * 130),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? "relationship"
                : statusChance > 0.33 ? "complicated" : "single"
    };
};

//TODO NICO: Change value to 250000
export function mockData(len = 5000) {
    return range(len).map(d => {
        return {
            ...newPatient(),
            children: range(10).map(newPatient)
        };
    });
}
