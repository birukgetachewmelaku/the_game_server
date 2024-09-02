const UDP = require('dgram');

const client = UDP.createSocket('udp4');

const serverPort = 2222;
const serverAddress = 'localhost';

let clientPort = 9999; // 0 to let the operating system automatically assign an available port

client.on('message', (message, info) => {
  console.log('Received message from server:', message.toString(), 'from:', info.address, 'port:', info.port);
});

client.bind(clientPort, () => {
  clientPort = client.address().port;
  console.log('Client2 listening on port:', clientPort);
});

// You can optionally send a message from client2 to client1
// const message = 'SEND:' + serverPort + ':' + serverAddress + ':Hello, client1!';
// const packet = Buffer.from(message);
// client.send(packet, 0, packet.length, serverPort, serverAddress, (err) => {
//   if (err) {
//     console.error('Failed to send packet!');
//   } else {
//     console.log('Packet sent to server!');
//   }
// });