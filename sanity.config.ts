'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { muxInput } from 'sanity-plugin-mux-input'

import { allTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { resolve } from './sanity/lib/resolve'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? ''
const dataset = process.env.SANITY_STUDIO_DATASET ?? ''
const apiVersion = process.env.SANITY_STUDIO_API_VERSION ?? ''

export default defineConfig({
  // basePath: '/studio',
  projectId,
  dataset,
  title: 'Lineage',
  perspective: 'published',

  schema: {
    types: [
      ...allTypes,
    ],
  },
  plugins: [
    structureTool({
      structure
    }),
    visionTool({defaultApiVersion: apiVersion}),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft/enable',
          disable: '/api/draft/disable',
        }
      }
    }),
    muxInput({
      disableUploadConfig: true,
      disableTextTrackConfig: true,
    })
  ],
})
