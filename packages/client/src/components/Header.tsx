import React from "react";
import styled from "styled-components";

import icon from "static/logo.png";

export const HeaderContainer = styled.div`
	position: absolute;
	top: 1rem;
	left: 50%;
	transform: translateX(-50%);
`;

export const Header = () => {
	return (
		<HeaderContainer>
			<img src={icon} alt="Header icon" />
		</HeaderContainer>
	)
}
