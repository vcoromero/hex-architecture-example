class UseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(input) {
    throw new Error('Method not implemented');
  }
}

module.exports = UseCase;
