
export const pathGet = (arr1, query) => {
  // TASK 1: 
  // Write a function that searches through the input array / object
  // and returns the appropriate string path leading to the input query, if found
  // Example:
  // const a = {
  //    user: {
  //      id: 1,
  //      name: {
  //        firstName: "James",
  //        lastName: "Ibori"
  //      },
  //      location: {
  //        city: "Ikoyi",
  //        state: "Lagos",
  //        address: "One expensive house like that"
  //      }
  //    }
  // }
  // `pathGet(a, 'One expensive house like that')` = "a.user.location.address"
  // `pathGet(a, 'James')` = "a.user.name.firstName"

  // ============== CODE GOES BELOW THIS LINE :) ==============
  for(let [key, value] of Object.entries(arr1)) {
    if (typeof value === "string" && typeof query === "string") {
      if (value.includes(query)) {
        return key
      }
    }
    if (value === query) {
      return key
    }
    if (value && (typeof value === 'object')) {
      let path = pathGet(value, query)
      if (path)  return `${key}.${path}`
    }
  }
}