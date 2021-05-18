import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Header } from "components/Header";
import { Camera } from "components/Camera";
import { AgeComponent } from "components/AgeComponent";
import { Footer } from "components/Footer";

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
				"body": JSON.stringify({ "image_list": payload })
			}).then(response => response.json())
				.then(data => setAge(data.age))
				.catch(err => {
					console.error(err);
					setAge(-1);
				});
		}
	}, [payload]);

	return (
		<>
			<Header />
			<Camera setPayload={setPayload} />
			{ (age != 0) && <AgeComponent age={age} /> }
			<Footer />
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
