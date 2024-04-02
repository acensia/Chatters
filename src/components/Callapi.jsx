import OpenAI from "openai";

const callapi = async (jsonData, endpoint) => {
  console.log("Start");
  console.log(jsonData);
  try {
    const response = await fetch(
      "https://1db11e2a-c024-419f-929d-a7373757d8b1-00-3n8boxj5lw12n.spock.replit.dev" +
        endpoint,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData), // Convert the text data into JSON
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json();

    console.log("Success:"); //, responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to reach the server. Please try again later.");
    throw new Error(error);
  }
};

export default callapi;
