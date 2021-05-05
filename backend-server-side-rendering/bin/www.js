#!/usr/bin/env node

import config from "../config.js";
import app from "../app.js";
import Debug from "debug";
import http from "http";

const debug = Debug('togo:server');
app.set('port', config.port);

const server = http.createServer(app);

server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') throw error;

    switch (error.code) {
        case 'EACCES':
            console.error(config.port + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(config.port + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
