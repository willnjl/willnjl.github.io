const production = "https://porfolio-backend-l5ia7.ondigitalocean.app/api";
const dev = "http://localhost:1337/api";

export const BASE_URL =
	process.env.NODE_ENV === "development" ? dev : production;
