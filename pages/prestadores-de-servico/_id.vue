<template>
  <div v-if="service_provider" class="service-provider-page">
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <b-container>
        <h1 class="title pt-5">{{ service_provider.name }}</h1>
        <p v-if="service_provider.description">{{ service_provider.description }}</p>
        <b-row>
          <b-col md="9">
            <div class="quill-content mt-4">
              <banners :items="service_provider.pictures" />
              <div>
                <b-tabs content-class="mt-3" card pills>
                  <b-tab title="Informações gerais" active>
                    <div v-if="service_provider.content" v-html="service_provider.content" />
                    <div v-if="service_provider.contact" class="pre-line" v-html="service_provider.contact" />
                    <br>
                    <div class="text-center">
                      <n-link to="/mapa" class="btn btn-primary">
                        Voltar ao mapa
                      </n-link>
                    </div>
                    <share />
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </b-col>
          <b-col md="3">
            <div v-if="service_provider.address && service_provider.address.location && service_provider.address.location.coordinates" class="mt-3">
              <h3>Localização</h3>
              <div>
                <ItemMap type="service_providers" :address="service_provider.address" />
                <p class="text-center">
                  {{ [service_provider.address.city, service_provider.address.uf].filter(i => i).join(' - ') }}
                </p>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Banners from '@/components/site/Banners'
import ItemMap from '@/components/site/ItemMap'
export default {
  components: {
    Banners,
    ItemMap
  },
  mixins: [mixinGlobal, mixinPage],
  data() {
    return {
      page_id: 'service_providers',
      page_title: this.service_provider ? this.service_provider.name + ' - Prestadores de serviço' : null,
      page_description: this.service_provider ? this.service_provider.description : null,
      page_image: (this.service_provider && this.service_provider.pictures && this.service_provider.pictures.length > 0 ? this.service_provider.pictures[0].url : null)
    }
  },
  computed: {
    breadcrumb () {
      return [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Prestadores de serviço', to: '/prestadores-de-servico' },
        { text: this.service_provider ? this.service_provider.name : '', active: true }
      ]
    },
    service_provider () {
      return this.site.service_providers.find(serviceProvider => serviceProvider.slug === this.$route.params.id)
    }
  },
  methods: {
    filled(fields) {
      return fields.find(field => this.service_provider[field])
    }
  }
}
</script>
<style lang="sass">
  .service-provider-page
    .babdge
      padding: 10px 20px
    .tabs
      margin: -30px -50px 0 -50px
      .card-header
        background-color: #00794e
        border: none
        border-radius: 0
        .nav-pills .nav-link
          color: #fff
          padding: 10px 10px
          font-size: 16px
          &.active
            color: #00794e
            background-color: #fff
      .table
        tr:first-child
          th, td
            border: none
</style>
