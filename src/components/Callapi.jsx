import OpenAI from "openai";

const callapi = async (textData, endpoint) => {
  console.log("Start");
  console.log(textData);
  try {
    const response = await fetch(
      "https://1db11e2a-c024-419f-929d-a7373757d8b1-00-3n8boxj5lw12n.spock.replit.dev" +
        endpoint,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textData }), // Convert the text data into JSON
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.text();
    console.log("Success:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

export default callapi;
