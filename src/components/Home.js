import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "../style/Home.css";
import { api } from "../utils/api";

function Home() {
	const [upvotedContestants, setUpvotedContestants] = useState([]);

	// Model Show Hide State
	const [show, setShow] = useState(false);
	const [editShow, setEditShow] = useState(false);
	const [profileShow, setProfileShow] = useState(false);
	const [id, setId] = useState("");
	const [singleContestant, setSingleContestant] = useState({});

	// Main Contestant State
	const [contestants, setContestants] = useState([]);

	// Add Contestant Form State
	const [name, setName] = useState("");
	const [costumeTitle, setCostumeTitle] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [avatar, setAvatar] = useState("");

	// Handle model show close
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleEditClose = () => setEditShow(false);
	const handleEditShow = () => setEditShow(true);
	const handleProfileClose = () => setProfileShow(false);
	const handleProfileShow = (profId) => {
		async function fetchProfile(profId) {
			const response = await api({
				method: "GET",
				url: `/contestants/${profId}`,
			});
			setSingleContestant(response.data);
			setProfileShow(true);
		}
		fetchProfile(profId);
	};

	async function fetchData(options) {
		const data = await api(options);
		setContestants(data.data);
	}

	const editContestant = async () => {
		const resp = await api({
			method: "PATCH",
			url: `/contestants/${id}`,
			data: {
				name,
			},
		});
		if (resp.data.status === "ok") {
			fetchData({
				method: "GET",
				url: "/contestants",
			});
		} else {
			/**
			 * * TODO:// Add Sweat Alert
			 */
			alert("Something Went Wrong!!!");
		}
		handleEditClose();
		setName("");
	};

	const addContestant = async (e) => {
		e.preventDefault();
		const data = await api({
			method: "POST",
			url: "/contestants",
			data: {
				name: name,
				costumeTitle: costumeTitle,
				costumeImgUrl: avatar,
				city: city,
				country: country,
			},
		});
		if (data.data.status === "success") {
			fetchData({
				method: "GET",
				url: "/contestants",
			});
			setName("");
			setAvatar("");
			setCostumeTitle("");
			setCity("");
			setCountry("");
			Swal.fire({
				title: "Success",
				text: "Contestant Added Successfully",
				icon: "success",
				timer: 1500,
			});
			handleClose();
		}
	};

	const upvoteContestant = async (profId) => {
		if (upvotedContestants.find(({ id }) => id === profId)) {
			Swal.fire({
				title: "Already upvoted!",
				text: "You can only upvote once!",
				icon: "warning",
			});
			return;
		} else {
			const response = await api({
				method: "PATCH",
				url: `/contestants/${profId}/upvote`,
			});
			if (response.data.status === "ok") {
				Swal.fire({
					title: "Upvoted!",
					text: "You have successfully upvoted this contestant",
					icon: "success",
				});
			} else {
				Swal.fire({
					title: "Oops!",
					text: "Something went wrong",
					icon: "error",
				});
			}

			fetchData({
				method: "GET",
				url: "/contestants",
			});

			// set upvotedContestants
			setUpvotedContestants(upvotedContestants.concat([{ id: profId }]));
		}
	};

	useEffect(() => {
		fetchData({
			mathod: "GET",
			url: "/contestants",
		});
	}, []);

	return (
		<div className="container ">
			<div
				className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"
				style={{ opacity: 0.9 }}>
				<div className="row ">
					<div className="col-sm-3 mt-5 mb-4 text-gred"></div>
					<div
						className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
						style={{ color: "green" }}>
						<h2>
							<b>Contestants</b>
						</h2>
					</div>
					<div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
						<Button variant="primary" onClick={handleShow}>
							Add New Contestant
						</Button>
					</div>
				</div>
				<div className="row">
					<div className="table-responsive ">
						<table className="table table-striped table-hover table-bordered">
							<thead>
								<tr>
									<th>ID</th>
									<th>Avatar</th>
									<th>Name </th>
									<th>City </th>
									<th>Country </th>
									<th>Votes </th>
									<th>upvote </th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{contestants.map((contestant) => (
									<tr key={contestant.id}>
										<td>
											{contestant.id.substr(
												contestant.id.length - 5,
											)}
										</td>
										<td>
											<img
												src={contestant.costumeImgUrl}
												alt={contestant.name}
												height="50px"
												width="50px"
											/>
										</td>
										<td>{contestant.name}</td>
										<td>{contestant.city}</td>
										<td>{contestant.country}</td>
										<td>{contestant.votes}</td>
										<td>
											<i
												onClick={() => {
													upvoteContestant(
														contestant.id,
													);
												}}
												className="material-icons"
												id={contestant.id}
												style={{ color: "purple" }}>
												&#x25B3;
											</i>
										</td>
										<td>
											<i
												onClick={async () => {
													handleProfileShow(
														contestant.id,
													);
												}}
												className="material-icons"
												style={{ color: "#10AB80" }}>
												&#xE417;
											</i>
											<i
												onClick={() => {
													setId(contestant.id);
													handleEditShow();
												}}
												className="material-icons"
												style={{ color: "#0D6EFD" }}>
												&#xE254;
											</i>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Profile Model Box */}
				<div className="model_box">
					<Modal
						show={profileShow}
						onHide={handleProfileClose}
						backdrop="static"
						keyboard={false}>
						<Modal.Header closeButton>
							<Modal.Title>Contestant Profile</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="form-group">
								<div className="container mt-3">
									<div className="row d-flex justify-content-center">
										<div className="col-md-7">
											<div className="card p-3 py-4">
												<div className="text-center">
													{" "}
													<img
														src={
															singleContestant.costumeImgUrl
														}
														width="100"
														className="rounded-circle"
														alt=""
													/>{" "}
												</div>
												<div className="text-center mt-3">
													{" "}
													<span className="bg-secondary p-1 px-4 rounded text-white">
														<b>Votes:</b>{" "}
														{singleContestant.votes}
													</span>
													<div className="bg-info rounded">
														<h4 className="mt-2 mb-0">
															{
																singleContestant.name
															}
														</h4>{" "}
														<span
															style={{
																color: "#36454F",
																fontSize:
																	"18px",
															}}>
															{
																singleContestant.costumeTitle
															}
														</span>
														<div
															className="text-center text-secondary"
															style={{
																fontSize:
																	"13px",
															}}>
															<span className="p-1 px-4">
																{
																	singleContestant.city
																}
																,{" "}
																{
																	singleContestant.country
																}
															</span>
														</div>
														<div className="px-4 mt-1"></div>
													</div>
												</div>
												{/* <div className="text-center mt-2 text-secondary">
													{singleContestant.city},{" "}
													{singleContestant.country}
												</div> */}
											</div>
										</div>
									</div>
								</div>
							</div>
						</Modal.Body>

						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => {
									setId("");
									handleProfileClose();
								}}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>

					{/* Profile Model Box Finsihs */}
				</div>

				{/* Edit Contestant Model Box */}
				<div className="model_box">
					<Modal
						show={editShow}
						onHide={handleEditClose}
						backdrop="static"
						keyboard={false}>
						<Modal.Header closeButton>
							<Modal.Title>Edit Contestant</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{/* <form> */}
							<div className="form-group">
								<input
									type="text"
									className="form-control contestant-name"
									id="exampleInputEmail1"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter Name"
								/>
							</div>

							<button
								// type="submit"
								onClick={(e) => editContestant(e)}
								className="btn btn-success mt-4">
								Edit Contestant
							</button>
							{/* </form> */}
						</Modal.Body>

						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={handleEditClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>

					{/* Model Box Finsihs */}
				</div>
				{/* End Edit Contestant Model Box */}

				{/* <!--- Model Box ---> */}
				<div className="model_box">
					<Modal
						show={show}
						onHide={handleClose}
						backdrop="static"
						keyboard={false}>
						<Modal.Header closeButton>
							<Modal.Title>Add Contestant</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{/* <form> */}
							<div className="form-group">
								<input
									type="text"
									className="form-control contestant-name"
									id="exampleInputEmail1"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter Name"
								/>
							</div>
							<div className="form-group mt-3">
								<input
									type="text"
									className="form-control contestant-title"
									id="exampleInputEmail1"
									value={costumeTitle}
									onChange={(e) =>
										setCostumeTitle(e.target.value)
									}
									placeholder="Enter Costume Title"
								/>
							</div>
							<div className="form-group mt-3">
								<input
									type="text"
									className="form-control contestant-country"
									id="exampleInputEmail1"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									placeholder="Enter Country"
								/>
							</div>
							<div className="form-group mt-3">
								<input
									type="text"
									className="form-control contestant-city"
									id="exampleInputEmail1"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									placeholder="Enter City"
								/>
							</div>
							<div className="form-group mt-3">
								<input
									type="text"
									className="form-control contestant-avatar"
									id="exampleInputPassword1"
									value={avatar}
									onChange={(e) => setAvatar(e.target.value)}
									placeholder="Enter Avatar URL"
								/>
							</div>

							<button
								// type="submit"
								onClick={(e) => addContestant(e)}
								className="btn btn-success mt-4">
								Add Contestant
							</button>
							{/* </form> */}
						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>

					{/* Model Box Finsihs */}
				</div>
			</div>
		</div>
	);
}

export default Home;
