const cards = require('./cards');

module.exports = function(app, con) {
    cards(app, con);
}