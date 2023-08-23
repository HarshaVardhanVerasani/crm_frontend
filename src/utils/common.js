export const getAllStatus = (data) => {
  const result = {
    OPEN: 0,
    CLOSED: 0,
    BLOCKED: 0,
    IN_PROGRESS: 0,
  };

  data.forEach((user) => {
    if (user.status === "OPEN") {
      result.OPEN++;
    } else if (user.status === "CLOSED") {
      result.CLOSED++;
    } else if (user.status === "BLOCKED") {
      result.BLOCKED++;
    } else if (user.status === "IN_PROGRESS") {
      result.IN_PROGRESS++;
    }
  });
  return result;
};

//material ui cannot work on immutable objects so i converted to entirely new deep copy of data.
export const deepCopying = (data) => {
  const stringJSON = JSON.stringify(data);
  const JSONData = JSON.parse(stringJSON);
  return JSONData;
};
