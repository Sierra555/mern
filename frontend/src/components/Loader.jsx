import { Spinner } from "react-bootstrap";

const Loader = () => {
	return (
		<Spinner
			animation="border"
			role="status"
			style={{
				width: "16px",
				height: "16px",
				marginBlock: "4px",
				marginInline: "16px",
				display: "block",
			}}
		></Spinner>
	);
};

export default Loader;
