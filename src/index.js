const { Client, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ]
});

client.commands = new Collection();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro no MongoDB:', err));

// Load handlers
loadCommands(client);
loadEvents(client);

client.login(process.env.TOKEN);