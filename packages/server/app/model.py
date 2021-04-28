import numpy as np
import pandas as pd
import tensorflow as tf
import tensorflow.keras.layers as L
# import plotly.express as px
from sklearn.model_selection import train_test_split

def cnn_model(image):
	data = pd.read_csv("age_gender.csv")
	# Convert pixels into numpy array
	data["pixels"] = data["pixels"].apply(lambda x: np.array(x.split(), dtype="float32"))
	# data.head()
	print("Total rows: {}".format(len(data)))
	print("Total columns: {}".format(len(data.columns)))

	X = np.array(data["pixels"].tolist())
	# Convert pixels from 1D to 3D
	X = X.reshape(X.shape[0], 48, 48, 1)
	y = data["age"]
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.22, random_state=37)

	model = tf.keras.Sequential([
			L.InputLayer(input_shape=(48, 48, 1)),
			L.Conv2D(32, (3, 3), activation="relu", input_shape=(32, 32, 3)),
			L.BatchNormalization(),
			L.MaxPooling2D((2, 2)),
			L.Conv2D(64, (3, 3), activation="relu"),
			L.MaxPooling2D((2, 2)),
			L.Conv2D(128, (3, 3), activation="relu"),
			L.MaxPooling2D((2, 2)),
			L.Flatten(),
			L.Dense(64, activation="relu"),
			L.Dropout(rate=0.5),
			L.Dense(1, activation="relu")
	])

	sgd = tf.keras.optimizers.SGD(momentum=0.9)
	model.compile(optimizer="adam",
								loss="mean_squared_error",
								metrics=["mae"])

	# Stop training when validation loss reach 110
	class myCallback(tf.keras.callbacks.Callback):
		def on_epoch_end(self, epoch, logs={}):
			if(logs.get("val_loss") < 110):
				print("\nReached 110 val_loss so cancelling training!")
				self.model.stop_training = True

	callback = myCallback()
	model.summary()
	history = model.fit(X_train, y_train, epochs=20, validation_split=0.1, batch_size=64, callbacks=[callback])

	# fig = px.line(
	#			history.history, y=["loss", "val_loss"],
	#			labels={"index": "epoch", "value": "loss"},
	#			title="Training History")
	# fig.show()

	mse, mae = model.evaluate(X_test, y_test, verbose=0)
	print("Test Mean squared error: {}".format(mse))
	print("Test Mean absolute error: {}".format(mae))

	model.save("./")
	predictions = model.predict(image)
	return predictions
