import numpy as np

def get_age(input, model):
	image_list = process_data(input)
	age = model.predict(image_list)
	return round(age[0][0])

def process_data(input):
	image_list = input.image_list
	image_list = np.array(image_list, dtype="float32")
	image_list = image_list.reshape(1, 48, 48, 1)
	return image_list
