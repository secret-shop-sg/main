class DatabaseError extends Error {
  constructor(message) {
    super(
      message || "There is some problem while connecting to the Mongo Database"
    );
    this.status = 500;
  }
}

module.exports = DatabaseError;
