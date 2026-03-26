const { v4: uuidv4 } = require('uuid');
const IdGenerator = require('../../../domain/ports/IdGenerator');

class UuidAdapter extends IdGenerator {
  generate() {
    return uuidv4();
  }
}

module.exports = UuidAdapter;
