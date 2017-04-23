const data = [
  {
    id: 'c80637c4-4d51-4e04-94c2-70716320e078',
    firstName: 'Tylor',
    lastName: 'Stewart',
    email: 'trjstewart@gmail.com',
    verified: 'false',
    password: '$2a$10$EmdJGrxSqVfBu6CW3g/dr.1W/YATYAR0b.WppROJK/Mi8dUxiB3m2',
    type: 'individual',
    subscription: 'null',
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    data.map((obj) => {
      obj.createdAt = new Date();
      obj.updatedAt = new Date();

      return obj;
    });

    return queryInterface.bulkInsert('Users', data);
  },

  down: (queryInterface, Sequelize) => {
    const ids = data.map(obj => obj.id);

    return queryInterface.bulkDelete('Users', { id: ids });
  },
};


// id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
// firstName: { type: DataTypes.STRING, required: true, allowNull: false },
// lastName: { type: DataTypes.STRING, required: true, allowNull: false },
// email: { type: DataTypes.STRING, unique: true, required: true, allowNull: false },
// verified: { type: DataTypes.BOOLEAN, required: true, allowNull: false, defaultValue: false },
// password: { type: DataTypes.STRING, required: true, allowNull: false },
// type: { type: DataTypes.ENUM('individual', 'organization'), required: true, allowNull: false },
// subscription: { type: DataTypes.DATE, required: true, defaultValue: null },