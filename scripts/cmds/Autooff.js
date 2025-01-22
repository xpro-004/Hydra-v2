const { exec } = require('child_process');

let inactivityTimeout;
const INACTIVITY_LIMIT = 30000; // 1 hour in milliseconds

function resetInactivityTimer() {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    console.log('No activity detected for 1 hour. Shutting down...');
    exec('pm2 stop goatbot', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error stopping GoatBot: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }, INACTIVITY_LIMIT);
}

// Call this function whenever a message or event is received
function onActivity() {
  resetInactivityTimer();
}

// Initialize the inactivity timer when the bot starts
resetInactivityTimer();
