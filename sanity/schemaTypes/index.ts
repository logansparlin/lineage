import { type SchemaTypeDefinition } from 'sanity'

import { EarthGlobeIcon } from '@sanity/icons'
import { ComponentType } from 'react'

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

/** Settings */
import settingsSeo from './settings/settings-seo'
import settingsHeader from './settings/settings-header'
import settingsFooter from './settings/settings-footer'

/** Documents */
import homePage from './documents/home-page'
import caseStudy from './documents/case-study'
import legalPage from './documents/legal-page'

export const allTypes: SchemaTypeDefinition[] = [
  // Settings
  settingsSeo,
  settingsHeader,
  settingsFooter,

  // Documents
  homePage,
  caseStudy,
  legalPage,

  // Blocks
  seo,
  richText,
  richTextLegal,
  richTextSimple,
  externalLink,
  internalLink
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
]

export const hiddenTypes: SchemaTypeDefinition[] = []

export const orderableTypes: SchemaTypeDefinition[] = []
