const getErrorMessage = (errorID: string) => {
  try {
    const errList: string[] = [
      // Error Messages
      "User ID and Password Error",
    ];
    const errID = Number(errorID);
    const errMsg = errList[errID];
    return errMsg ? errMsg : "Error ID Undefined";
  } catch (error) {
    return "Error Errored";
  }
};

export default getErrorMessage;
