import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';

export default function Component() {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onCloseModal() {
        setOpenModal(false);
        setName('');
        setEmail('');
        setPassword('');
    }

    const handleAddUser = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(`${process.env.BACK_URL}/game`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                name,
                email,
                password
            });

            console.log('Game added succesfully:', response.data)
            onCloseModal()
        } catch (error) {
            console.error('Error adding game:', error)
        }
    }
    return (
        <>
            <Button className='text-blue-500 bg-white' onClick={() => setOpenModal(true)}>Add User</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="name" />
                            </div>
                            <TextInput
                                id="name"
                                placeholder="Lebron"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="email" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="name@gmail.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="password" />
                            </div>
                            <TextInput 
                            id="password"
                            type="password"
                            value={password} 
                            onChange={(event) => setPassword(event.target.value)} 
                            required />
                        </div>
                        <div className="w-full">
                            <Button className='text-blue-500 bg-white' onClick={handleAddUser}>Add User</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
