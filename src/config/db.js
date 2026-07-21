import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

export default async function connect(uriConnection) {
  await mongoose.connect(uriConnection);
  console.log('MongoDB conectado');
}