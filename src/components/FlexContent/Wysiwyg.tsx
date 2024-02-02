import RichText from "../RichText";
import { BlocksContent } from "@strapi/blocks-react-renderer";

type Props = {
	content?: BlocksContent;
};

const Wysiwyg: React.FC<Props> = (props: Props) => {
	return (
		<RichText className={"text-xl  leading-relaxed"} content={props.content} />
	);
};

export default Wysiwyg;
