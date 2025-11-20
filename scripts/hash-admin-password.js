#!/usr/bin/env node

/* eslint-disable no-console */
const readline = require('node:readline');
const { stdin, stdout } = require('node:process');
const bcrypt = require('bcryptjs');

const rl = readline.createInterface({ input: stdin, output: stdout, terminal: true });

rl.question('Enter admin password to hash: ', async (answer) => {
  rl.close();
  const password = answer.trim();
  if (!password) {
    console.error('Password cannot be empty.');
    process.exit(1);
  }
  try {
    const hash = await bcrypt.hash(password, 12);
    console.log('\nAdd this value to ADMIN_PASSWORD_HASH:\n');
    console.log(hash);
    console.log('\nAfter setting it, remove ADMIN_PASSWORD to enforce hashed auth.');
  } catch (error) {
    console.error('Failed to generate hash:', error);
    process.exit(1);
  }
});


