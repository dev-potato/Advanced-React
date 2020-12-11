const { forwardTo } = require("prisma-binding");
const {hasPermission} = require('../utils');

const Query = {
  // forwardTo is a quick way to mock up CRUD functinoality with a DB. It has NO authentication.
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),

  me(parent, args, ctx, info) {
    //check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. check if they are logged in
    if(!ctx.request.userId) {
      throw new Error('You must be logged in')
    }
    // 2. Check if the user has the permissions to query all of the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
    // 3. If they do, query all of the users.
    return ctx.db.query.users({}, info);
  }
  // async items(parents, args, ctx, info) {
  //     const items = await ctx.db.query.items();
  //     return items;
  // }
};

module.exports = Query;
