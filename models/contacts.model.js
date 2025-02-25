const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        }
      },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
