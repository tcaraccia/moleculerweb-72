# Move Faster

Powered by  Moleculer Services
[![N|Solid](https://cdn-images-1.medium.com/max/92/1*2C0tOCKprIOrvko1yL4Wqg@2x.png)](https://nodesource.com/products/nsolid)

## Build Setup

``` bash
# Install GNATS Transport layer
wget https://github.com/nats-io/gnatsd/releases/download/v0.9.4/gnatsd-v0.9.4-linux-amd64.zip
unzip -p gnatsd-v0.9.4-linux-amd64.zip gnatsd-v0.9.4-linux-amd64/gnatsd > gnatsd
chmod +x gnatsd
./gnatsd --addr 127.0.0.1 --port 4222

# Install dependencies
npm install

# Start developing with REPL
npm run dev

# Start production
npm start

# Run unit tests
npm test

# Run continuous test mode
npm run ci

# Run ESLint
npm run lint
```

## Run in Docker

```bash
$ docker-compose up -d --build
```

# Best Practices
Check company services as a reference for service implementation
### Services
Services are hot-pluggable, auto discoverable, defined in the src/services with the xxx.service.js casing.
The rule of thumb for services is that one services is only allowed to work with **one** model.
Altering data from other models, must be done through other microservices. 
A recommended approach to this is to use event emitting through services broker, and subscribing to events in target services. Event Emitter can even declare white/black listed listeners.
To group events in a "React" constant way, we created events module in */src/events*

**Event Publishing**
from.service.js
Action Handler
``` js
this.broker.emit(events.COMPANY.CREATED,payload)
``` 
**Event Subscribing**
to.service.js
``` js
events: {
    [events.COMPANY.CREATED](payload) {
    
    }
}
``` 
