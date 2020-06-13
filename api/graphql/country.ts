import { schema } from 'nexus'

schema.objectType({
  name: 'Country',
  description: 'Represents a country.',
  definition(t) {
    t.id('id', {
      description: 'The unique id of the country.',
      nullable: false,
    })
    t.string('code', {
      description: 'The unique ISO 3166-1 alpha-2 code of the country.',
      nullable: false,
    })
    t.string('name', {
      description: 'The name of the country.',
      nullable: false,
    })
    t.field('continent', {
      type: 'Continent',
      description: 'The continent of the country.',
      resolve: (country, args, ctx) => {
        return ctx.db.continent.findOne({ where: { id: country.continentId } })
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('country', {
      type: 'Country',
      description: 'Returns the country.',
      nullable: true,
      args: {
        id: schema.idArg({
          description: 'The unique id of the country.',
          required: true,
        }),
      },
      resolve: (parent, args, ctx) => {
        return ctx.db.country.findOne({ where: { id: args.id } })
      },
    })
    t.list.field('countryList', {
      type: 'Country',
      description: 'Returns the countries.',
      nullable: true,
      resolve: (parent, args, ctx) => {
        return ctx.db.country.findMany()
      },
    })
    t.connection('countryConnection', {
      type: 'Country',
      nodes(parent, args, ctx, info) {
        return ctx.db.country.findMany()
      },
      totalCount(parent, args, ctx, info) {
        return ctx.db.country.count()
      },
    })
  },
})
