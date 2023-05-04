const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const userSchema = require("../schemas/user.shcema");

const ajv = new Ajv();
addFormats(ajv);

const validateUser = (req, res, next) => {
  const user = req.body;
  const validate = ajv.compile(userSchema);
  const valid = validate(user);

  if (valid) {
    next();
  } else {
    res.status(400).json({ msg: "Dados inválidos", errors: validate.errors });
  }
};

module.exports = validateUser;
