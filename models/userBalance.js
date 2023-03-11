const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userBalanceSchema = new Schema(
  {
    balance: { type: Number, required: true, min: 0 },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userBalance", userBalanceSchema);
