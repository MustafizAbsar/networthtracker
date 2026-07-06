// js/data-service.js

const NetWorthAPI = {
    
    // ==========================================
    // AUTHENTICATION
    // ==========================================
    
    getCurrentUser: () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
            }, reject);
        });
    },

    // ==========================================
    // ASSETS
    // ==========================================
    
    // Add a new asset
    addAsset: async (assetData) => {
        const user = await NetWorthAPI.getCurrentUser();
        if (!user) throw new Error("User not authenticated");
        
        const newAssetRef = db.ref(`assets/${user.uid}`).push();
        return newAssetRef.set({
            ...assetData,
            lastUpdated: new Date().toISOString()
        });
    },

    // Fetch all assets for the dashboard
    getAssets: (callback) => {
        const user = auth.currentUser;
        if (!user) return;
        
        db.ref(`assets/${user.uid}`).on('value', (snapshot) => {
            const data = snapshot.val();
            // Convert Firebase object to an array for easy mapping in the UI
            const assetsArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            callback(assetsArray);
        });
    },

    // ==========================================
    // LIABILITIES
    // ==========================================
    
    addLiability: async (liabilityData) => {
        const user = await NetWorthAPI.getCurrentUser();
        if (!user) throw new Error("User not authenticated");
        
        const newRef = db.ref(`liabilities/${user.uid}`).push();
        return newRef.set({
            ...liabilityData,
            lastUpdated: new Date().toISOString()
        });
    },

    getLiabilities: (callback) => {
        const user = auth.currentUser;
        if (!user) return;
        
        db.ref(`liabilities/${user.uid}`).on('value', (snapshot) => {
            const data = snapshot.val();
            const liabilitiesArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            callback(liabilitiesArray);
        });
    },

    // ==========================================
    // TRANSACTIONS
    // ==========================================
    
    addTransaction: async (txnData) => {
        const user = await NetWorthAPI.getCurrentUser();
        if (!user) throw new Error("User not authenticated");
        
        const newRef = db.ref(`transactions/${user.uid}`).push();
        return newRef.set({
            ...txnData,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    },

    getRecentTransactions: (limit = 10, callback) => {
        const user = auth.currentUser;
        if (!user) return;
        
        db.ref(`transactions/${user.uid}`)
          .orderByChild('timestamp')
          .limitToLast(limit)
          .on('value', (snapshot) => {
              const data = snapshot.val();
              // Sort descending (newest first)
              const txns = data ? Object.keys(data).map(k => ({ id: k, ...data[k] })).reverse() : [];
              callback(txns);
          });
    }
};
