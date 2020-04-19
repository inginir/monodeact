const { FALL, WINTER, SUMMER } = require("../../constants");
const {
  validateSequence,
  doesTermHaveCourse,
  doesSequenceHaveCourse,
  arePrereqsFulfilled,
  areCoreqsFulfilled,
  validateNoDuplicateCourses,
  validateCoursePlacementBySemester,
  validateAllCoursesPlacesInProperSeasons,
  validateAllCoursesArePlaced,
} = require("../validate");
const {
  validSequenceMockInput,
  validCoursesInProperSeasonsMockInput,
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
} = require("./__mocks__");

describe("validate", () => {
  it("should return true if term has course placed", () => {
    const mockInput = {
      term: { courses: ["ENGR242"] },
      course: { code: "ENGR242" },
    };
    const actual = doesTermHaveCourse(mockInput);
    const expected = true;
    expect(actual).toBe(expected);
  });
  it("should return false if term doesnt not have course placed", () => {
    const mockInput = {
      term: { courses: ["ENGR242"] },
      course: { code: "ENGR213" },
    };
    const actual = doesTermHaveCourse(mockInput);
    const expected = false;
    expect(actual).toBe(expected);
  });

  it("should return true if sequence has course", () => {
    const mockInput = {
      sequence: { terms: [{ courses: ["ENGR242"], season: FALL }] },
      course: { code: "ENGR242" },
    };
    const actual = doesSequenceHaveCourse(mockInput);
    const expected = true;

    expect(actual).toBe(expected);
  });

  it("should return true if course is offered in the provided term", () => {
    const mockInput = {
      course: { code: "ENGR213", seasons: [FALL] },
      term: { season: FALL, year: 2019 },
    };
    const actual = validateCoursePlacementBySemester(mockInput);
    const expected = true;

    expect(actual).toBe(expected);
  });

  it("should return false if course is not offered in the provided term", () => {
    const mockInput = {
      course: { code: "ENGR213", seasons: [FALL] },
      term: { season: WINTER, year: 2019 },
    };
    const actual = validateCoursePlacementBySemester(mockInput);
    const expected = false;

    expect(actual).toBe(expected);
  });

  it("should check if course's prereqs are fulfilled", () => {
    const actualTrue = arePrereqsFulfilled(validPrereqsSequenceMockInput);
    const actualFalse = arePrereqsFulfilled(inValidPrereqsSequenceMockInput);
    expect(actualTrue).toBe(true);
    expect(actualFalse).toBe(false);
  });

  it("should check if course's coreqs are fulfilled", () => {
    const actualTrue = areCoreqsFulfilled(validCoreqsSequenceMockInput);
    const actualFalse = areCoreqsFulfilled(inValidCoreqsSequenceMockInput);
    expect(actualTrue).toBe(true);
    expect(actualFalse).toBe(false);
  });

  it("should check if sequence has duplicate courses", () => {
    const actualTrue = validateNoDuplicateCourses(
      validSequenceDuplicateMockInput
    );
    const actualFalse = validateNoDuplicateCourses(
      inValidSequenceDuplicateMockInput
    );
    expect(actualTrue).toBe(true);
    expect(actualFalse).toBe(false);
  });

  it("should validate if all courses are placed in proper seasons", () => {
    const actualTrue = validateAllCoursesPlacesInProperSeasons(
      validCoursesInProperSeasonsMockInput
    );

    expect(actualTrue).toBe(true);
  });

  it("should return true for valid sequence", () => {
    const actual = validateSequence(validSequenceMockInput);
    const expected = true;

    expect(actual).toBe(expected);
  });

  it("should validate if courses not fulfil prereqs criteria", () => {
    const actualTrue = arePrereqsFulfilled(validPrereqsSequenceMockInput);
    const actualFalse = arePrereqsFulfilled(inValidPrereqsSequenceMockInput);

    expect(actualTrue).toBe(true);
    expect(actualFalse).toBe(false);
  });

  it("should validate if courses fulfil coreqs criteria", () => {
    const actualTrue = areCoreqsFulfilled(validCoreqsSequenceMockInput);
    expect(actualTrue).toBe(true);
    const actualFalse = areCoreqsFulfilled(inValidCoreqsSequenceMockInput);
    expect(actualFalse).toBe(false);
  });

  it("should validate if all courses were placed in the sequence", () => {
    const actualTrue = validateAllCoursesArePlaced(
      validMissingCoursesSequenceMockInput
    );
    const actualFalse = validateAllCoursesArePlaced(
      inValidMissingCoursesSequenceMockInput
    );
    expect(actualTrue).toBe(true);
    expect(actualFalse).toBe(false);
  });

  it("should validate if all courses were placed in the proper seasons", () => {
    const actualTrue = validateAllCoursesPlacesInProperSeasons(
      validSeasonPlacementSequenceMockInput
    );
    const actualFalse = validateAllCoursesPlacesInProperSeasons(
      inValidSeasonPlacementSequenceMockInput
    );

    expect(actualTrue).toBe(true);
    expect(actualFalse).toBe(false);
  });
});
