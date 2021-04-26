# AS-Events
**EventEmitter for AssemblyScript**

## Features
- No Dependencies
- Isomorphic
- Works in Nodejs/Browser/Wasmer
- Small code size

## Installation

```bash
~ npm install as-events
```

## Usage

```js
import { EventEmitter } from 'as-events'

const emitter = new EventEmitter<string>()

emitter.on('event', (data) => {

    //...

})

emitter.emit('event', 'Hello Event Emitter!')
```