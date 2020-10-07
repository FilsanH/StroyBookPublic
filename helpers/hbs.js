const moment = require('moment') //used to format the date

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format)
  },
}
