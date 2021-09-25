class User {
  constructor(slug, fullname, twitter) {
    this.slug = slug;
    this.fullname = fullname;
    this.twitter = twitter;
  }

  toString() {
    return `User ${this.slug}`;
  }
}

module.exports = {
  User,
};
