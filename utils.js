const fs = require("fs");
const colors = require("colors");
const { DateTime } = require("luxon");
const path = require("path");

require("dotenv").config();

function _isArray(obj) {
  if (Array.isArray(obj) && obj.length > 0) {
    return true;
  }

  try {
    const parsedObj = JSON.parse(obj);
    return Array.isArray(parsedObj) && parsedObj.length > 0;
  } catch (e) {
    return false;
  }
}

function findOptimalElement(array, coins) {
  let optimalElement = null;

  for (const item of array) {
    // Check if enterFee is less than coins
    if (item.enterFee < coins) {
      // If no optimalElement yet, or bonus is higher
      if (!optimalElement || item.bonus > optimalElement.bonus) {
        optimalElement = item;
      } else if (item.bonus === optimalElement.bonus) {
        // If bonuses are equal, check if enterFee is closer to coins
        if (coins - item.enterFee < coins - optimalElement.enterFee) {
          optimalElement = item;
        }
      }
    }
  }

  return optimalElement;
}

function splitIdPet(num) {
  const numStr = num.toString();
  const firstPart = numStr.slice(0, 3); // Get the first 3 characters
  const secondPart = numStr.slice(3); // Get the remaining part

  return [parseInt(firstPart), parseInt(secondPart)];
}

// Function to override environment variables
const envFilePath = path.join(__dirname, ".env");
async function updateEnv(variable, value) {
  // Read the .env file
  fs.readFile(envFilePath, "utf8", (err, data) => {
    if (err) {
      console.log("Cannot read .env file:", err);
      return;
    }
    // Create or update variable in the file
    const regex = new RegExp(`^${variable}=.*`, "m");
    let newData = data.replace(regex, `${variable}=${value}`);

    // If variable does not exist in the file, add it to the end
    if (!regex.test(data)) {
      newData += `\n${variable}=${value}`;
    }

    // Write back to the .env file
    fs.writeFile(envFilePath, newData, "utf8", (err) => {
      if (err) {
        console.error("Cannot write to .env file:", err);
      }
    });
  });
}

function sleep(seconds = null) {
  if (seconds && typeof seconds === "number") return new Promise((resolve) => setTimeout(resolve, seconds * 1000));

  let DELAY_BETWEEN_REQUESTS = process.env.DELAY_BETWEEN_REQUESTS && _isArray(process.env.DELAY_BETWEEN_REQUESTS) ? JSON.parse(process.env.DELAY_BETWEEN_REQUESTS) : [1, 5];
  if (seconds && Array.isArray(seconds)) {
    DELAY_BETWEEN_REQUESTS = seconds;
  }
  const min = DELAY_BETWEEN_REQUESTS[0];
  const max = DELAY_BETWEEN_REQUESTS[1];

  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, delay * 1000);
  });
}

function saveToken(id, token) {
  const tokens = JSON.parse(fs.readFileSync("token.json", "utf8"));
  tokens[id] = token;
  fs.writeFileSync("token.json", JSON.stringify(tokens, null, 4));
}

function getToken(id) {
  const tokens = JSON.parse(fs.readFileSync("token.json", "utf8"));
  return tokens[id] || null;
}

function isTokenExpired(token) {
  if (!token) return true;

  try {
    const [, payload] = token.split(".");
    if (!payload) return true;

    const decodedPayload = JSON.parse(Buffer.from(payload, "base64").toString());
    const now = Math.floor(Date.now() / 1000);

    if (!decodedPayload.exp) {
      return false;
    }

    const expirationDate = new Date(decodedPayload.exp * 1000);
    const isExpired = now > decodedPayload.exp;

    console.log(`Token expires after: ${expirationDate.toLocaleString()}`);
    console.log(`Token status: ${isExpired ? "Expired" : "Valid"}`);

    return isExpired;
  } catch (error) {
    console.log(`Error checking token: ${error.message}`);
    return true;
  }
}

function generateRandomHash() {
  const characters = "0123456789abcdef";
  let hash = "0x"; // Start with "0x"

  for (let i = 0; i < 64; i++) {
    // 64 characters for hash
    const randomIndex = Math.floor(Math.random() * characters.length);
    hash += characters[randomIndex];
  }

  return hash;
}

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function loadData(file) {
  try {
    const datas = fs.readFileSync(file, "utf8").replace(/\r/g, "").split("\n").filter(Boolean);
    if (datas?.length <= 0) {
      console.log(colors.red(`No data found in ${file}`));
      return [];
    }
    return datas;
  } catch (error) {
    console.log(`File not found: ${file}`);
    return [];
  }
}

async function saveData(data, filename) {
  fs.writeFileSync(filename, data.join("\n"));
}

function log(msg, type = "info") {
  switch (type) {
    case "success":
      console.log(`[*] ${msg}`.green);
      break;
    case "custom":
      console.log(`[*] ${msg}`.magenta);
      break;
    case "error":
      console.log(`[!] ${msg}`.red);
      break;
    case "warning":
      console.log(`[*] ${msg}`.yellow);
      break;
    default:
      console.log(`[*] ${msg}`.blue);
  }
}

function saveJson(id, value, filename) {
  const data = JSON.parse(fs.readFileSync(filename, "utf8"));
  data[id] = value;
  fs.writeFileSync(filename, JSON.stringify(data, null, 4));
}

function getItem(id, filename) {
  const data = JSON.parse(fs.readFileSync(filename, "utf8"));
  return data[id] || null;
}

function getOrCreateJSON(id, value, filename) {
  let item = getItem(id, filename);
  if (item) {
    return item;
  }
  item = saveJson(id, value, filename);
  return item;
}

module.exports = {
  _isArray,
  saveJson,
  getRandomNumber,
  updateEnv,
  saveToken,
  splitIdPet,
  getToken,
  isTokenExpired,
  generateRandomHash,
  getRandomElement,
  loadData,
  saveData,
  log,
  getOrCreateJSON,
  sleep,
  findOptimalElement,
};
