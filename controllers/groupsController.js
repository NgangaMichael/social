const Post = require('../models/postsmodel');
const User = require('../models/usermodel');
const Group = require('../models/groupmodel');

exports.creategroup = async (req, res) => {
    try {
        const {groupname, groupprivacy, slogan, userid} = req.body;
        const savegroup = new Group({
            groupname: groupname,
            groupprivacy: groupprivacy,
            slogan: slogan,
            groupimage: req.file.filename,
        })
        // console.log(savegroup)
        await savegroup.save();
    
        // finding id and pushing to array of user id in groups model
        const user = await User.findById(userid);
        savegroup.creator.push(user._id);
        await savegroup.save();

        res.redirect('/groups');
    } catch (error) {
        console.log('Err on saving group route', error)
    }
}

exports.editgroup = async (req, res) => {
  try {
    const {id} = req.params;
    const group = await Group.findById(id);
    res.render('group/editgroup', {group})
  } catch (error) {
    console.log('Error on edit group page', error)
  }
}

exports.deletegroup = async (req, res) => {
  const { id } = req.params;
  await Group.findByIdAndRemove(id);
  // redirect to the same page 
  res.redirect(req.get('referer'));
}

