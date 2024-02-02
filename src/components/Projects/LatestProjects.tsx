import { APIResponseCollection } from "@/types/types";

import MediaCarousel from "./MediaCarousel";

type Props = {
	projects: APIResponseCollection<"api::project.project">;
};

const LatestProjects = (props: Props) => {
	let { projects } = props;
	return (
		<ul>
			{projects.data.map((project, i) => {
				const title = project.attributes.title;
				const media = project.attributes.media as
					| APIResponseCollection<"plugin::upload.file">
					| undefined;
				return (
					<li key={project.id} role="article" className="mb-2">
						<ul>
							<MediaCarousel media={media} index={i} />
						</ul>
					</li>
				);
			})}
		</ul>
	);
};

export default LatestProjects;
