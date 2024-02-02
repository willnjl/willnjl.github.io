import { getTags, getHomepage, getProjects } from "@/api/actions";
import LatestProjects from "@/components/Projects/LatestProjects";
import Section from "@/components/Layout/Section";
import { APIResponse, APIResponseData } from "@/types/types";
import AllTags from "@/components/Projects/AllTags";
import HorizontalScrollHeading from "@/components/Animations/HorizontalScrollHeading";
import FlexContent from "@/components/FlexContent";
import Headshot from "@/components/Headshot";

export default async function Home() {
	let [homepage, projects, tags] = await Promise.all([
		getHomepage(),
		getProjects(),
		getTags(),
	]);

	return (
		<main class="">
			<Section className={"relative pb-20 xl:pb-44"}>
				<div className="absolute top-0 left-0">
					<HorizontalScrollHeading translateX={-500}>
						<h2 className="text-blue-200">{"Developer"}</h2>
					</HorizontalScrollHeading>
				</div>
				<div className="wrap pt-20 relative">
					<div className="lg:flex items-start justify-between">
						<FlexContent
							className={"max-w-4xl"}
							contentList={homepage.data.attributes.content}
						/>
						<Headshot
							headshot={
								//@ts-ignore
								homepage.data.attributes
									.headshot as APIResponse<"plugin::upload.file">
							}
						/>
					</div>
				</div>
			</Section>
			<Section className={"bg-blue-200 text-white relative"}>
				<div className="absolute top-0 left-0">
					<HorizontalScrollHeading translateX={150}>
						<h2 className="text-blue-600">{"Works"}</h2>
					</HorizontalScrollHeading>
				</div>
				<div className="wrap pt-44 relative">
					<div className="md:flex">
						<h4 className="text-8xl md:mr-10 xl:mr-24">Porfolio</h4>
						<div className="flex-1 text-2xl">
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
								ducimus exercitationem in dolores eveniet porro voluptates quod
								nihil enim adipisci vero commodi magni possimus quo, deserunt
								obcaecati quam? Quidem, tenetur.
							</p>
						</div>
					</div>
					<div className="pt-32 mb-8">
						<AllTags tags={tags} />
					</div>
				</div>

				<LatestProjects projects={projects} />
			</Section>
		</main>
	);
}
