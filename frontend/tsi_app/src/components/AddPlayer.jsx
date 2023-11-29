import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';

export default function Component() {
    const [openModal, setOpenModal] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [jerseyNumber, setJerseyNumber] = useState('');
    const [position, setPosition] = useState('');
    const [playerImage, setPlayerImage] = useState(null);

    function onCloseModal() {
        setOpenModal(false);
        setPlayerName('');
        setJerseyNumber('');
        setPosition('');
        setPlayerImage(null);
    }

    const handleFile = (event) => {
        const file = event.target.files[0];
        setPlayerImage(file)
        console.log(file)
    };
    const handleAddPlayer = async () => {
        try {
            const formData = new FormData();
            formData.append('playerImage', playerImage);
            formData.append('upload_preset', process.env.CLOUDINARY_CLOUD_NAME)

            const uploadResponse = await axios.post(`${process.env.CLOUDINARY_URL}`, formData)


            const playerImageURL = uploadResponse.data.secure_url;

            // formData.append('imageURL', imageURL);
            const token = localStorage.getItem('token');

            const response = await axios.post(`${process.env.BACK_URL}/player`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                playerName,
                jerseyNumber,
                position,
                playerImage: playerImageURL
                // : formData.get('imageURL'),

            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            });
            console.log('Player added succesfully:', response.data)
            onCloseModal()
        } catch (error) {
            console.error('Error adding player:', error)
        }

    }

    return (
        <>
            <Button className='text-blue-500 bg-white' onClick={() => setOpenModal(true)}>Add Player</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="playerName" value="playerName" />
                            </div>
                            <TextInput
                                id="playerName"
                                placeholder="Lebron"
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
                                placeholder="09"
                                value={jerseyNumber}
                                onChange={(event) => setJerseyNumber(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="position" value="position" />
                            </div>
                            <TextInput
                                id="position"
                                placeholder="Pivot"
                                value={position}
                                onChange={(event) => setPosition(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className='mb-2 block'>
                                <Label htmlFor='playerImage' value='playerImage' />
                            </div>
                            <input type='file' id='playerImage' onChange={handleFile} accept='image/*' required />
                        </div>
                        <div className="w-full">
                            <Button className='text-blue-500 bg-white' onClick={handleAddPlayer}>Add Player</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}