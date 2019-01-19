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

var dailyevents = [
    '3x3 blind',
    '3x3 blind average of 5',
    '4x4',
    '4x4 FMC',
    '4x4 blind',
    '4x4 blind average of 5',
    '5x5',
    '5x5 FMC',
    '5x5 blind',
    '6x6',
    '6x6 FMC',
    '7x7',
    '7x7 FMC',
    '8x8',
    '9x9',
    '10x10',
    '11x11',
    '12x12',
    '13x13',
    '15x15',
    '20x20',
    '5x2',
    '5x4',
    '8x3',
    '8x6'
]

var dailyChallenge = '';
var lowestDailyScore = 9999;

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

var leaderboards5x5 = '1. ZManGames - 8.100\n2. David Jiang - 9.002\n3. Dawid Wojcik - 9.226\n4. no name guy - 11.772\n5. Carykh - 12.346'
var leaderboards6x6 = '1. ZManGames - 18.400\n2. Dawid Wojcik - 21.592\n3. David Jiang - 22.239\n4. no name guy - 22.635\n5. Walker Welch - 26.462';
var leaderboards7x7 = '1. Dawid Wojcik - 36.321\n2. no name guy - 37.316\n3. Tortoise - 38.607\n4. David Jiang - 40.126\n5. Walker Welch - 46.382';

client.on('message', msg => {
    var generateNewDailyChallenge = function() {
        let randomDailyNum = Math.floor(Math.random() * dailyevents.length);
        dailyChallenge = dailyevents[randomDailyNum];
        console.log(dailyChallenge);
        client.channels.get('532371042367438848').send(dailyChallenge);
    }
    var getHourCount = function () {
        var today = new Date().getHours();
        if (today % 2 === 0) {
            generateNewDailyChallenge();
        } else {
            setTimeout(getHourCount, 720000);
        }
    }
    if (msg.content.startsWith(`${prefix}getDaily`)) {
        getHourCount();
    }
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
            msg.channel.send(leaderboards5x5);
        } else if (msg.content.startsWith(`${prefix}leaderboards 6x6`)) {
            msg.channel.send(leaderboards6x6);
        } else if (msg.content.startsWith(`${prefix}leaderboards 7x7`)) {
            msg.channel.send(leaderboards7x7);
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
        let aftermessageSplit = aftermessage.split(' ');
        aftermessageSplit.shift();
        while (aftermessageSplit.length > 4) {
            aftermessageSplit[aftermessageSplit.length - 2] += (' ' + aftermessageSplit.pop());
        }
        console.log(aftermessageSplit);
        if (aftermessageSplit.length >= 4) {
            var sendString = "Category: **" + aftermessageSplit[0] + "**\nTime: **" + aftermessageSplit[1] + "**\nCustom name: **" + aftermessageSplit[3] + "**\nEvidence: " + aftermessageSplit[2];
            console.log(sendString);
        } else {
            msg.channel.send("You need to provide a link for your evidence!")
        }
        client.channels.get('535604615295533096').send(sendString);
        msg.delete(2000);
    }
    let moderatorRole = msg.guild.roles.find(role => role.name === "Leaderboard Moderator");
    if (msg.content.startsWith(`${prefix}update`)) {
        let afterMessageUpdate = msg.content.slice(8);
        let afterMessageUpdateSplit = afterMessageUpdate.split('|');
        console.log(afterMessageUpdateSplit);
        if(msg.member.roles.has(moderatorRole.id)) {
            switch (afterMessageUpdateSplit[0]) {
                case '5x5':
                    leaderboards5x5 = afterMessageUpdateSplit[1];
                    console.log(leaderboards5x5);
                    break;
                case '6x6':
                    leaderboards6x6 = afterMessageUpdateSplit[1];
                    break;
                case '7x7':
                    leaderboards7x7 = afterMessageUpdateSplit[1];
                    break;
            }
          } else {
            msg.channel.send("You're not a leaderboard moderator!")
          }
    }
});

client.login(token);