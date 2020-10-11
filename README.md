# VITHACK2020-Anonymous
## Medic4All
A deeplearning powered website which takes in the user vitals and crunches the data and tells the user if there is anything to worry about.The website also allows the user to keep an history of his/her vitals and the warnings given by the website for future reference

## Motivation
In the modern lifestyle we are more prone to certain dieseas and by using the power of deeplearing we gave the users the power to get insights to his health so that they can better take care of their health and consult a doctor if nessesary.

## About the Tech Stack
This API is an **REST API** using **Nodejs** and uses **MonngoDB** as its database.

## Walkthrough of the the API calls
* */signup* Takes the user credentials and basic information about the user and signs up the user
* */signin* Takes the credentials of the user and authenticates the validity of the user.
* */submitvitals* Takes the vital readings from the user and stores it in his history.
* */records* Sends the patient history back to the user.
* */predict* Takes in the user's vital and runs it in the model and sends back any warning or insights that it finds.
