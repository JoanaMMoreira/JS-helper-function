const getProcessingPage = require("./app");

test("returns error message", async () => {
  const response = await getProcessingPage([
    { state: "processing" },
    { state: "error" },
  ]);
  expect(response).toStrictEqual({ title: "Error page", message: null });
});

test("returns error message if error code is null", async () => {
  const response = await getProcessingPage([
    { state: "processing" },
    { state: "error", errorCode: null },
  ]);
  expect(response).toStrictEqual({ title: "Error page", message: null });
});

test("returns error message if error code is undefined", async () => {
  const response = await getProcessingPage([
    { state: "processing" },
    { state: "error", errorCode: undefined },
  ]);
  expect(response).toStrictEqual({ title: "Error page", message: null });
});

test("returns error message if error code is NO_STOCK", async () => {
  const response = await getProcessingPage([
    { state: "processing" },
    { state: "error", errorCode: "NO_STOCK" },
  ]);
  expect(response).toStrictEqual({
    title: "Error page",
    message: "No stock has been found",
  });
});

test("returns error message if error code is INCORRECT_DETAILS", async () => {
  const response = await getProcessingPage([
    { state: "processing" },
    { state: "error", errorCode: "INCORRECT_DETAILS" },
  ]);
  expect(response).toStrictEqual({
    title: "Error page",
    message: "Incorrect details have been entered",
  });
});

test("returns success message", async () => {
  const response = await getProcessingPage([
    { state: "processing" },
    { state: "success" },
  ]);
  expect(response).toStrictEqual({
    title: "Order complete",
    message: null,
  });
});
