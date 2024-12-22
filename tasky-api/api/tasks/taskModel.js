import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    deadline: {
        type: Date,
        validate: {
            validator: (date) => date > new Date(),
            message: 'Deadline must be a future date',
        },
    },
    done: { type: Boolean, default: false },
    priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

    // Add userId field
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    },
});

// Middleware to update `updated_at` before save
TaskSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

export default mongoose.model('Task', TaskSchema);
