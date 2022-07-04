module.exports = {
  // Resolve teh author infor for a ntoe when requested
  author: async (note, args, { models }) => {
    return await models.User.findById(note.author);
  },
  // Resolved the `favoritedBy` infor for a note when requested
  favoritedBy: async (note, args, { models }) => {
    return await models.User.find({ _id: { $in: note.favoretedBy }});
  }
};