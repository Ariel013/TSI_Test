import { useState, useEffect } from "react";
import axios from 'axios';
import DashboardLayout from "../pages/Layouts/DashboardLayout";
import Component from "./AddUser"
import Edit from "./EditUser";


export default function Users() {
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState(null);
	const [openModal, setOpenModal] = useState(false);


	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('${process.env.BACK_URL}/user');
				setUserData(response.data.users);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setLoading(false)
			}
		};
		fetchData();
	}, []);

	const handleEdit = async (userId) => {
		setUserId(userId);
		setOpenModal(true);
		// try {
		// 	await axios.put(`http://localhost:5000/api/user/${userId}`);
		// 	console.log('Remove user with ID')
		// } catch (error) {
		// 	console.error('Error removing user:', error)
		// }
	}

	const handleRemove = async (userId) => {
		try {
			await axios.delete(`${process.env.BACK_URL}/user/${userId}`);
			console.log('Remove user with ID')
		} catch (error) {
			console.error('Error removing user:', error)
		}
	}
	return (
		<DashboardLayout>
			<div class=" w-full mx-10">
				<div className="flex justify-end mt-5">
					<Component />
				</div>

				<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
					<div class="p-10">

					</div>
					{loading ? (
						<p>Loading...</p>
					) : (
						<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>

									<th scope="col" class="px-6 py-3">
										Name
									</th>
									<th scope="col" class="px-6 py-3">
										Email
									</th>
									<th scope="col" class="px-6 py-3">
										Role
									</th>
									<th scope="col" class="px-6 py-3">
										Action
									</th>
									{/* <th scope="col" class="px-6 py-3">
										<span class="sr-only">Edit</span>
									</th> */}

								</tr>
							</thead>
							<tbody>
								{userData.map((user) => (
									<tr
										key={user._id}
										class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

										<th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
											{user.name}
										</th>
										<td class="px-6 py-4">
											{user.email}
										</td>
										<td class="px-6 py-4">
											{user.role}
										</td>
										<td class=" flex px-6 py-4 text-right justify-between">
											<Edit openModal={openModal} setOpenModal={setOpenModal} userId={userId} username={user.name} useremail={user.email}/>
											<button onClick={() => handleEdit(user._id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
											<button onClick={() => handleRemove(user._id)} class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>

										</td>
									</tr>
								))}

							</tbody>
						</table>
					)}

				</div>


				<script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
			</div>
		</DashboardLayout>
	)
}