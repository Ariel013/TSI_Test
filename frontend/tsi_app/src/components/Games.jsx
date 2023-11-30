import { useState, useEffect } from "react";
import axios from 'axios';
import DashboardLayout from "../pages/Layouts/DashboardLayout";

export default function Games() {
    const [gameData, setGameData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/game`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setGameData(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }
        };
        fetchData();
    }, []);

    const handleEdit = async (gameId) => {
		try {
			await axios.put(`${process.env.REACT_APP_BACK_URL}/player/${gameId}`);
			console.log('Remove game with ID')
		} catch (error) {
			console.error('Error removing game:', error)
		}
	}

	const handleRemove = async (gameId) => {
		try {
            const token = localStorage.getItem('token');
			await axios.delete(`${process.env.REACT_APP_BACK_URL}/player/${gameId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
			console.log('Remove game with ID')
		} catch (error) {
			console.error('Error removing game:', error)
		}
	}

    return (
        <DashboardLayout>
            <div class=" w-full mx-10">

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
                                        PLayer
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Goals
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Rebounds
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        ThreePoints
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Blocks
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Mistakes
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
                                {gameData.map((game) => (
                                    <tr
                                        key={game._id}
                                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {game.player.playerName}
                                        </th>
                                        <td class="px-6 py-4">
                                            {game.goals}
                                        </td>
                                        <td class="px-6 py-4">
                                            {game.rebounds}
                                        </td>
                                        <td class="px-6 py-4">
                                            {game.threePoints}
                                        </td>
                                        <td class="px-6 py-4">
                                            {game.blocks}
                                        </td>
                                        <td class="px-6 py-4">
                                            {game.mistakes}
                                        </td>
                                        <td class=" flex px-6 py-4 text-right justify-between">
                                            <button onClick={() => handleEdit(game._id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                            <button onClick={() => handleRemove(game._id)} class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>

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