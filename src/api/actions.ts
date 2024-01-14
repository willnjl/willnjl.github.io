import { BASE_URL } from "./consts";
import { APIResponseCollection, APIResponseData } from "@/types/types";

export async function getHomepage() {
	return await fetchData<{ data: APIResponseData<"api::homepage.homepage"> }>(
		"homepage"
	);
}

export async function getProjects() {
	return await fetchData<APIResponseCollection<"api::project.project">>(
		"projects"
	);
}

export async function getTags() {
	return await fetchData<APIResponseCollection<"api::tags.tags">>("tags");
}

export async function fetchData<T>(
	endpoint: string,
	revalidate: number = 3600
): Promise<T> {
	let promise = await fetch(`${BASE_URL}/${endpoint}`, {
		next: {
			revalidate,
		},
	});

	if (!promise.ok) {
		throw new Error("Unable to reach API");
	}
	const data: T = await promise.json();

	return data;
}
