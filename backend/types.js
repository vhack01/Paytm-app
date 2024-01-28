const z = require("zod");

const userSchema = z.object({
  username: z.string().toLowerCase().min(3).max(30).trim(),
  firstName: z.string().max(50).trim(),
  lastName: z.string().max(50).trim(),
  password: z.string().min(4),
});

module.exports = {
  userSchema,
};
