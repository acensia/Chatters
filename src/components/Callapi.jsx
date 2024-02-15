import OpenAI from "openai";

const callapi = () => {
  console.log("Start");
  //   const rq = new Request("http://172.31.196.7:8080/", {
  //     method: "GET",
  //   });
  fetch("http://172.31.196.7:8080/").then((res) => console.log(res));
  console.log("Passed");
};

export default callapi;
