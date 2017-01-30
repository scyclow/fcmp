const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CleaningWeekSchema = new Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true
  },
  confirmations: {
    type: [{
      type: String,
      enum: ['max', 'tom', 'steve']
    }],
    default: []
  }
});

CleaningWeekSchema.methods = {
  async confirm(name) {
    return await this.update({ $addToSet: { confirmations: name } });
  }
};

CleaningWeekSchema.statics = {
  async getCurrentWeek() {
    let today = moment();
    if (today.day() === 0) {
      today = today.subtract(1, 'day');
    }

    const weekNumber = today.isoWeek();
    const year = today.year();

    const week = await this.findOne({ weekNumber, year });

    return week || this.create({ weekNumber, year });
  },

  async confirmCurrentWeek(name) {
    const currentWeek = await this.getCurrentWeek();
    await currentWeek.confirm(name);

    return this.getCurrentWeek();
  }
}


const CleaningWeek = mongoose.model('CleaningWeek', CleaningWeekSchema);

module.exports = CleaningWeek;
