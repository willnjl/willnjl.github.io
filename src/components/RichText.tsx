import {
	BlocksRenderer,
	type BlocksContent,
} from "@strapi/blocks-react-renderer";

import React from "react";

type Props = {
	content?: BlocksContent;
	className?: String;
};

const RichText: React.FC<Props> = (props: Props) => {
	const mergedClasses = `${props.className} wyg`;
	return (
		<div className={mergedClasses}>
			<BlocksRenderer content={props.content ?? []} />
		</div>
	);
};

export default RichText;
