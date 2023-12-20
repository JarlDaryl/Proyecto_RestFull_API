const crypto = require("crypto");

const secret = "Santiago Bernabeu";
const secret2 = "Los Angeles Lakers";

const hash = crypto.createHmac("sha256", secret).update(secret2).digest("hex");
