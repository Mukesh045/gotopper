const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn, exec: execCallback } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const os = require('os');
const exec = util.promisify(execCallback);
const app = express();
const PORT = 5000;

app.use(cors());  // Enable CORS for all origins
app.use(bodyParser.json());

// Helper function to write code to a file
function writeCodeToFile(dir, filename, code) {
  console.log(`Creating directory: ${dir}`);
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Writing file: ${filename} in ${dir}`);
  fs.writeFileSync(path.join(dir, filename), code);
}

// Helper function to clean up temp directory
async function cleanupDir(dir) {
  try {
    await fs.promises.rm(dir, { recursive: true, force: true });
  } catch (cleanupErr) {
    console.error(`Error cleaning up directory ${dir}:`, cleanupErr);
  }
}

// Helper function to run a command using spawn, wrapped in a Promise
function runProcess(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);

    let stdout = '';
    let stderr = '';

    if (child.stdout) {
      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });
    }

    if (child.stderr) {
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });
    }

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        const err = new Error(`Command failed with exit code ${code}`);
        err.stderr = stderr;
        err.stdout = stdout;
        reject(err);
      }
    });

    child.on('error', (err) => reject(err)); // For spawn errors (e.g., command not found)
  });
}

// Endpoint to run Java code
app.post('/run/java', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  // Extract public class name from code
  const classNameMatch = code.match(/public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/);
  const className = classNameMatch ? classNameMatch[1] : 'Main';

  console.log(`Java className detected: ${className}`);

  const id = uuidv4();
  const dir = path.join(__dirname, 'temp', id);
  const filename = `${className}.java`;

  console.log(`Java filename used: ${filename}`);

  try {
    writeCodeToFile(dir, filename, code);
    // Compile Java code
    await runProcess('javac', [filename], { cwd: dir, env: process.env });
    // Run Java class
    const { stdout } = await runProcess('java', [className], { cwd: dir, env: process.env });
    res.json({ output: stdout });
  } catch (err) {
    console.log(`Java execution error: ${err.stderr || err.stdout || err.message}`);
    // If it's a timeout, the message is often empty.
    const output = err.signal === 'SIGTERM' ? 'Execution timed out.' : (err.stderr || err.stdout || err.message);
    res.json({ output });
  } finally {
    // Clean up temp files
    if (dir) {
      await cleanupDir(dir);
    }
  }
});

// Endpoint to run Python code
app.post('/run/python', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  const id = uuidv4();
  const dir = path.join(__dirname, 'temp', id);
  const filename = 'script.py';

  try {
    writeCodeToFile(dir, filename, code);
    // Run Python code
    const { stdout } = await runProcess('python', [filename], { cwd: dir, env: process.env });
    res.json({ output: stdout });
  } catch (err) {
    console.log(`Python execution error: ${err.stderr || err.stdout || err.message}`);
    const output = err.signal === 'SIGTERM' ? 'Execution timed out.' : (err.stderr || err.stdout || err.message);
    res.json({ output });
  } finally {
    // Clean up temp files
    if (dir) {
      await cleanupDir(dir);
    }
  }
});

// Endpoint to run C code
app.post('/run/c', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  const id = uuidv4();
  const dir = path.join(__dirname, 'temp', id);
  const filename = 'program.c';
  const exeFilename = 'program.exe';

  // --- FIX: Use the absolute path to gcc.exe to bypass PATH resolution issues ---
  const gccPath = 'C:\\MinGW\\bin\\gcc.exe';

  try {
    writeCodeToFile(dir, filename, code);

    // --- FIX: Use exec with a fully quoted command for maximum reliability on Windows ---
    const compileCommand = `"${gccPath}" -o "${exeFilename}" "${filename}"`;
    await exec(compileCommand, { cwd: dir });

    // Run C executable.
    const { stdout } = await runProcess(path.join(dir, exeFilename), [], { cwd: dir, env: process.env });
    res.json({ output: stdout });
  } catch (err) {
    // Prioritize stderr for compilation/runtime errors as it contains the most useful info.
    console.log(`C execution error. Stderr: ${err.stderr}, Stdout: ${err.stdout}, Message: ${err.message}`);
    let output = err.stderr || err.stdout;

    if (err.signal === 'SIGTERM') {
      output = 'Execution timed out.';
    } else if (err.code === 'ENOENT' || (output && (output.includes('not recognized') || output.includes('command not found')))) {
      // The error might now be ENOENT (Error NO ENTry) if the hardcoded path is wrong.
      output = `C compiler (gcc) not found at the specified path: ${gccPath}. Please ensure MinGW is installed in 'C:\\MinGW'.`;
    } else if (!output) {
      const serverPath = process.env.PATH;
      output = `C compiler (gcc) not found. Please ensure MinGW is installed and its 'bin' directory is in your system's PATH.\n\nDebug Info:\nServer PATH: ${serverPath}`;
    }
    res.json({ output });
  } finally {
    // Clean up temp files
    if (dir) {
      await cleanupDir(dir);
    }
  }
});

// Endpoint to run JavaScript code
app.post('/run/js', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  const id = uuidv4();
  const dir = path.join(__dirname, 'temp', id);
  const filename = 'script.js';

  try {
    writeCodeToFile(dir, filename, code);
    // Run JavaScript code with Node.js
    const { stdout } = await runProcess('node', [filename], { cwd: dir, env: process.env });
    res.json({ output: stdout });
  } catch (err) {
    console.log(`JS execution error: ${err.stderr || err.stdout || err.message}`);
    const output = err.signal === 'SIGTERM' ? 'Execution timed out.' : (err.stderr || err.stdout || err.message);
    res.json({ output });
  } finally {
    // Clean up temp files
    if (dir) {
      await cleanupDir(dir);
    }
  }
});

// Endpoint to run HTML code
app.post('/run/html', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  // For HTML, return the code as output (since it's not executable)
  res.json({ output: code });
});

// Endpoint to run CSS code
app.post('/run/css', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  // For CSS, return the code as output (since it's not executable)
  res.json({ output: code });
});

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  console.log('Admin login request received:', req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  // Hardcoded admin credentials for demo
  const ADMIN_EMAIL = 'admin@gotopper.com';
  const ADMIN_PASSWORD = 'Got@0045';

  console.log(`Checking credentials: ${email} === ${ADMIN_EMAIL} and ${password} === ${ADMIN_PASSWORD}`);
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = uuidv4();
    console.log('Login successful, token:', token);
    res.json({ success: true, token });
  } else {
    console.log('Invalid credentials');
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('Backend server running on port ' + PORT);
  console.log('Server accessible at:');
  console.log('- Local: http://localhost:' + PORT);
  const networkInterfaces = os.networkInterfaces();
  if (networkInterfaces['Wi-Fi']) {
    const wifiInterface = networkInterfaces['Wi-Fi'].find(iface => iface.family === 'IPv4' && !iface.internal);
    if (wifiInterface) {
      console.log('- Network: http://' + wifiInterface.address + ':' + PORT);
    }
  }
});

server.on('error', (error) => {
  console.error('Server error event:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please free the port or use a different one.`);
  }
});
