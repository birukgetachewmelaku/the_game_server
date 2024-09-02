const readline = require('readline');
const UDP = require('dgram');

const client = UDP.createSocket('udp4');

const serverPort = 2222;
const serverAddress = 'localhost';

const clientPort = 5555;
const clientAddress = 'localhost';

client.on('listening', () => {
  const address = client.address();
  console.log('Client listening on', 'Address:', address.address, 'Port:', address.port);
});

client.on('message', (message, info) => {
  console.log('Response:', message.toString());
});

client.bind(clientPort, clientAddress);

function sendMessageToServer(message) {
  const serverMessage = Buffer.from(message);

  client.send(serverMessage, serverPort, serverAddress, (err) => {
    if (err) {
      console.error('Failed to send message to server!');
    } else {
      console.log('Message sent to server');
    }
  });
}

function sendMessageToClient(receiverPort, receiverAddress, message) {
  const clientMessage = Buffer.from(message);

  client.send(clientMessage, receiverPort, receiverAddress, (err) => {
    if (err) {
      console.error('Failed to send message to client!');
    } else {
      console.log('Message sent to client');
    }
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter receiver's port number: ", (receiverPort) => {
  rl.question("Enter receiver's address: ", (receiverAddress) => {
    rl.question("Enter message to send: ", (message) => {
      // Example usage: sendMessageToServer('Hello, server!')
       sendMessageToClient(parseInt(receiverPort), receiverAddress, message)

      rl.close();
    });
  });
});