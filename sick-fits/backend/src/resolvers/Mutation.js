const { item } = require("./Query");

const Mutation = {
    async createItem(parent, args, ctx,info) {
        // TODO: check to see if they are logged in

        const item = await ctx.db.mutation.createItem({ 
            data: { 
                ...args 
            } 
        }, info);
        return item;
    },
    updateItem(parent, args, ctx, info) {
        //first take a copy of the updates
        const updates = {...args};
        //remove the ID from the updates
        delete updates.id;
        //run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id,
            },
        }, 
        info
        );
    },
    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};

        // 1. Find the item (Backtick is raw graphql)
        const item = await ctx.db.query.item({where}, `{id title}`);
        // 2. Check if they have permissions for item
        //TODO
        // 3. Delete the item
        return ctx.db.mutation.deleteItem({where}, info)
    }
};

module.exports = Mutation;
