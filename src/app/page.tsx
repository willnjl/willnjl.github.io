import Image from "next/image";
import axios from "../api/axios";
import { AxiosError } from "axios";
import { getHomepage, getProjects } from "@/api/actions";
import LatestProjects from "@/components/Projects/LatestProjects";
import Section from "@/components/Layout/Section";
import RichText from "@/components/RichText";

export default async function Home() {
	const homepageData = getHomepage();
	const projectsData = getProjects();

	let [homepage, projects] = await Promise.all([homepageData, projectsData]);

	return (
		<main className="text-black">
			<Section>
				<div className="wrap">
					<h1 className="text-4xl mb-8 font-bold">
						{homepage.data.attributes.Heading}
					</h1>
					<RichText content={homepage.data.attributes.Content} />
				</div>
			</Section>
			<Section>
				<div className="wrap">
					<LatestProjects projects={projects} />
				</div>
			</Section>
		</main>
	);
}
