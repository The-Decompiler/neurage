import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const AppWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #333333ff;
	color: white;
`;

export const App = () => {
	return (
		<div></div>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<AppWrapper>
			<App />
		</AppWrapper>
	</React.StrictMode>,
	document.getElementById("root")
);
