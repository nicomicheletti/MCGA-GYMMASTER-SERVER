import { InferSchemaType, model, Schema } from "mongoose"

const gymClassSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
}, {timestamps: true});

type GymClass = InferSchemaType<typeof gymClassSchema>;

export default model<GymClass>("GymClass", gymClassSchema);