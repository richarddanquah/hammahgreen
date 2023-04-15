import bcrypt from "bcrypt";

export default function comparePass(psw, hash) {
  return bcrypt.compare(psw, hash).then((result) => {
    return result;
  });
}
