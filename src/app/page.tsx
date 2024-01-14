import Image from "next/image";
import axios from "../api/axios";
import { AxiosError } from "axios";
import { getTags, getHomepage, getProjects } from "@/api/actions";
import LatestProjects from "@/components/Projects/LatestProjects";
import Section from "@/components/Layout/Section";
import RichText from "@/components/RichText";
import AllTags from "@/components/Projects/AllTags";

export default async function Home() {
	let [homepage, projects, tags] = await Promise.all([
		getHomepage(),
		getProjects(),
		getTags(),
	]);

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
					<div className="mb-4">
						<h4 className="text-sm mr-5 mb-1">Filter</h4>
						<AllTags tags={tags} />
					</div>
					<LatestProjects projects={projects} />
				</div>
			</Section>
		</main>
	);
}
