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
    await this.update({ confirmations: _.uniq([name, ...this.confirmations]) });
    return this;
  }
};

CleaningWeekSchema.statics = {
  async getCurrentWeek() {
    let today = moment();
    if (today.day() === 0) {
      today = today.subtract(1, 'day');
    }

    const weekNumber = today.week();
    const year = today.year();

    const week = await this.findOne({ weekNumber, year });

    return week || this.create({ weekNumber, year });
  }
}


const CleaningWeek = mongoose.model('CleaningWeek', CleaningWeekSchema);

module.exports = CleaningWeek;