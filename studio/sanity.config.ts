import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

const postSchema = {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
        },
        {
            name: 'author',
            title: 'Author Name',
            type: 'string',
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        },
    ],
}

export default defineConfig({
    name: 'default',
    title: 'Terrivo Admin',
    projectId: 'zvazmyez',
    dataset: 'production',
    plugins: [structureTool()],
    schema: {
        types: [postSchema],
    },
})
