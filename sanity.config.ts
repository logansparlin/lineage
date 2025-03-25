'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { muxInput } from 'sanity-plugin-mux-input'

import { apiVersion, dataset, projectId } from './sanity/env'
import { allTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { resolve } from './sanity/lib/resolve'

export default defineConfig({
  basePath: '/studio',
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
