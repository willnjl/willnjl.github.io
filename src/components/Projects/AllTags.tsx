import { APIResponseCollection } from "@/types/types";
import Link from "next/link";

type Props = {
	tags: APIResponseCollection<"api::tag.tag">;
};

const AllTags = (props: Props) => {
	return (
		<ul className="">
			{props.tags.data.map((item) => (
				<li key={item.id} className="inline-block mr-4 mb-2 text-lg">
					<Link href={"#"} className="text-blue-700">
						{item.attributes.Title}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default AllTags;
