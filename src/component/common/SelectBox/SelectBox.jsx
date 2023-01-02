import React from "react";

export default function SelectBox({ option, onChange }) {
  return (
    <select onChange={onChange}>
      {option.map((val, idx) => {
        const { name, id } = val;
        return (
          <option key={`${name}${idx}`} value={id}>
            {name}
          </option>
        );
      })}
    </select>
  );
}
