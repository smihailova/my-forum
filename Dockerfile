FROM node:latest

COPY . /
COPY ./requirements.txt /requirements.txt

WORKDIR /

RUN apt-get update ; \
    apt-get install -y python-pip python-dev build-essential ;
RUN pip install -r requirements.txt
RUN npm install
RUN npm run postinstall

EXPOSE 5000
