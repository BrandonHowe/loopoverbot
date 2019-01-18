const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

 

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1rNHNTA62B8WnV-0oNVbyGCgLQ-SHpTi8cdyJ3M8Yf0o',
    range: 'Class Data!A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}

const Discord = require('discord.js');
const { prefix, token } = require('./auth.json');
const client = new Discord.Client();
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
});

var welcomeMsgs = [
    'Welcome ',
    'Welcome to the loopzone, ',
    'Welcome, ',
    'Welcome, ',
    'Welcome, ',
    'Welcome to the loop, ',
    'Welcome, '
]

var welcomeMsgsEndings = [
    ', to Loopworld!',
    '.',
    ', to the loopity scoop.',
    ', a new looper!',
    ', Mr. Looper.',
    '.',
    ', new loop recruit.'
]

client.on('guildMemberAdd', member => {
    let randomNum = Math.floor(Math.random() * 5);
    member.guild.channels.get('526598754791587852').send(welcomeMsgs[randomNum] + member + welcomeMsgsEndings[randomNum]); 
});

client.on('message', msg => {
    mention = msg.mentions.users.first();
    if (msg.content.startsWith(`${prefix}hi`)) {
        msg.channel.send('Why hello there!')
    }
    if (msg.content.startsWith(`${prefix}leaderboards`)) {
        let aftermessage = msg.content.slice(13);
        let isblank = false;
        for (let i = 0; i < aftermessage.length; i++) {
            if (i !== ' ') {
                isblank = true;
            }
        }
        if (isblank === false) {
            msg.channel.send('Please specify a leaderboard category, such as 5x5, 6x6, or 10x10.')
        } else if (msg.content.startsWith(`${prefix}leaderboards 5x5`)) {
            msg.channel.send('1. ZManGames - 8.100\n2. David Jiang - 9.002\n3. Dawid Wojcik - 9.226\n4. no name guy - 11.772\n5. Carykh - 12.346')
        } else if (msg.content.startsWith(`${prefix}leaderboards 6x6`)) {
            msg.channel.send('1. ZManGames - 18.400\n2. Dawid Wojcik - 21.592\n3. David Jiang - 22.239\n4. Walker Welch - 26.462\n5. Carykh - 26.864')
        } else {
            msg.channel.send('This category does not exist! (yet)');
        }
    }
    if (msg.content.startsWith(`${prefix}submit`)) {
        if (msg.channel.id !== '535613677139787777') {
            msg.channel.send("Please post all submissions in the #submit-times-here channel.");
            msg.delete();
            return;
        }
        let aftermessage = msg.content.slice(7);
        let aftermessageSplit = aftermessage.split(', ');
        aftermessageSplit.shift();
        while (aftermessageSplit.length > 4) {
            aftermessageSplit[aftermessageSplit.length - 2] += aftermessageSplit.pop();
        }
        if (aftermessageSplit.length === 4) {
            var sendString = "Category: **" + aftermessageSplit[0] + "**\nTime: **" + aftermessageSplit[1] + "**\nCustom name: **" + aftermessageSplit[3] + "**\nEvidence: " + aftermessageSplit[2];
        } else if (aftermessageSplit === 3) {
            msg.channel.send("You need to provide a link for your evidence!")
        }
        client.channels.get('535604615295533096').send(sendString);
        msg.delete(2000);
    }
});

client.login(token);