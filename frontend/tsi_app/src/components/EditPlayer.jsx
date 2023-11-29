import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';

export default function Edit({ openModal, setOpenModal, playerId, PlayerName, PlayerJersey, PlayerPosition }) {
    // const [openModal, setOpenModal] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [jerseyNumber, setJerseyNumber] = useState('');
    const [position, setPosition] = useState('');
    // const [userId, setUserId] = useState(null);

    function onCloseModal() {
        setOpenModal(false);
        setPlayerName('');
        setJerseyNumber('');
        setPosition('');
        // setUserId(null);
    }

    const handleEditPlayer = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/player/${playerId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                playerName,
                jerseyNumber,
                position
            });

            console.log('Player updated succesfully:', response.data)
            onCloseModal()
        } catch (error) {
            console.error('Error updating player:', error)
        }
    }
    return (
        <>
            <Button className="hidden" onClick={() => setOpenModal(true)}>Edit Player</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update User Informations</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="name" />
                            </div>
                            <TextInput
                                id="playerName"
                                placeholder={PlayerName}
                                value={playerName}
                                onChange={(event) => setPlayerName(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="jerseyNumber" value="jerseyNumber" />
                            </div>
                            <TextInput
                                id="jerseyNumber"
                                placeholder={PlayerJersey}
                                value={jerseyNumber}
                                onChange={(event) => setJerseyNumber(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="password" />
                            </div>
                            <TextInput 
                            id="position"
                            value={position} 
                            onChange={(event) => setPosition(event.target.value)} 
                            required />
                        </div>
                        <div className="w-full">
                            <Button className='text-blue-500 bg-white' onClick={handleEditPlayer}>Update User</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
