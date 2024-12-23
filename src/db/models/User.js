import mongoose from 'mongoose'
import argon2 from 'argon2'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    icon: {
        fileName: { type: String },
        type: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
})

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await argon2.hash(this.password)
    }
    next()
})

export default mongoose.model('User', UserSchema)
