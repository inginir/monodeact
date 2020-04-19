const { FALL, WINTER, SUMMER } = require("../constants");
const {
  areCourseReqsFulfilled,
  validateCourseIsntPlaced,
  validateTermTotalCreditsWithinRange,
} = require("./validate");

const { calculateTotalCredits } = require("./calculate");

const placeCourse = ({ course, sequence, termIndex }) => {
  const termToUpdate = sequence.terms[termIndex];
  const reqsFulfilled = areCourseReqsFulfilled({
    sequence,
    course,
    target: termIndex,
  });
  const notPlacedYet = validateCourseIsntPlaced({ sequence, course });
  const termHasSpace = validateTermTotalCreditsWithinRange(termToUpdate);
  if (reqsFulfilled && notPlacedYet && termHasSpace) {
    termToUpdate.courses.push(course.code);
  }
  console.log("sequence", sequence);
  return sequence;
};

const getSeason = ({ startSeason, index }) => {
  const seasons = [FALL, WINTER, SUMMER];
  const startSeasonIndex = seasons.findIndex((e) => e === startSeason);
  for (let i = startSeasonIndex; i > 0; i = i - 1) {
    seasons.push(seasons.shift());
  }
  const seasonIndex = index % 3;
  const season = seasons[seasonIndex];
  return seasons[seasonIndex];
};

const getYear = ({ season, index, year }) => {
  if (season == FALL && index > 0) {
    return year + index % 3
  }
}

const generateTerms = ({
  startSeason,
  startYear,
  numberOfTerms,
  minCredits,
  maxCredits,
}) => {
  return Array(numberOfTerms)
    .fill()
    .map((_, i) => {
      return {
        season: getSeason({ startSeason, index: i }),
        year: startYear,
        courses: [],
        creditRange: { min: minCredits, max: maxCredits },
      };
    });
};

const generateSequence = ({
  courses,
  startSeason = WINTER,
  startYear = 2020,
  minCredits = 12,
  maxCredits = 15,
}) => {
  const numberOfTerms = Math.ceil(calculateTotalCredits(courses) / minCredits);
  const terms = generateTerms({
    courses,
    startSeason,
    startYear,
    minCredits,
    maxCredits,
    numberOfTerms: 5,
  });
  const sequence = {
    terms,
  };
  placeCourse({ course: courses.MATH201, sequence, termIndex: 0 });
  return sequence;
};

module.exports = {
  generateTerms,
  generateSequence,
};
