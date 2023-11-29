import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';

export default function Edit({ openModal, setOpenModal, userId, username, useremail }) {
    // const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [userId, setUserId] = useState(null);

    function onCloseModal() {
        setOpenModal(false);
        setName('');
        setEmail('');
        setPassword('');
        // setUserId(null);
    }

    const handleEditUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                name,
                email,
                password
            });

            console.log('User updated succesfully:', response.data)
            onCloseModal()
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }
    return (
        <>
            <Button className="hidden" onClick={() => setOpenModal(true)}>Edit User</Button>
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
                                id="name"
                                placeholder={username}
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
                                placeholder={useremail}
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
                            <Button className='text-blue-500 bg-white' onClick={handleEditUser}>Update User</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
