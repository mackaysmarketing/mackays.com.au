/**
 * Central content index — every page-level copy object and shared data
 * structure that the site needs is re-exported from here. Never inline a
 * string in a component; import from "@/content" instead.
 */

export * from './types'
export { SITE } from './site'
export { HOME } from './home'
export { OUR_STORY } from './our-story'
export { PRODUCE, PRODUCE_DATA, CROP_SLUGS } from './produce'
export { PEOPLE_ENVIRONMENT } from './people-environment'
export { WORK_WITH_US } from './work-with-us'
export { MEDIA } from './media'
export { CONTACT } from './contact'
export { FARM_MARKERS } from './farm-markers'
export { TIMELINE_ITEMS } from './timeline'
