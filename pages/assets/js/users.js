// users.js - User management module
const users = {
    // In-memory user storage (for demo purposes)
    userStorage: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {},

    /**
     * Register a new user
     * @param {string} username 
     * @param {string} email 
     * @param {string} password 
     * @returns {object} {success: boolean, message: string}
     */
    register: function(username, email, password) {
        // Input validation
        if (!username || !email || !password) {
            return { success: false, message: 'Semua field harus diisi' };
        }

        // Username validation
        if (!/^[a-zA-Z0-9_]{4,20}$/.test(username)) {
            return { success: false, message: 'Username harus 4-20 karakter dan hanya boleh mengandung huruf, angka, dan underscore' };
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { success: false, message: 'Format email tidak valid' };
        }

        // Password validation
        if (password.length < 8) {
            return { success: false, message: 'Password harus minimal 8 karakter' };
        }

        // Check if user already exists
        if (this.userStorage[username]) {
            return { success: false, message: 'Username sudah terdaftar' };
        }

        // Check if email already exists
        for (const user in this.userStorage) {
            if (this.userStorage[user].email === email) {
                return { success: false, message: 'Email sudah terdaftar' };
            }
        }

        // Create new user (in production, password should be hashed)
        this.userStorage[username] = {
            username: username,
            email: email,
            password: password, // Note: In production, store only the hashed password
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(this.userStorage));

        return { success: true, message: 'Registrasi berhasil!', user: this.userStorage[username] };
    },

    /**
     * Login user
     * @param {string} username 
     * @param {string} password 
     * @returns {object} {success: boolean, message: string, user?: object}
     */
    login: function(username, password) {
        // Find user
        const user = this.userStorage[username];
        
        if (!user) {
            return { success: false, message: 'Username tidak ditemukan' };
        }

        // Check password (in production, compare hashed passwords)
        if (user.password !== password) {
            return { success: false, message: 'Password salah' };
        }

        return { success: true, message: 'Login berhasil', user: user };
    },

    /**
     * Get user by username
     * @param {string} username 
     * @returns {object|null} User object or null if not found
     */
    getUser: function(username) {
        return this.userStorage[username] || null;
    },

    /**
     * Get all users (for admin purposes)
     * @returns {object} All users
     */
    getAllUsers: function() {
        return this.userStorage;
    },

    /**
     * Delete user by username
     * @param {string} username 
     * @returns {object} {success: boolean, message: string}
     */
    deleteUser: function(username) {
        if (!this.userStorage[username]) {
            return { success: false, message: 'User tidak ditemukan' };
        }

        delete this.userStorage[username];
        localStorage.setItem('users', JSON.stringify(this.userStorage));
        
        return { success: true, message: 'User berhasil dihapus' };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = users;
}