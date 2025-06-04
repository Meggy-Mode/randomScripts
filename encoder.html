<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Seeded Encryptor</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 2em;
      background: #f5f5f5;
      color: #333;
    }

    input,
    button,
    textarea {
      font-family: monospace;
      font-size: 1em;
      padding: 0.5em;
      margin-top: 0.5em;
      width: 100%;
      box-sizing: border-box;
    }

    .output {
      margin-top: 1em;
      background: #fff;
      padding: 1em;
      border: 1px solid #ddd;
      white-space: pre-wrap;
    }
  </style>
</head>

<body>
  <h1>Seeded Encryptor</h1><br>

  <label for="inputString">Enter a string to encrypt:</label>
  <input id="inputString" type="text" placeholder="e.g. hello world 123!" autocomplete="off" />

  <label for="maxOffset">Max Offset (number):</label>
  <input id="maxOffset" type="number" value="3" autocomplete="off" />

  <label for="seedInput">Seed (for encryption or decryption):</label>
  <input id="seedInput" type="text" placeholder="Optional seed string" autocomplete="off" />

  <button onclick="runEncryption()">Encrypt</button>
  <button onclick="runDecryption()">Decrypt</button>

  <label for="encryptedInput">Enter final encrypted numbers (for decryption):</label>
  <input id="encryptedInput" type="text" placeholder="e.g. 79-68-87-..." autocomplete="off" />

  <div class="output" id="outputArea"></div>

  <script>
    // RNG and Seed helpers
    function generateSeedString(length = 16) {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={[]}\;:|<,>.?/~';
      let seed = '';
      for (let i = 0; i < length; i++) {
        seed += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return seed;
    }

    function stringToSeed(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return hash >>> 0;
    }

    function mulberry32(seed) {
      return function () {
        let t = (seed += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    // Helpers for letters and digits
    function letterToNumber(letter) {
      const code = letter.toLowerCase().charCodeAt(0);
      if (code >= 97 && code <= 122) { // a-z
        return code - 96;
      }
      return null;
    }

    function numberToLetter(num) {
      if (num === 26) return ' '; // space encoded as 26
      if (num >= 1 && num <= 26) return String.fromCharCode(num + 96);
      return '?';
    }

    function encryptString(str, maxOffset = 3) {
      let encrypted = [];
      let offset = 1;
      let i = 0;

      while (i < str.length) {
        const char = str[i];

        // Check for raw /.../ segment
        if (char === '/' && str.slice(i).match(/^\/[^/]*\//)) {
          const match = str.slice(i).match(/^\/([^/]*)\//);
          const rawText = match[1];
          encrypted.push("[" + rawText + "]");
          // Push raw text directly without encoding
          i += match[0].length;
          continue;
        }

        // Ignore punctuation
        if (/[^a-zA-Z0-9 ]/.test(char)) {
          i++;
          continue;
        }

        if (char === ' ') {
          encrypted.push(26 + offset);
          offset++;
          if (offset > maxOffset) offset = 1;
          i++;
          continue;
        }

        const base = letterToNumber(char);
        if (base !== null) {
          encrypted.push(base + offset);
          offset++;
          if (offset > maxOffset) offset = 1;
          i++;
          continue;
        }

        if (/[0-9]/.test(char)) {
          encrypted.push("#" + (parseInt(char) + 1));
          i++;
          continue;
        }

        i++;
      }

      return encrypted.join("-");
    }


    // Encrypt with seed (add PRNG random offsets)
    function encryptWithSeed(encryptedString, seedString) {
      const seed = seedString || generateSeedString();
      const numericSeed = stringToSeed(seed);
      const rng = mulberry32(numericSeed);

      const parts = encryptedString.split("-");
      const finalEncrypted = parts.map(p => {
        if (p.startsWith("#") || (p.startsWith("[") && p.endsWith("]"))) {
          return p; // Leave raw segments and numbers alone
        } else {
          const n = parseInt(p);
          return n + Math.floor(rng() * 100);
        }
      });

      return {
        seed: seed,
        final: finalEncrypted.join("-")
      };
    }


    // Decrypt with seed (subtract PRNG random offsets)
    function decryptWithSeed(finalEncryptedString, seedString) {
      if (!seedString) throw new Error("Seed required for decryption!");
      const numericSeed = stringToSeed(seedString);
      const rng = mulberry32(numericSeed);

      const parts = finalEncryptedString.split("-");
      const decrypted = parts.map(p => {
        if (p.startsWith("#") || (p.startsWith("[") && p.endsWith("]"))) {
          return p; // Leave raw segments and numbers alone
        } else {
          const n = parseInt(p);
          return n - Math.floor(rng() * 100);
        }
      });

      return decrypted.join("-");
    }


    // Reverse offset encryption step (convert numbers back to chars)
    function decryptOffset(encryptedString, maxOffset = 3) {
      const parts = encryptedString.split("-");
      let offset = 1;
      let result = "";

      for (let p of parts) {
        if (p.startsWith("#")) {
          result += p[1];
          continue;
        }

        if (p.startsWith("[") && p.endsWith("]")) {
          result += p.slice(1, -1); // Remove [ ]
          continue;
        }

        const num = parseInt(p);
        if (isNaN(num)) {
          result += "?";
          continue;
        }

        const originalNum = num - offset;

        if (originalNum === 26) {
          result += " ";
        } else if (originalNum >= 1 && originalNum <= 26) {
          result += String.fromCharCode(originalNum + 96);
        } else {
          result += "<>";
        }

        offset++;
        if (offset > maxOffset) offset = 1;
      }


      return result;
    }

    // Run encryption
    function runEncryption() {
      const input = document.getElementById("inputString").value;
      const maxOffset = parseInt(document.getElementById("maxOffset").value);
      let seedInput = document.getElementById("seedInput").value.trim();

      if (!input) {
        alert("Please enter a string.");
        return;
      }

      if (!seedInput) seedInput = generateSeedString();

      const step1 = encryptString(input, maxOffset);
      const {seed, final} = encryptWithSeed(step1, seedInput);

      const output = `
🔤 Original Input:       ${input}
🧮 Offset Encrypted:     ${step1}
🌱 Seed Used:            ${seed}
🔐 Final Encryption:     ${final}
      `.trim();

      document.getElementById("outputArea").textContent = output;

      // Autofill for decrypt convenience
      document.getElementById("encryptedInput").value = final;
      document.getElementById("seedInput").value = seed;
    }

    // Run decryption
    function runDecryption() {
      const encryptedInput = document.getElementById("encryptedInput").value.trim();
      const seedInput = document.getElementById("seedInput").value.trim();
      const maxOffset = parseInt(document.getElementById("maxOffset").value);

      if (!encryptedInput) {
        alert("Please enter the final encrypted numbers to decrypt.");
        return;
      }
      if (!seedInput) {
        alert("Please enter the seed used for encryption.");
        return;
      }

      try {
        const decryptedOffset = decryptWithSeed(encryptedInput, seedInput);
        const original = decryptOffset(decryptedOffset, maxOffset);

        const output = `
🔐 Final Encrypted Input:  ${encryptedInput}
🌱 Seed Used:              ${seedInput}
🧮 Offset Decrypted:       ${decryptedOffset}
🔤 Original Decrypted Text: ${original}
        `.trim();
        document.getElementById("outputArea").textContent = output;
        
      } catch (e) {
        alert("Error during decryption: " + e.message);
      }
    }
  </script>
</body>

</html>
