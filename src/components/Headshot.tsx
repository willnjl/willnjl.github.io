import React from "react";
import LazyLoadMedia from "./LazyLoadMedia";
import { APIResponse } from "@/types/types";
import { assetUrl } from "@/api/actions";

type Props = {
	headshot?: APIResponse<"plugin::upload.file">;
};

const Headshot: React.FC<Props> = ({ headshot }: Props) => {
	return headshot?.data.attributes ? (
		<div className="w-64 xl:w-72 ml-auto -translate-y-10">
			<LazyLoadMedia
				src={assetUrl(headshot.data.attributes?.url)}
				alt={headshot.data.attributes.alternativeText || "William Leighton"}
				type={headshot.data.attributes.mime}
			/>
		</div>
	) : null;
};

export default Headshot;
