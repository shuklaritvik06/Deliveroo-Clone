import {defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Featured Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short Description',
      type: 'string',

      validation: (Rule) => Rule.required(),
    },
    {
      name: 'restaurants',
      title: 'Restaurants',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'restaurant'}],
        },
      ],
    },
  ],
})
