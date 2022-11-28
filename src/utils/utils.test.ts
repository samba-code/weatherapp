import { padTime, makeTimeFromUnix, makeLabel } from "./utils";

describe("padTime", () => {
  it("should return string with zero leading padding", () => {
    expect(padTime(1)).toEqual("01");
    expect(padTime(11)).toEqual("11");
    expect(padTime(0)).toEqual("00");
  });
});

describe("makeTimeFromUnix", () => {
  it("should return correct time from unix timestamp", () => {
    expect(makeTimeFromUnix(1669666294)).toEqual("20:11");
  });
});

describe("makeLabel", () => {
  const location = {
    lat: 55,
    lon: 55,
    name: "London",
    state: "England",
    country: "UK",
  };
  it("should return correct label from location", () => {
    expect(makeLabel(location)).toEqual("London, England, UK");
  });
});
