const Sequelize = require('sequelize');
const db = require('./db');
const { DataTypes: { STRING, ENUM, VIRTUAL}} = Sequelize;

const User = db.define('user', {
 name: {
  type: STRING,
  unique: true,
  allowNull: false,
  validate: {
    notEmpty: true
}
 },

 userType: {
  type: ENUM('STUDENT', 'TEACHER'),
  defaultValue: 'STUDENT',
  allowNull: false,
 },

 isStudent: {
  type: VIRTUAL,
  get: function() {
    return this.type === 'STUDENT';
  }
 },

 isTeacher: {
  type: VIRTUAL,
  get: function(){
    if (this.type === 'TEACHER'){return false}
    else {return false}

  }
 }

});

//class methods
User.findUnassignedStudents = function(){
  return User.findAll({
    where:{
      userType : 'STUDENT',
      mentorId:  null 
    }
  })
}

User.findTeachersAndMentees = function(){
  return User.findAll({
    where:{
      userType : 'TEACHER'
    },
    include: [
      {
        model: User, as: 'mentees'
      }
    ]
   
  })

}



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
