import React, { useState, useRef } from "react";
import styled from "styled-components";

import { flattenImage } from "../utils";

type Props = {
	setPayload: React.Dispatch<React.SetStateAction<number[]>>,
}

enum CameraState {
	None = "NONE",
	Off = "OFF",
	On = "ON"
}

export const VideoCamera = styled.video<{ camera: CameraState }>`
	display: ${props => (props.camera == CameraState.On) ? "initial" : "none"};
`;

export const CaptureCanvas = styled.canvas<{ camera: CameraState, tookPicture: boolean }>`
	display: ${props => (props.camera == CameraState.Off && props.tookPicture) ? "initial" : "none"};
`

export const Camera = (props: Props) => {
	const [clicking, setClicking] = useState(false);
	const [camera, setCamera] = useState<CameraState>(CameraState.Off);
	const [tookPicture, setTookPicture] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const getWebcam = async () =>
		navigator.mediaDevices.getUserMedia({ video: { width: 48, height: 48 }})
			.then(stream => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.play();
					return true;
				} else return false;
			}).catch(() => false);

	const clickAnimation = () => {
		setClicking(true);
		setTimeout(() => setClicking(false), 100);
	}

	const closeWebcam = async () =>
		navigator.mediaDevices.getUserMedia({ video: true })
			.then(stream => {
				stream.getTracks().forEach(track => track.stop());
				setCamera(CameraState.Off);
			});

	const openWebcam = async() => getWebcam()
			.then(hasCamera => setCamera(hasCamera ? CameraState.On : CameraState.None));

	const handleUseCamera = () => {
		clickAnimation();
		openWebcam();
	}

	const handleTakePicture = () => {
		clickAnimation();
		let canvas = canvasRef.current;
		if (canvas) {
			let context = canvas.getContext("2d");
			if (context && videoRef.current) {
				// Draw image to canvas
				context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
				// Get flattened image array
				let flatArray = flattenImage(context.getImageData(0, 0, canvas.width, canvas.height).data);
				setTookPicture(true);
				closeWebcam();
				props.setPayload(flatArray);
			}
		}
	}

	return (
		<>
			{ (camera == CameraState.None) && <div>No camera available</div> }
			{ (camera == CameraState.Off && !tookPicture) &&
				<Button
					onClick={handleUseCamera}
					camera={camera}
					clicking={clicking}
				>
					Use Camera
				</Button>
			}
			<CaptureCanvas
				width="48" height="48"
				camera={camera} tookPicture
				ref={canvasRef}
			/>
			<VideoCamera camera={camera} ref={videoRef} />
			{ (camera == CameraState.On) &&
				<Button
					onClick={handleTakePicture}
					camera={camera}
					clicking={clicking}
				>
					Take Picture
				</Button>
			}
		</>
	)
}
