import app.model as model
import numpy as np
import ast

def get_age(input):
	image_list = input.image_list

	image_list = ast.literal_eval(image_list)
	image_list = np.array(image_list, dtype="float32")
	image_list = image_list.reshape(1, 48, 48, 1)

	age = model.cnn_model(image_list)
	return age
