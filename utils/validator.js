const validator = (input, name, rules) => {
  let errors = [];

  for (const [key, value] of Object.entries(rules))
    if (!value) errors.push(key);

  if (errors.length > 0) {
    let msg = `Your ${name} must contain at least `;

    if (errors.length === 1) return (msg += errors[0]);

    errors.map((error, index) => {
      index === errors.length - 1
        ? (msg += " and " + error)
        : (msg += error + ", ");
    });

    return msg;
  } else return "";
};

module.exports = validator;
