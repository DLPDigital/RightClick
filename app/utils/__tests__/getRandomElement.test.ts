import { getRandomElement } from "../getRandomElement"

describe("getRandomElement", () => {
  it("returns an element from the array", () => {
    const arr = [1, 2, 3, 4, 5]
    const result = getRandomElement(arr)
    expect(arr).toContain(result)
  })

  it("throws an error if the array is empty", () => {
    expect(() => getRandomElement([])).toThrow(
      "Cannot select random element from an empty or undefined array."
    )
  })

  it("throws an error if the array is undefined", () => {
    // @ts-expect-error Testing function with undefined input
    expect(() => getRandomElement(undefined)).toThrow(
      "Cannot select random element from an empty or undefined array."
    )
  })

  it("works with arrays of strings", () => {
    const arr = ["a", "b", "c"]
    const result = getRandomElement(arr)
    expect(arr).toContain(result)
  })

  it("works with arrays of objects", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const result = getRandomElement(arr)
    expect(arr).toContain(result)
  })
})
