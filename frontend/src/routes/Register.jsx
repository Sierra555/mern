import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] =
		useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Password do not match");
		} else {
			try {
				const res = await register({
					name,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate("/");
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<FormContainer>
			<h1>Sign in</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group
					className="my-2"
					controlId="name"
				>
					<Form.Label>Full Name</Form.Label>
					<Form.Control
						type="name"
						placeholder="Enter Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group
					className="my-2"
					controlId="email"
				>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group
					className="my-2"
					controlId="password"
				>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group
					className="my-2"
					controlId="confirmPassword"
				>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) =>
							setConfirmPassword(e.target.value)
						}
					></Form.Control>
				</Form.Group>
				<Button
					type="submit"
					variant="primary"
					className="mt"
					disabled={isLoading}
				>
					{isLoading ? <Loader /> : "Sign up"}
				</Button>
				<Row className="py-3">
					<Col>
						Alredy have an account, then{" "}
						<Link to="/login">Sign in </Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
};

export default Register;
