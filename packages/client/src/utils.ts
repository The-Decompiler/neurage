// Flatten an RGBA-formatted image array
export const flattenImage = (arr: Uint8ClampedArray) => {
	let newArray = [];
	let processedArr = [];
	for (let i = 0; i < arr.length; i++) {
		processedArr.push(arr[i]);
		if (processedArr.length == 4) {
			let newNum = Math.round(averageArray(processedArr));
			processedArr = [];
			newArray.push(newNum);
		}
	}
	return newArray;
}

// Return the average of an array of numbers
const averageArray = (arr: number[]) => {
	let sum = 0;
	for (let i = 0; i < arr.length; i++)
		sum += arr[i];
	return sum / arr.length
}
