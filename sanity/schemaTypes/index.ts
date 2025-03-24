import { type SchemaTypeDefinition } from 'sanity'

import { EarthGlobeIcon } from '@sanity/icons'
import type { ComponentType } from 'react'

/** Types */
type SchemaTypeGroup = {
  title: string
  icon: ComponentType
  types: SchemaTypeDefinition[]
  divider?: boolean
  singleton?: boolean
}

type SingletonType = SchemaTypeDefinition | SchemaTypeGroup

// Blocks
import seo from './blocks/seo'
import richText from './blocks/rich-text'
import richTextLegal from './blocks/rich-text-legal'
import richTextSimple from './blocks/rich-text-simple'
import externalLink from './blocks/external-link'
import internalLink from './blocks/internal-link'
import media from './blocks/media'

/** Settings */
import settingsSeo from './settings/settings-seo'
import settingsHeader from './settings/settings-header'
import settingsFooter from './settings/settings-footer'

/** Documents */
import homePage from './documents/home-page'
import caseStudy from './documents/case-study'
import legalPage from './documents/legal-page'
import teamPage from './documents/team'
import teamMember from './documents/team-member'

/** Modules */
import quote from './modules/quote'
import mediaBlock from './modules/media-block'
import textBlock from './modules/text-block'
import diptych from './modules/diptych'
import offsetMedia from './modules/offset-media'
import mediaCarousel from './modules/media-carousel'

export const allTypes: SchemaTypeDefinition[] = [
  // Settings
  settingsSeo,
  settingsHeader,
  settingsFooter,

  // Documents
  homePage,
  caseStudy,
  legalPage,
  teamPage,
  teamMember,

  // Modules
  quote,
  mediaBlock,
  textBlock,
  diptych,
  offsetMedia,
  mediaCarousel,
  
  // Blocks
  seo,
  richText,
  richTextLegal,
  richTextSimple,
  externalLink,
  internalLink,
  media
]

export const singletonTypes: SingletonType[] = [
  {
    title: 'Global Settings & Navigation',
    icon: EarthGlobeIcon,
    types: [settingsHeader, settingsFooter, settingsSeo],
    singleton: true,
    divider: true,
  },
  homePage,
  teamPage,
]

export const hiddenTypes: SchemaTypeDefinition[] = []

export const orderableTypes: SchemaTypeDefinition[] = [
  caseStudy,
  teamMember
]
