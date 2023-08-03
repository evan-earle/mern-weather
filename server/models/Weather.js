import mongoose from "mongoose";
const { Schema } = mongoose;

const weatherSchema = new Schema(
  {
    mainCity: {
      type: String,
      required: false,
      active: false,
    },
    favouriteCityOne: {
      type: String,
      required: false,
      active: false,
    },
    favouriteCityTwo: {
      type: String,
      required: false,
      active: false,
    },
    favouriteCityThree: {
      type: String,
      required: false,
      active: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Weather", weatherSchema);
