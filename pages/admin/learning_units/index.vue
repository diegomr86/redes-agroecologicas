<template>
  <div class="learning_units">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="unidades-de-referencia" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/learning_units/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="learning_units">
        <b-table v-if="learning_units.length" :fields="table" :items="learning_units" responsive="sm">
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/learning_units/' + data.item.slug + '/edit'">
              <b-icon-pencil />
            </n-link>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
            <b-button v-if="data.item.status !== 'approved'" variant="primary" size="sm" @click="approve(data.item)">
              Aprovar
            </b-button>
          </template>
          <template v-slot:cell(area_size)="data">
            <span v-if="data.value">{{ data.value }} hectares</span>
          </template>
        </b-table>
        <b-alert v-else show variant="dark" class="text-center">Nenhum item encontrado</b-alert>
      </div>
      <div v-else class="text-center">
        <b-spinner small label="Carregando..." />
      </div>
    </div>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
export default {
  layout: 'admin',
  mixins: [mixinGlobal],
  data () {
    return {
      show_page_form: false,
      learning_units: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Unidades de referência', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'area_size', label: 'Tamanho da área' },
        { key: 'planting_time', label: 'Mês/Ano do plantio' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.learning_units = await this.$axios.$get('/api/learning_units').catch(this.showError)
    },
    remove (learningUnit) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/learning_units/' + learningUnit.slug).then(() => {
            this.list()
            this.$toast.success('Unidade de referência removida com sucesso!')
          }).catch(this.showError)
        }
      })
    },
    async approve (learningUnit) {
      await this.$axios.put('/api/learning_units/' + learningUnit.slug, { status: 'approved' }).then(() => {
        this.list()
        this.$toast.success('Unidade de referência aprovada com sucesso!')
      }).catch(this.showError)
    }
  }
}
</script>
