const mongoose = require("mongoose");

const tallySchema = new mongoose.Schema({
  state: { type: String },
  infected: { type: Number },
  recovered: { type: Number },
  death: { type: Number },
});

// // pre hook
// tallySchema.pre("aggregate", function (next) {
//   const pipeline = this.pipeline();
//   const hasGroup = pipeline.some((stage) => stage.$group);
//   // return true/false
//   if (!hasGroup) {
//     pipeline.unshift({
//       $group: {
//         _id: "total",
//         recovered: { $sum: "$recovered" },
//         infected: { $sum: "$infected" },
//         death: { $sum: "$death" },
//       },
//     });
//   }
//   next();
// });

exports.tallySchema = tallySchema;
