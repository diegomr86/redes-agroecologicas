<template>
  <div v-if="page" class="prestadores-de-servico-page">
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <page-info :page="page" />
      <b-container>
        <ServiceProviders :service-providers="service_providers" />
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'service_providers',
      page_title: 'Prestadores de serviço',
      breadcrumb: [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Prestadores de serviço', active: true }
      ]
    }
  },
  computed: {
    service_providers () {
      let serviceProviders = this.site.service_providers
      if (this.$route.query.tag) {
        serviceProviders = serviceProviders.filter(serviceProvider => {
          return serviceProvider.tags.find(tag => tag.slug === this.$route.query.tag)
        })
      }
      return serviceProviders
    }
  }
}
</script>
