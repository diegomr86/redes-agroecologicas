<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/learning_units">Unidades de referência</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/service_providers">Prestadores de serviço</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/seeds_networks">Produtores orgânicos</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/planting_areas">Áreas de plantio</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/women_groups">Grupos de mulheres</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/posts">Notícias</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/events">Eventos</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/medias">Biblioteca</b-list-group-item>
      <b-list-group-item to="/admin/contacts">Contatos</b-list-group-item>
      <b-list-group-item to="/admin/users">Membros</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('super')" to="/admin/sites">Redes</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin') && $store.state.site" :to="'/admin/sites/' + $store.state.site._id + '/edit'">Configurações da rede</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', active: true }
      ]
    }
  }
}
</script>
