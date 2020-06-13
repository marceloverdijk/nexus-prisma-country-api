import { schema } from 'nexus'
import { createTextChangeRange } from 'typescript'

schema.objectType({
  name: 'Continent',
  description: 'Represents a continent.',
  definition(t) {
    t.id('id', {
      description: 'The unique id of the continent.',
      nullable: false,
    })
    t.string('code', {
      description: 'The unique code of the continent.',
      nullable: false,
    })
    t.string('name', {
      description: 'The name of the continent.',
      nullable: false,
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('continent', {
      type: 'Continent',
      description: 'Returns the continent.',
      nullable: true,
      args: {
        id: schema.idArg({
          description: 'The unique id of the continent.',
          required: true,
        }),
      },
      resolve: (parent, args, ctx) => {
        return ctx.db.continent.findOne({ where: { id: args.id } })
      },
    })
    t.list.field('continentList', {
      type: 'Continent',
      description: 'Returns the continents.',
      nullable: true,
      resolve: (parent, args, ctx) => {
        return ctx.db.continent.findMany()
      },
    })
    t.connection('continentConnection', {
      type: 'Continent',
      nodes(parent, args, ctx, info) {
        ctx.log.info('nodes(..) called!!!!!')
        return ctx.db.continent.findMany()
      },
      totalCount(parent, args, ctx, info) {
        ctx.log.info('totalCount(..) called!!!!!')
        return ctx.db.continent.count()
      },
    })
  },
})
