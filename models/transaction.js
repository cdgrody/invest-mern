const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    asset: { type: Object, required: true },
    transactionType: { type: String, default: "-1" },
    dollars: { type: Number, required: true },
    shares: { type: Number, required: true },
    comment: { type: String, required: true },
    public: { type: Boolean, required: true, default: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    holding: {
      type: Schema.Types.ObjectId,
      ref: "Holding",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
