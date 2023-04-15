// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";

export default function hashPass(psw) {
  return bcrypt.hash(psw, 10).then((hash) => {
    return hash;
  });
}
