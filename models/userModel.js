const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/users.json');

const User = {
    getAll: () => {
        const data = fs.readFileSync(dataPath);
        return JSON.parse(data);
    },
    save: (userData) => {
        const users = User.getAll();
        users.push(userData);
        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
    }
};
module.exports = User;