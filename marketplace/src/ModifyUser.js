import React, { useState } from 'react';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth } from './firebase.js';
import './ModifyUser.css';

const ModifyUser = () => {
  const [newName, setNewName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = async () => {
    if (!newName) {
      setErrorMessage('Please enter a new name.');
      return;
    }

    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setSuccessMessage('Name updated successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Error updating name: ${error.message}`);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      setErrorMessage('Please enter both current and new passwords.');
      return;
    }

    try {
      // Here you might need to reauthenticate the user if required by Firebase.
      await updatePassword(auth.currentUser, newPassword);
      setSuccessMessage('Password updated successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Error updating password: ${error.message}`);
    }
  };

  return (
    <div className="modify-user-container">
      <h2>Modify Profile</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="modify-user-section">
        <h3>Update Name</h3>
        <input
          type="text"
          placeholder="Enter new name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleNameChange}>Update Name</button>
      </div>

      <div className="modify-user-section">
        <h3>Update Password</h3>
        <input
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Update Password</button>
      </div>
    </div>
  );
};

export default ModifyUser;
