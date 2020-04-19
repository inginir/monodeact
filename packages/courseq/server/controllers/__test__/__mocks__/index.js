const { FALL, WINTER, SUMMER } = require("../../../constants");

const ALL_SEASONS = [FALL, WINTER, SUMMER];

const coursesMock = {
  MATH201: { code: "MATH201", seasons: ALL_SEASONS, credits: 3 },
  MATH202: { code: "MATH202", seasons: ALL_SEASONS, credits: 3 },
  MATH203: { code: "MATH203", seasons: ALL_SEASONS, credits: 3 },
  ENGR242: { code: "ENGR242", seasons: [WINTER], credits: 3 },
  ENGR211: {
    code: "ENGR211",
    seasons: [FALL],
    credits: 3,
  },
  ENGR212: {
    code: "ENGR212",
    seasons: [WINTER],
    credits: 3,
  },
  ENGR213: {
    code: "ENGR213",
    seasons: [FALL, SUMMER],
    prereqs: ["ENGR211"],
    coreqs: ["ENGR212"],
    credits: 3,
  },
};

const validSequenceMockInput = {
  sequence: {
    terms: [
      {
        courses: ["ENGR211", "MATH201", "MATH202"],
        season: FALL,
        year: 2019,
      },
      {
        courses: ["ENGR242", "ENGR212", "MATH203"],
        season: WINTER,
        year: 2019,
      },
      { courses: ["ENGR213"], season: SUMMER, year: 2019 },
    ],
  },
  courses: coursesMock,
  creditRange: [
    { min: 0, max: 9 },
    { min: 0, max: 9 },
    { min: 0, max: 9 },
  ],
};

const validCoursesInProperSeasonsMockInput = {
  sequence: {
    terms: [
      { courses: ["ENGR211"], season: FALL, year: 2019 },
      { courses: ["ENGR242"], season: WINTER, year: 2019 },
    ],
  },
  courses: coursesMock,
};

const inValidSequenceDuplicateMockInput = {
  terms: [
    { courses: ["ENGR242", "ENGR211"], season: FALL, year: 2019 },
    { courses: ["ENGR212"], season: WINTER, year: 2019 },
    { courses: ["ENGR213", "ENGR213"], season: SUMMER, year: 2019 },
  ],
};
const validSequenceDuplicateMockInput = {
  terms: [
    { courses: ["ENGR242", "ENGR211"], season: FALL, year: 2019 },
    { courses: ["ENGR212"], season: WINTER, year: 2019 },
    { courses: ["ENGR213"], season: SUMMER, year: 2019 },
  ],
};

const inValidPrereqsSequenceMockInput = {
  sequence: {
    terms: [
      { courses: [], season: FALL, year: 2019 },
      { courses: [], season: WINTER, year: 2019 },
    ],
  },
  course: coursesMock.ENGR213,
  target: 2,
};

const validPrereqsSequenceMockInput = {
  sequence: {
    terms: [
      { courses: ["ENGR211"], season: FALL, year: 2019 },
      { courses: [], season: WINTER, year: 2019 },
    ],
  },
  course: coursesMock.ENGR213,
  target: 2,
};

const inValidCoreqsSequenceMockInput = {
  sequence: {
    terms: [
      { courses: [], season: FALL, year: 2019 },
      { courses: [], season: WINTER, year: 2019 },
      { courses: [], season: SUMMER, year: 2019 },
    ],
  },
  course: coursesMock.ENGR213,
  target: 2,
};

const validCoreqsSequenceMockInput = {
  sequence: {
    terms: [
      { courses: [], season: FALL, year: 2019 },
      { courses: ["ENGR212"], season: WINTER, year: 2019 },
      { courses: [], season: SUMMER, year: 2019 },
    ],
  },
  course: coursesMock.ENGR213,
  target: 2,
};

const inValidSeasonPlacementSequenceMockInput = {
  sequence: {
    terms: [{ courses: ["ENGR212"], season: FALL, year: 2019 }],
  },
  courses: coursesMock,
};

const validSeasonPlacementSequenceMockInput = {
  sequence: {
    terms: [{ courses: ["ENGR212"], season: WINTER, year: 2019 }],
  },
  courses: coursesMock,
};

const inValidMissingCoursesSequenceMockInput = {
  allPlacedCoursesDetailed: {
    MATH201: {},
    // MATH202: {},
    MATH203: {},
    ENGR242: {},
    ENGR211: {},
    ENGR212: {},
    ENGR213: {},
  },
  courses: coursesMock,
};

const validMissingCoursesSequenceMockInput = {
  allPlacedCoursesDetailed: {
    MATH201: {},
    MATH202: {},
    MATH203: {},
    ENGR242: {},
    ENGR211: {},
    ENGR212: {},
    ENGR213: {},
  },
  courses: coursesMock,
};

module.exports = {
  validSequenceMockInput,
  inValidPrereqsSequenceMockInput,
  validPrereqsSequenceMockInput,
  inValidCoreqsSequenceMockInput,
  validCoreqsSequenceMockInput,
  inValidSeasonPlacementSequenceMockInput,
  validSeasonPlacementSequenceMockInput,
  inValidMissingCoursesSequenceMockInput,
  validMissingCoursesSequenceMockInput,
  inValidSequenceDuplicateMockInput,
  validSequenceDuplicateMockInput,
  validCoursesInProperSeasonsMockInput,
  coursesMock,
};
