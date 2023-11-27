export default {
  async fetch(request) {
    console.log("Proxy initated.");

    let url = new URL(request.url);
    let reqUrl = `${url.pathname.substring(1)}${url.search}`;

    let req = new Request(reqUrl, request);

    console.log("Awaiting response");
    let response = await fetch(req, { cf: { cacheTtl: -1 } });
    console.log("Response obtained");

    response = new Response(response.body, response);
    response.headers.set("Access-Control-Allow-Origin", "*");

    console.log("Returning response");
    return response;
  },
};
