const handleErrorCode = (errorCode) => {
  const title = "Error page";

  switch (errorCode) {
    case "NO_STOCK":
      return { title, message: "No stock has been found" };
    case "INCORRECT_DETAILS":
      return {
        title,
        message: "Incorrect details have been entered",
      };
    default:
      return { title, message: null };
  }
};

const delay = (ms) => {
  return new Promise((response) => {
    setTimeout(response, ms);
  });
};

/**
 * Gets the processing page
 * @param {array} data
 */
const getProcessingPage = async (data) => {
  const processData = async (i = 0) => {
    for (i; i < data.length; i++) {
      if (data[i].state === "processing") {
        // if the state is "processing" we wait 2 seconds and call the processData function again with a new "i"
        i++;
        await delay(2000); // wait for the delay promise to resolve
        processData(i);
      }

      // else, if the state is error or success we just return the object response
      if (data[i].state === "error") {
        return handleErrorCode(data[i].errorCode);
      }
      if (data[i].state === "success") {
        return { title: "Order complete", message: null };
      }
    }
  };

  const response = await processData();

  return response;
};

module.exports = getProcessingPage; // export the main function for testing
