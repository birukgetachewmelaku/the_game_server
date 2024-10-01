const { group } = require('console');
const dgram = require('dgram');

const numServers = 10;
const startPort = 41234;
const serverAddress = '209.38.32.43';

const servers = Array.from({ length: numServers }, (_, i) => {
  const server = dgram.createSocket('udp4');
  const port = startPort + i;
  const Group = new Map();

  server.on('error', (err) => {
    console.log(`Server error (port ${port}):\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, rinfo) => {
    //console.log(`Server (port ${port}) got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    for (const [client, { address: endpointAddress, port: endpointPort }] of Group) {
      server.send(msg, 0, msg.length, endpointPort, endpointAddress, (err) => {
        if (err) {
          console.error(`Failed to send packet to client ${client}:`, err);
        } else {
          console.log(`Packet sent to client ${client}`);
        }
      });
    }
    Group.set(rinfo.address + ':' + rinfo.port, { address: rinfo.address, port: rinfo.port });
    console.log(Group.size,"ppppppppppppp",port);
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`Server (port ${port}) listening ${serverAddress}:${address.port}.....${servers[7]}`);
  });

  server.bind(port, serverAddress);
  return server;
});

console.log('All servers started.');































// const UDP = require('dgram');

// const server = UDP.createSocket('udp4');

// const serverAddress = '127.0.0.1'; // Replace with the actual server address
// const allclintes = new Map(); // Use a Map to store client endpoints

// server.on('listening', () => {
//   const address = server.address();
//   console.log('Server listening on', 'Address:', address.address, 'Port:', address.port);
// });

// server.on('message', (message, remote) => {
//   const clientEndpoint = `${remote.address}:${remote.port}`;
//   const client = check_if_the_clinte_is_in_map(remote.address, remote.port);
//   if(client){
//       send_data_to_all_in_group(client);
//   }else{
//       new_clinte(remote);
//   }
// });
// function new_clinte(remote){
//   allclintes.set(client, { address: remote.address, port: remote.port, level: 4, Group_id: 5 });
// }

// function check_if_the_clinte_is_in_map(address, port){
//   for (const [endpoint, { address: endpointAddress, port: endpointport}] of allclintes) {
//     if (endpointAddress === address && endpointport == port) {
//       return endpoint;
//     }
//   }
//   return null;
// }
// function send_data_to_all_in_group(group_id){
//   for (const [endpoint, { address: endpointAddress, port: endpointport, Group_id: Group_id_}] of allclintes) {
//     if (Group_id_ === group_id) {
//         server.send(message, 0, message.length, endpointport, endpointAddress, (err) => {
//           if (err) {
//             console.error(`Failed to send packet to client ${endpoint}:`, err);
//           } else {
//             console.log(`Packet sent to client ${endpoint}`);
//           }
//         }
//       )
//     }
//   }
// }


// server.bind(2222, serverAddress);















// const UDP = require('dgram');

// const server = UDP.createSocket('udp4');

// const serverAddress = '127.0.0.1'; // Replace with the actual server address
// const clientEndpoints = new Map(); // Use a Map to store client endpoints
// const clientGroups = new Map(); // Use a Map to store client groups

// server.on('listening', () => {
//   const address = server.address();
//   console.log('Server listening on', 'Address:', address.address, 'Port:', address.port);
// });

// server.on('message', (message, remote) => {
//   const clientEndpoint = `${remote.address}:${remote.port}`;
//   console.log("FFFFFFFFFFFFFFFFFFFF");
//   // Check if the client endpoint is already stored in the clientEndpoints Map
//   if (!clientEndpoints.has(clientEndpoint)) {
//     console.log('New client connected:', clientEndpoint);
//     const clientLevel = 5; // Assuming the client level is 5 for this example
//     clientEndpoints.set(clientEndpoint, { address: remote.address, port: remote.port, level: clientLevel });

