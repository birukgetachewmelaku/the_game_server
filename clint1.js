const UDP = require('dgram');

const client = UDP.createSocket('udp4');

const serverPort = 2222;
const serverAddress = 'localhost';

let clientPort = 8888; // 0 to let the operating system automatically assign an available port

client.on('message', (message, info) => {
  console.log('Received message from server:', message.toString(), 'from:', info.address, 'port:', info.port);
});

client.bind(clientPort, () => {
  clientPort = client.address().port;
  console.log('Client2 listening on port:', clientPort);
});

const eee = {
  aaa: 333,
  bbb: 555,
};
const message = JSON.stringify(eee);

client.send(message, 0, message.length, serverPort, serverAddress, (err) => {
  if (err) {
    console.error('Failed to send packet!');
  } else {
    console.log('Packet sent to server!');
  }
});