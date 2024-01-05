"use client";
import courses from "@/utils/getCourse";
import React, { useState } from "react";

const CourseField = () => {
	const [inputValue, setInputValue] = useState("");
	const [suggestions, setSuggestions] = useState([""]);

	const handleInputChange = (e: any) => {
		const value = e.target.value;
		setInputValue(value);

		if (value == "") {
			setSuggestions([]);
			return;
		}
		let filteredSuggestions: Array<string> = [];
		let count = 0;
		for (let suggestion of courses) {
			if (
				count < 20 &&
				suggestion.toLowerCase().startsWith(value.toLowerCase())
			) {
				filteredSuggestions.push(suggestion);
				count++;
			}
		}
		// const filteredSuggestions = hardcodedSuggestions.filter((suggestion) =>
		// 	suggestion.toLowerCase().includes(value.toLowerCase())
		// );

		setSuggestions(filteredSuggestions);
	};

	const handleSuggestionClick = (suggestion: string) => {
		setInputValue(suggestion);
		setSuggestions([]); // Clear suggestions after clicking on a suggestion
	};

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Type here..."
			/>
			<ul>
				{suggestions.map((suggestion, index) => (
					<li key={index} onClick={() => handleSuggestionClick(suggestion)}>
						{suggestion}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CourseField;
