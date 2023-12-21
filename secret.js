const crypto = require("crypto");

const secret = "Santiago Bernabeu";
const secret2 = "Los Angeles Lakers";

const hash = crypto.createHmac("sha256", secret).update(secret2).digest("hex");

const secretRefresh = "Lego Fornite";
const secretRefresh2 = "Nudorraiz";

const hashRefresh = crypto
  .createHmac("sha256", secretRefresh)
  .update(secretRefresh2)
  .digest("hex");


  console.log(hashRefresh);