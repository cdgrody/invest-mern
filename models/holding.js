const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holdingSchema = new Schema(
  {
    asset: { type: Object, required: true },
    shares: { type: Number, required: true },
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

module.exports = mongoose.model("Holdings", holdingSchema);
