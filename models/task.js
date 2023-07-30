const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: { 
        type: String,
        required: true
    },
    dueDate: { 
        type: Date, 
        required: true
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        required: true 
    },
    status: {
        type: String, 
        enum: ['TO-DO', 'IN-PROGRESS', 'COMPLETED'], 
        required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
});

module.exports = mongoose.model('Task',taskSchema);