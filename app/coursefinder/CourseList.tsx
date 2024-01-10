"use client";
import React, { useState } from "react";

const CourseList = () => {
	const [inputValue, setInputValue] = useState("");
	const hardcodedSuggestions = [
		"apple",
		"banana",
		"orange",
		"pear",
		"grape",
		"pineapple",
		"peach",
	];
	const [suggestions, setSuggestions] = useState([""]);

	const handleInputChange = (e: any) => {
		const value = e.target.value;
		setInputValue(value);

		// Filter hardcoded suggestions based on user input
		const filteredSuggestions = hardcodedSuggestions.filter((suggestion) =>
			suggestion.toLowerCase().includes(value.toLowerCase())
		);

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

export default CourseList;
