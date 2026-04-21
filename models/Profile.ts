import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  profileName: { type: String, required: true, unique: true },
  bio: { type: String, default: "Henüz bir açıklama yazılmadı." },
  background: { type: String, default: "#0f0f0f" },
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model("Profile", profileSchema);