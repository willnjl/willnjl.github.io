import {
	BlocksRenderer,
	type BlocksContent,
} from "@strapi/blocks-react-renderer";

import React from "react";

type Props = {
	content?: BlocksContent;
};

const RichText = (props: Props) => {
	return (
		<div className="wyg">
			<BlocksRenderer content={props.content ?? []} />
		</div>
	);
};

export default RichText;
