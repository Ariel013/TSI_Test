import { useState, useEffect } from "react";
import Component from "./AddPlayer";
import axios from 'axios';
import DashboardLayout from "../pages/Layouts/DashboardLayout";

export default function Players() {
    const [playerData, setPlayerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/player');
                setPlayerData(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }
        };
        fetchData();
    }, []);

    const handleEdit = async (playerId) => {
		try {
			await axios.put(`http://localhost:5000/api/player/${playerId}`);
			console.log('Remove player with ID')
		} catch (error) {
			console.error('Error removing player:', error)
		}
	}

	const handleRemove = async (playerId) => {
		try {
			await axios.delete(`http://localhost:5000/api/player/${playerId}`);
			console.log('Remove player with ID')
		} catch (error) {
			console.error('Error removing player:', error)
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
                                        PLayerName
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        JerseyNumber
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Position
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
                                {playerData.map((player) => (
                                    <tr
                                        key={player._id}
                                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {player.playerName}
                                        </th>
                                        <td class="px-6 py-4">
                                            {player.jerseyNumber}
                                        </td>
                                        <td class="px-6 py-4">
                                            {player.position}
                                        </td>
                                        <td class=" flex px-6 py-4 text-right justify-between">
                                            <button onClick={() => handleEdit(player._id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                            <button onClick={() => handleRemove(player._id)} class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>

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