<template>
  <div class="default-layout">
    <div class="conta">
      <Header />
      <div class="mb-5" fluid>
        <b-navbar toggleable="lg" type="dark" variant="default">
          <b-navbar-toggle target="header-conta" />
          <b-collapse id="header-conta" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/conta/unidades-de-referencia">Unidades de referência</b-nav-item>
              <b-nav-item to="/conta/prestadores-de-servico">Prestadores de serviço</b-nav-item>
              <b-nav-item to="/conta/produtores-organicos">Produtores orgânicos</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <template v-slot:button-content>
                  <em>{{ $auth.user.name }}</em>
                </template>
                <b-dropdown-item to="/conta/perfil">Meus dados</b-dropdown-item>
                <b-dropdown-item @click="logout">Sair</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <div class="container">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  created () {
    if (this.$auth.hasScope('super') || this.$auth.hasScope('admin')) {
      this.$router.push('/admin')
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>
<style lang="sass">
  .conta
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
    color: #222
  .form-group
    margin-top: 1rem
    legend
      font-weight: bold

</style>
