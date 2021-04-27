import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Camera } from "components/Camera";

const predictAgeEndpoint = "predict_age";

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
	const [payload, setPayload] = useState<number[]>([]);
	const [age, setAge] = useState(0);

	useEffect(() => {
		if (payload.length != 0) {
			fetch(import.meta.env.VITE_BACKEND_URL + predictAgeEndpoint, {
				"method": "POST",
				"headers": { "Content-Type": "application/json" },
				"body": JSON.stringify(payload)
			}).then(response => response.json())
				.then(data => setAge(data.age))
				.catch(err => console.error(err));
		}
	}, [payload]);

	return (
		<>
			<Camera setPayload={setPayload} />
			{ age && <div>You are {age} years old</div>}
		</>
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
