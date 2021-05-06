import pkg from 'bcrypt';
const bcrypt = pkg;

const SALT_ROUNDS = 10;

export async function encrypt_password (password) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
