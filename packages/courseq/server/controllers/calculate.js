const calculateTotalCredits = (courses) => {
  return Object.values(courses).reduce((acc, c) => {
    return acc + c.credits;
  }, 0);
};

const calculateTermTotalCredits = (term) => {
  return term.courses.reduce((acc, c) => {
    return acc + c.credits;
  }, 0);
};

module.exports = {
  calculateTotalCredits,
  calculateTermTotalCredits,
};
