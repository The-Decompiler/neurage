import React from "react";
import styled from "styled-components";

import icongs from "static/logo-gs.png";

export const FooterContainer = styled.div`
	position: absolute;
	left: 50%;
	bottom: 3rem;
	transform: translateX(-50%);
`;

export const Footer = () => {
	return (
		<FooterContainer>
			<img src={icongs} alt="Footer icon" />
		</FooterContainer>
	)
}
