<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Nome do prestador de serviço *">
            <validation-provider v-slot="{ errors }" name="nome" rules="required">
              <b-form-input v-model="form.name" name="name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Descrição curta *">
            <validation-provider v-slot="{ errors }" name="descrição" rules="required">
              <b-form-textarea v-model="form.description" name="description" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Contatos *">
            <validation-provider v-slot="{ errors }" name="contatos" rules="required">
              <b-form-textarea v-model="form.contact" name="contact" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Descrição completa do serviço">
            <quill-editor ref="quillEdit" v-model="form.content" />
            <input id="quillfile" type="file" hidden @change="quillUpload">
          </b-form-group>
        </b-col>
        <b-col md="12">
          <CoordinatesPreview :form="form" />
          <div>
            <address-form v-model="form.address" :autoload="false" />
          </div>
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="pictures" url="/api/uploads/images" :multiple="true" />
        </b-col>
      </b-row>
      <br>
      <b-button type="submit" variant="primary" block :disabled="invalid">
        Salvar
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import mixinGlobal from '@/mixins/global'
import mixinForm from '@/mixins/form'
import PicturesUpload from '@/components/admin/PicturesUpload'
import AddressForm from '@/components/admin/AddressForm'
import CoordinatesPreview from '@/components/admin/CoordinatesPreview'
import estados from '@/data/estados.json'
import cidades from '@/data/cidades.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload,
    AddressForm,
    CoordinatesPreview
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    // eslint-disable-next-line
    serviceProvider: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      estados,
      form: {
        name: '',
        description: '',
        contact: '',
        content: '',
        address: {
          location: {
            type: 'Point',
            coordinates: []
          }
        },
        pictures: []
      },
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  },
  computed: {
    cidades () {
      if (this.form.state) {
        return cidades[this.form.state]
      }
      return null
    }
  },
  created() {
    this.toForm(this.form, this.serviceProvider)
  },
  methods: {
    async save() {
      if (this.form.address && this.form.address.location && this.form.address.location.coordinates && this.form.address.location.coordinates.length > 1) {
        this.form.address.location.coordinates[0] = Number(this.form.address.location.coordinates[0])
        this.form.address.location.coordinates[1] = Number(this.form.address.location.coordinates[1])
      }
      if (this.serviceProvider) {
        const serviceProvider = await this.$axios.$put('/api/service_providers/' + this.serviceProvider.slug, this.form).catch(this.showError)
        if (serviceProvider) {
          this.$toast.success('Prestador de serviço atualizado com sucesso!')
          if (this.$auth.hasScope('super') || this.$auth.hasScope('admin')) {
            this.$router.push('/admin/service_providers')
          } else {
            this.$router.push('/conta/prestadores-de-servico')
          }
        }
      } else {
        const serviceProvider = await this.$axios.$post('/api/service_providers', this.form).catch(this.showError)
        if (serviceProvider) {
          if (this.$auth.hasScope('super') || this.$auth.hasScope('admin')) {
            this.$toast.success('Prestador de serviço cadastrado com sucesso!')
            this.$router.push('/admin/service_providers')
          } else {
            this.$toast.success('Prestador de serviço cadastrado com sucesso! Aguardando aprovação do administrador!')
            this.$router.push('/conta/prestadores-de-servico')
          }
        }
      }
    },
    setAddress(address) {
      this.form.address = address
    }
  }
}
</script>
