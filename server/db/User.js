const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
 name: {
  type: Sequelize.DataTypes.STRING,
  unique: true,
  allowNull: false,
  validate: {
    notEmpty: true
}
 },

 userType: {
  type: Sequelize.DataTypes.ENUM('STUDENT', 'TEACHER'),
  defaultValue: 'STUDENT',
  allowNull: false,


 }
  



 
});


/**
 * We've created the association for you!
 *
 * A user can be related to another user as a mentor:
 *       SALLY (mentor)
 *         |
 *       /   \
 *     MOE   WANDA
 * (mentee)  (mentee)
 *
 * You can find the mentor of a user by the mentorId field
 * In Sequelize, you can also use the magic method getMentor()
 * You can find a user's mentees with the magic method getMentees()
 */

User.belongsTo(User, { as: 'mentor' });
User.hasMany(User, { as: 'mentees', foreignKey: 'mentorId' });

module.exports = User;