//     // Add the client to the appropriate group based on their level
//     if (!clientGroups.has(`level-${clientLevel}`)) {
//       clientGroups.set(`level-${clientLevel}`, new Set());
//     }
//     clientGroups.get(`level-${clientLevel}`).add(clientEndpoint);
//     console.log(`Client ${clientEndpoint} added to group level-${clientLevel}`);
//   }

//   // Broadcast the message to all connected clients
//   for (const [endpoint, client] of clientEndpoints) {
//     server.send(message, 0, message.length, client.port, client.address, (err) => {
//       if (err) {
//         console.error(`Failed to send packet to client ${endpoint}:`, err);
//       } else {
//         console.log(`Packet sent to client ${endpoint}`);
//       }
//     });
//   }
// });

// server.bind(2222, serverAddress);


















































/* const { debug } = require('console');
const UDP = require('dgram');

const server = UDP.createSocket('udp4');

const clientPort = 8888;
const clientAddress = 'localhost';

const list_of_ip_adress = [];
const time_track = [];



server.on('listening', () => {
  const address = server.address(); 
  console.log('Server listening on', 'Address:', address.address, 'Port:', address.port);
});
server.on('message', (message, remote) => {
  console.log('Received message from client:', message.toString(), 'from:', remote.address, 'port:', remote.port);
  let qq = remote.port;
  const ttt = Math.floor(qq / 10) * 10;
  for(let i=qq; i<ttt+10; i++){
    if(list_of_ip_adress[ttt]){
      console.log("do sending method");
      server.send(packet, 0, packet.length, ttt, list_of_ip_adress[ttt], (err) => {
        if (err) {
          console.error('Failed to send packet to client!');
        } else { 
          console.log('Packet sent to client!');
        }
      });
    }
  }
});

server.bind(2222, 'localhost');
// Send data to the client
const message = 'Hello, client!';
const packet = Buffer.from(message);

function qqq(){
  const ttt = Math.floor(8881 / 10) * 10;
  list_of_ip_adress[2] = "127.0.0.1";
  server.send(packet, 0, packet.length, clientPort, clientAddress, (err) => {
    if (err) {
      console.error('Failed to send packet to client!');
    } else { 
      console.log('Packet sent to client!');
    }
  });
}

//setInterval(qqq, 30);

function greet() {
    for(let i=3000; i<1000000; i++){
        if(time_track[i] > 30){
            return i;
        }
    }
  }
  
  module.exports = greet; */


































/* const { debug } = require('console');
const UDP = require('dgram');

const server = UDP.createSocket('udp4');

const clientPort = 8888;
const clientAddress = 'localhost';

const list_of_ip_adress = [];
const time_track = [];



server.on('listening', () => {
  const address = server.address(); 
  console.log('Server listening on', 'Address:', address.address, 'Port:', address.port);
});
server.on('message', (message, remote) => {
  console.log('Received message from client:', message.toString(), 'from:', remote.address, 'port:', remote.port);
  let qq = remote.port;
  const ttt = Math.floor(qq / 10) * 10;
  for(let i=qq; i<ttt+10; i++){
    if(list_of_ip_adress[ttt]){
      console.log("do sending method");
      server.send(packet, 0, packet.length, ttt, list_of_ip_adress[ttt], (err) => {
        if (err) {
          console.error('Failed to send packet to client!');
        } else { 
          console.log('Packet sent to client!');
        }
      });
    }
  }
});

server.bind(2222, 'localhost');
// Send data to the client
const message = 'Hello, client!';
const packet = Buffer.from(message);

function qqq(){
  const ttt = Math.floor(8881 / 10) * 10;
  list_of_ip_adress[2] = "127.0.0.1";
  server.send(packet, 0, packet.length, clientPort, clientAddress, (err) => {
    if (err) {
      console.error('Failed to send packet to client!');
    } else { 
      console.log('Packet sent to client!');
    }
  });
}

//setInterval(qqq, 30);

function greet() {
    for(let i=3000; i<1000000; i++){
        if(time_track[i] > 30){
            return i;
        }
    }
  }
  
  module.exports = greet; */
