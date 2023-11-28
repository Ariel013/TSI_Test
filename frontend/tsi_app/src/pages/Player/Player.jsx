import React, { useState, useEffect } from "react";
import './Player.css';
import player from "../../asset/lebron.jpeg"

function Player() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    const apiGet = () => {
        fetch(`http://localhost:5000/api/game/${searchTerm}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Vous pouvez également inclure d'autres en-têtes si nécessaire
                },
                body: JSON.stringify({ playerName: searchTerm })
            }
        )
            .then((response) => response.json())
            .then((res) => {
                const dataArray = Array.isArray(res) ? res : [res];
                setData(dataArray);
                console.log(res);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données de l'API:", error);
            });
    };

    useEffect(() => {

        apiGet();
    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // Déclencher la recherche lorsque l'utilisateur appuie sur Entrée
            // eslint-disable-next-line no-undef
            apiGet();
        }
    };

    return (
        <><div className="w-[80%] mx-auto h-screen flex flex-col justify-center py-5">
            
            <div className="w-full flex p-1 mb-3">
                <div className="relative w-[50%]">
                    <input type="text" className="w-full  bg-white py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-500 focus:border-black transition-colors duration-300" placeholder="Search..." value={searchTerm} onChange={handleSearch} onKeyDown={handleKeyPress} />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                </div>
            </div>
            {/* component */}
            <div className="bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full gap-10 py-5 px-5 overflow-y-scroll">
                {data.map((game) => (
                    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
                        <div className="w-full flex justify-center p-1 mb-4">
                            <div className="relative w-full playerImage">
                                <div className="image">
                                    <img src={player} alt="" />
                                </div>
                                <div className="relative w-full info">
                                    <h2 className="text-xl font-semibold mb-4">{game.player?.playerName}</h2>
                                    <div className="spacer">

                                    </div>
                                    <h2 className="text-xl font-semibold mb-4"> {game.player?.jerseyNumber}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {/* Card 1 */}

                            <div key={game._id} className=" bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
                                <h2 className="text-xl font-semibold mb-4">Goals</h2>
                                <p className="text-gray-700">{game.goals}</p>
                                <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                                    </dd>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className=" bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
                                <h2 className="text-xl font-semibold mb-4">Rebounds</h2>
                                <p className="text-gray-700">{game.rebounds}</p>
                                <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                                    </dd>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className=" bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
                                <h2 className="text-xl font-semibold mb-4">ThreePoints</h2>
                                <p className="text-gray-700">{game.threePoints}</p>
                                <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                                    </dd>
                                </div>
                            </div>
                            {/* Card 4 */}
                            <div className=" bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
                                <h2 className="text-xl font-semibold mb-4">Blocks</h2>
                                <p className="text-gray-700">{game.blocks}</p>
                                <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                                    </dd>
                                </div>
                            </div>
                            {/* Card 5 */}
                            <div className=" bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
                                <h2 className="text-xl font-semibold mb-4">Mistakes</h2>
                                <p className="text-gray-700">{game.mistakes}</p>
                                <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div></>
    );
}

export default Player;
