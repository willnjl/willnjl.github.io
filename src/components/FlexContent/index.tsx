// Import other components as needed

import { BlocksContent } from "@strapi/blocks-react-renderer";
import Wysiwyg from "./Wysiwyg";

interface FlexibleContent {
	id: number;
	__component: "flexible-content.hero" | "flexible-content.wysiwyg";
}

interface ComponentProps {
	content?: BlocksContent;
	heading?: string;
}

const DynamicComponent: React.FC<FlexibleContent> | null = ({
	__component,
	...props
}) => {
	switch (__component.split(".")[1]) {
		case "hero":
		case "wysiwyg":
			return <Wysiwyg {...(props as ComponentProps)} />;
		default:
			return <div>Unknown Component ... {__component}</div>;
	}
};

type Props = {
	contentList?: FlexibleContent[];
	className?: string;
};

const FlexContent: React.FC<Props> = ({ contentList = [], className = "" }) => {
	return (
		<div className={className}>
			{contentList.map((content) => (
				<DynamicComponent key={content.id} {...content} />
			))}
		</div>
	);
};

export default FlexContent;
