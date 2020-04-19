const { FALL, WINTER, SUMMER } = require("../../constants");
const { generateSequence } = require("../generate");
const { validateSequence } = require("../validate");
const { coursesMock } = require("./__mocks__");

describe("generate", () => {
  it.only("should generate a valid sequence", () => {
    const generatedSequence = generateSequence({ courses: coursesMock });
    const isValid = validateSequence({
      sequence: generatedSequence,
      courses: coursesMock,
    });
    expect(isValid).toBe(true);
  });
});
