import MockDate from "mockdate";

import { formatDate } from "./date";

describe("utils/date", () => {
  describe("formatDate", () => {
    beforeEach(() => {
      MockDate.set("2021-09-30 12:00:00");
    });
    afterEach(() => {
      MockDate.reset();
    });
    it("should not mutate param", () => {
      const originalDate = new Date("2021-09-01T12:34:56.000Z");
      formatDate(originalDate);
      expect(originalDate.toISOString()).toBe("2021-09-01T12:34:56.000Z");
    });
    it("should return relative date for less than 30 days", () => {
      const { formattedDate, isRelative } = formatDate(new Date("2021-09-01"));
      expect(formattedDate).toBe("4 weeks ago");
      expect(isRelative).toBe(true);
    });
    it("should return relative date for less than 30 days - taking in account future dates", () => {
      const { formattedDate, isRelative } = formatDate(new Date("2021-10-10"));
      expect(formattedDate).toBe("1 week from now");
      expect(isRelative).toBe(true);
    });
    it("should return absolute date for more than 30 days", () => {
      const { formattedDate, isRelative } = formatDate(new Date("2021-08-01"));
      expect(formattedDate).toBe("1 Aug 2021");
      expect(isRelative).toBe(false);
    });
    it("should return absolute date for more than 30 days - taking in account future dates", () => {
      const { formattedDate, isRelative } = formatDate(new Date("2021-11-10"));
      expect(formattedDate).toBe("10 Nov 2021");
      expect(isRelative).toBe(false);
    });
  });
});
