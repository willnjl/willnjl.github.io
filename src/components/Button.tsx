import Link from "next/link";

interface Props {
	text: string;
	href?: string;
}

const Button: React.FC<Props> = (props: Props) => {
	if (props.href) {
		return (
			<Link href={props.href} className="btn-primary">
				{props.text}
			</Link>
		);
	}

	return <button className="btn-primary">{props.text}</button>;
};

export default Button;
