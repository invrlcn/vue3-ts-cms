import { App } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

export default function registerComponents(app: App) {
  app.component('page-search', PageSearch)
  app.component('page-content', PageContent)
}