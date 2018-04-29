from jinja2 import Environment, FileSystemLoader, select_autoescape
from quart import Quart

import urllib.request
import json

app = Quart(__name__)

env = Environment(
    loader = FileSystemLoader('templates'),
    autoescape = select_autoescape(['html'])
)

totalShards = 5

@app.route('/')
async def index():
    with urllib.request.urlopen('http://perkelle.com:3333/shard/all') as response:
        raw = json.loads(response.read())
        parsed = {}

        #Insert broken shards at the beginning
        for key in filter(lambda x: raw[str(x)] != "CONNECTED", sorted(map(lambda x: int(x), raw.keys()))):
            parsed[str(key)] = raw[str(key)]

        for key in sorted(map(lambda x: int(x), raw.keys())):
            if key not in parsed.keys():
                parsed[str(key)] = raw[str(key)]

        return env.get_template('index.html').render(parsed=parsed)


app.run(host="0.0.0.0", port=4444)
