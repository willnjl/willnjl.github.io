import { APIResponseCollection } from "@/types/types";
import Link from "next/link";
import Button from "../Button";

type Props = {
	tags: APIResponseCollection<"api::tag.tag">;
};

const AllTags = (props: Props) => {
	return (
		<ul className="">
			{props.tags.data.map((item) => (
				<li key={item.id} className="inline-block mr-4 mb-2 text-lg">
					<Button href="#" text={item.attributes.Title || ""} />
				</li>
			))}
		</ul>
	);
};

export default AllTags;
