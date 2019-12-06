/* eslint-disable max-classes-per-file */
class Error400 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class Error401 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class Error403 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class Error404 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = {
  Error400,
  Error401,
  Error403,
  Error404,
};
