const { calculateTermTotalCredits } = require("./calculate");

const validateCoursePlacementBySemester = ({ course, term }) => {
  if (course.seasons.includes(term.season)) return true;
  return false;
};

const doesTermHaveCourse = ({
  term = { courses: [] },
  course = { code: "" },
}) => {
  if (term.courses.includes(course.code)) return true;
  return false;
};

const doesSequenceHaveCourse = ({ sequence, course, termsToSearch }) => {
  const iterable = !!termsToSearch
    ? sequence.terms.slice(termsToSearch.start, termsToSearch.end)
    : sequence.terms;
  const reducer = (acc, term) => acc || doesTermHaveCourse({ term, course });
  return iterable.reduce(reducer, false);
};

const areCoursesFulfilled = ({ sequence, courses = [], target }) => {
  return courses.reduce((acc, pr) => {
    return (
      acc &&
      doesSequenceHaveCourse({
        sequence,
        course: { code: pr },
        termsToSearch: { start: 0, end: target },
      })
    );
  }, true);
};

const arePrereqsFulfilled = ({ sequence, course, target }) => {
  return areCoursesFulfilled({ sequence, courses: course.prereqs, target });
};

const areCoreqsFulfilled = ({ sequence, course, target }) => {
  return areCoursesFulfilled({
    sequence,
    courses: course.coreqs,
    target: target + 1,
  });
};

const getAllPlacedCoursesDetailed = ({ sequence, courses }) => {
  return sequence.terms.reduce((acc, term, i) => {
    const reducedCourses = term.courses.reduce((acc, c) => {
      return { ...acc, [c]: { ...courses[c], index: i, term } };
    }, {});
    return { ...acc, ...reducedCourses };
  }, {});
};

const doesCourseExistInPlacedCourses = (course, allPlacedCoursesDetailed) =>
  !!allPlacedCoursesDetailed[course.code];

const validateAllCoursesArePlaced = ({ courses, allPlacedCoursesDetailed }) =>
  Object.values(courses).reduce((acc, course) => {
    return (
      acc && doesCourseExistInPlacedCourses(course, allPlacedCoursesDetailed)
    );
  }, true);

const areAllCoursesReqsFulfilled = ({ sequence, allPlacedCoursesDetailed }) => {
  return Object.values(allPlacedCoursesDetailed).reduce((acc, course) => {
    return (
      acc &&
      arePrereqsFulfilled({ sequence, course, target: course.index }) &&
      areCoreqsFulfilled({ sequence, course, target: course.index })
    );
  }, true);
};

const areCourseReqsFulfilled = ({ sequence, course, target }) => {
  return (
    arePrereqsFulfilled({ sequence, course, target }) &&
    areCoreqsFulfilled({ sequence, course, target })
  );
};

const validateCourseIsntPlaced = ({ sequence, course }) => {
  const allPlacedCoursesArray = sequence.terms.reduce((acc, term) => {
    return [...acc, ...term.courses];
  }, []);
  return !!allPlacedCoursesArray[course.code];
};

const validateNoDuplicateCourses = (sequence) => {
  const allPlacedCoursesArray = sequence.terms.reduce((acc, term) => {
    return [...acc, ...term.courses];
  }, []);
  const firstUnique = (value, index, array) => array.indexOf(value) === index;
  const numUnique = allPlacedCoursesArray.filter(firstUnique).length;
  const allUnique = allPlacedCoursesArray.length === numUnique;
  return allUnique;
};

const validateAllCoursesPlacesInProperSeasons = ({ sequence, courses }) => {
  const allPlacedCoursesDetailed = getAllPlacedCoursesDetailed({
    sequence,
    courses,
  });
  return Object.values(allPlacedCoursesDetailed).reduce((acc, placedCourse) => {
    const { term, seasons = [] } = placedCourse;
    const isPlacedInProperSeason = seasons.includes(term.season);
    return acc && isPlacedInProperSeason;
  }, true);
};

const calculateTotalCredits = ({ term, courses }) => {
  const { courses: termCourses = [] } = term;
  return termCourses.reduce((acc, c) => {
    return acc + courses[c].credits;
  }, 0);
};

const validateTermsTotalCreditsWithinRange = ({
  sequence,
  courses,
  creditRange = [],
  //   min,
  //   max
}) => {
  return sequence.terms.reduce((acc, term, i) => {
    const totalCredits = calculateTotalCredits({ term, courses });
    const { max, min } = creditRange[i] || {};
    const isOutOfRange = totalCredits > max || totalCredits < min;
    return acc && !isOutOfRange;
  }, true);
};

const validateTermTotalCreditsWithinRange = (term) => {
  const totalCredits = calculateTermTotalCredits(term);
  return !(
    totalCredits > term.creditRange.max || totalCredits < term.creditRange.min
  );
};

//TODO: all courses placed -DONE
//TODO: make sure no duplicate courses are placed
//TODO: all prereqs fulfilled
//TODO: all coreqs fulfilled
//TODO: courses placed in correct season
//TODO: credit limit falls between range

//TODO:
//TODO:
const validateSequence = ({ sequence, courses, creditRange }) => {
  const allPlacedCoursesDetailed = getAllPlacedCoursesDetailed({
    sequence,
    courses,
  });
  return (
    validateTermsTotalCreditsWithinRange({
      sequence,
      courses,
      creditRange,
    }) &&
    validateAllCoursesPlacesInProperSeasons({ sequence, courses }) &&
    areAllCoursesReqsFulfilled({ sequence, allPlacedCoursesDetailed }) &&
    validateNoDuplicateCourses(sequence) &&
    validateAllCoursesArePlaced({ courses, allPlacedCoursesDetailed })
  );
};

module.exports = {
  validateCoursePlacementBySemester,
  validateNoDuplicateCourses,
  doesTermHaveCourse,
  doesSequenceHaveCourse,
  arePrereqsFulfilled,
  areCoreqsFulfilled,
  validateAllCoursesPlacesInProperSeasons,
  validateAllCoursesArePlaced,
  validateSequence,
  areCourseReqsFulfilled,
  validateCourseIsntPlaced,
  validateTermTotalCreditsWithinRange,
};
