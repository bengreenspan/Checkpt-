const router = require('express').Router();
const {
  models: { User },
} = require('../db');

/**
 * All of the routes in this are mounted on /api/users
 * For instance:
 *
 * router.get('/hello', () => {...})
 *
 * would be accessible on the browser at http://localhost:3000/api/users/hello
 *
 * These route tests depend on the User Sequelize Model tests. However, it is
 * possible to pass the bulk of these tests after having properly configured
 * the User model's name and userType fields.
 */

// Add your routes here:



router.get('/unassigned', async(req, res, next) => 
{
  try {
    res.send( await User.findUnassignedStudents());
  }
  catch(x){
    next(x);
  }
});

router.get('/teachers', async(req, res, next) => 
{
  try {
    res.send( await User.findTeachersAndMentees());
  }
  catch(x){
    next(x);
  }
});


router.delete('/:id', async (req, res, next)=> {
  try {
    const user = await User.findByPk(req.params.id);
    if(!user){
      return res.sendStatus(404)
    }
   
else{
    await user.destroy();
    res.sendStatus(204);
  }
}
  catch(x){
    res.sendStatus(400);
  }
  
  });


  router.post('/', async(req, res, next) => {
    try {
      res.status(201);
      res.send(await User.create( { userId: req.params.id, ...req.body }));
    }
    catch(ex) {
      res.sendStatus(409);
    }
  });





module.exports = router;
