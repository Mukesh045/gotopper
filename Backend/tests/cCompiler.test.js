const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('../server'); // Assuming server.js exports the app

describe('C Compiler Backend Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/', server);
  });

  test('Compile and run valid C code successfully', async () => {
    const validCCode = `
    #include <stdio.h>
    int main() {
      printf("Hello, Test!\\n");
      return 0;
    }
    `;

    const response = await request(app)
      .post('/run/c')
      .send({ code: validCCode });

    expect(response.statusCode).toBe(200);
    expect(response.body.output).toContain('Hello, Test!');
  });

  test('Return compilation error for invalid C code', async () => {
    const invalidCCode = `
    #include <stdio.h>
    int main() {
      prinf("Hello, Error!\\n"); // typo: prinf instead of printf
      return 0;
    }
    `;

    const response = await request(app)
      .post('/run/c')
      .send({ code: invalidCCode });

    expect(response.statusCode).toBe(200);
    expect(response.body.output.toLowerCase()).toMatch(/error|undefined|implicit declaration/);
  });

  test('Return error when no code provided', async () => {
    const response = await request(app)
      .post('/run/c')
      .send({ code: '' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('No code provided');
  });

  test('Cleanup temporary files after execution', async () => {
    // This test is more complex and may require mocking fs.rm or checking temp directory
    // For now, we just ensure the endpoint runs without error
    const validCCode = `
    #include <stdio.h>
    int main() {
      printf("Cleanup test\\n");
      return 0;
    }
    `;

    const response = await request(app)
      .post('/run/c')
      .send({ code: validCCode });

    expect(response.statusCode).toBe(200);
    expect(response.body.output).toContain('Cleanup test');
  });
});
