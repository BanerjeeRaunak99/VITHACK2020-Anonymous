# -*- coding: utf-8 -*-
"""
Created on Fri Oct  9 20:04:05 2020

@author: Sayak
"""

import os
import numpy as np 
import pandas as pd
import scipy.io
import warnings
import tensorflow as tf

from tensorflow.keras import layers
from tensorflow.keras.models import Sequential
from tensorflow.keras import optimizers
from scipy import signal
from sklearn.model_selection import KFold, train_test_split
from sklearn.metrics import mean_squared_error
from matplotlib import pyplot as plt

warnings.filterwarnings('ignore')



config = {
    'seed': 77,
    'sample_size': 125,
    'train_size': 3000000, # train on 3 million data points
    'train_params':{
        'batch_size':128,
        'epochs': 10,
        'learn_rate': 1e-3,
    }
}


def SetSeed(seed=None):
    """Set seed for reproducibility."""
    tf.random.set_seed(seed)
    np.random.seed(seed)
    
SetSeed(seed=config['seed'])



# Loading a sample .mat file to understand the data dimensions
test_sample = scipy.io.loadmat('part_1.mat')['p']   

print(f'test_sample shape/dimensions: {test_sample.shape}')
print(f"Total Samples: {len(test_sample[0])}") 

print(f"Total Samples: {len(test_sample[0])}")
print(f"Number of readings in each sample(column): {len(test_sample[0][0])}")
print(f"Number of samples in each reading(BP): {len(test_sample[0][0][1])}")

temp_mat = test_sample[0, 999]
temp_length = temp_mat.shape[1]
sample_size = config['sample_size']


print(temp_length)
print((int)(temp_length/sample_size))






#Extracting Signal Data
ppg = []
bp = []
ecg = []

for i in range(1000):
    temp_mat = test_sample[0, i]
    temp_length = temp_mat.shape[1]
    for j in range((int)(temp_length/sample_size)):
        temp_ppg = temp_mat[0, j*sample_size:(j+1)*sample_size]
        temp_ecg = temp_mat[2, j*sample_size:(j+1)*sample_size]
        temp_bp = temp_mat[1, j*sample_size:(j+1)*sample_size]
        ppg.append(temp_ppg)
        ecg.append(temp_ecg)
        bp.append(temp_bp)
        
        
ppg, ecg, bp = np.array(ppg).reshape(-1,1), np.array(ecg).reshape(-1,1), np.array(bp).reshape(-1,1)

print(f'PPG_shape: {ppg.shape}\n ECG_shape: {ecg.shape}\n BP_shape: {bp.shape}')



##plotting sample ppg, ecg and bp signals
##using a sample size of 125
fig, ax = plt.subplots(3,1, figsize=(9,12), sharex=True)

ax[0].set_title('PPG graph', fontsize=16)
ax[0].set_ylabel('Signal Value')
ax[0].plot(ppg[:125])

ax[1].set_title('ECG graph', fontsize=16)
ax[1].set_ylabel('Signal Value')
ax[1].plot(ecg[:125])

ax[2].set_title('Blood Pressure (BP) graph', fontsize=16)
ax[2].set_ylabel('Signal Value')
ax[2].set_xlabel('Sample size')
ax[2].plot(bp[:125])



# creating train and test sets
X_train, X_test, y_train, y_test = train_test_split(ppg, bp, test_size=0.30)



#MODEL
def Model(input_dim, num_class):
    model = Sequential()

    model.add(layers.Dense(1024, input_dim = input_dim, activation='relu'))
    model.add(layers.Dropout(0.5))

    model.add(layers.Dense(512, 'relu')) 
    model.add(layers.Dropout(0.5))

    model.add(layers.Dense(64, 'relu'))    
    model.add(layers.Dropout(0.25))
    model.add(layers.Dense(num_class, 'linear'))
    
    
    return model


Input_dim = X_train.shape[1]
Classes = 1


model = Model(input_dim=Input_dim, num_class=Classes)

model.compile(loss=tf.keras.losses.MeanAbsoluteError(),
                  optimizer=optimizers.SGD(lr=config['train_params']['learn_rate']),
                  metrics=[tf.keras.metrics.RootMeanSquaredError()]
                 )

model.summary()

history = model.fit(X_train[:config['train_size']], # using the first 3 million rows.
                    y_train[:config['train_size']].squeeze(),
                    epochs=config['train_params']['epochs'],
                    batch_size=128,
                    verbose = 1
                   )


model_name = 'BP_10.h5'
model.save(model_name)




#Predicting on the test set using the nn(neural network) model
nn_predictions = model.predict(X_test[:config['train_size']])

rmse = tf.keras.metrics.RootMeanSquaredError()
rmse.update_state(y_test[:config['train_size']], nn_predictions)
print(f'Model RMSE: {rmse.result().numpy()}')




plt.title('Train loss against Root_Mean_Squared_error')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.plot(history.history['loss'])
plt.plot(history.history['root_mean_squared_error'])
plt.legend(['Loss', 'Root_Mean_Squared_error'])




# Visualize predicted BP and the True BP
plt.title("===True BP values Vs Predicted BP values===")
plt.xlabel('Number of samples taken')
plt.ylabel('BP values')
plt.plot(y_test[:100]) #only plotting 100 samples
plt.plot(nn_predictions[:100])
plt.legend(['True_BP', 'Predicted_BP'])



send = pd.DataFrame(X_test[:config['train_size']])
send.to_csv('X_test.csv')