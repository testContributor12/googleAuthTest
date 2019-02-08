const mongoose = require("mongoose");
//suzdawam user schema,koqto moga da sloja kato coleciq w bazata danni.
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});
mongoose.model("users", userSchema);
