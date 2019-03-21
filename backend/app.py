#!/usr/bin/env python3

import torch

import logging
import connexion
from flask_cors import CORS


def get_quality(features):
    return 5


logging.basicConfig(level=logging.INFO)

app = connexion.App(__name__, specification_dir='swagger/')
app.add_api('api.yaml')

# add CORS support
CORS(app.app)

# set the WSGI application callable to allow using uWSGI:
# uwsgi --http :8080 -w app
application = app.app

if __name__ == '__main__':
    # run our standalone server
    app.run(port=8080)
