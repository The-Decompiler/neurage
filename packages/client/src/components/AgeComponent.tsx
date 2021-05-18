import React from "react";
import styled from "styled-components";

type Props = {
	age: number
}

export const AgeContainer = styled.div`
	position: absolute;
	left: 50%;
	bottom: 20%;
	transform: translateX(-50%);
	width: 400px;
	height: 125px;
	background-color: #333535;
	border: 1px solid #7C7E7E;
	border-radius: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: sans-serif;
`;

export const AgeComponent = (props: Props) => {
	return (
		<>
			<AgeContainer>
				{
					(props.age > 0)
					? "You are {props.age} years old"
					: "Error guessing your age"
				}
			</AgeContainer>
		</>
	)
}
