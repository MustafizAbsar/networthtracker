// js/data-service.js

// Auth helper
const authService = {
    getCurrentUser: () => auth.currentUser,
    login: (email, password) => auth.signInWithEmailAndPassword(email, password),
    logout: () => auth.signOut()
};

// Database CRUD Operations
const dbService = {
    // Save an asset
    saveAsset: (userId, assetData) => {
        return database.ref('assets/' + userId).push(assetData);
    },

    // Fetch assets for the dashboard
    getAssets: (userId, callback) => {
        database.ref('assets/' + userId).on('value', (snapshot) => {
            callback(snapshot.val());
        });
    },

    // Add a transaction (The heartbeat of the app)
    addTransaction: (userId, txnData) => {
        return database.ref('transactions/' + userId).push({
            ...txnData,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
};
