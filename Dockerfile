FROM gcr.io/google-appengine/python

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG 0

RUN virtualenv -p python3 /env
ENV PATH /env/bin:$PATH

# install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .

# run gunicorn
CMD gunicorn dso.wsgi:application --bind 0.0.0.0:$PORT