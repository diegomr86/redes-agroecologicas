<template>
  <div>
    <div v-if="seedsNetworks">
      <div v-if="seedsNetworks.length > 0">
        <b-row class="seeds-networks-component list-page">
          <b-col v-for="seeds_network in seedsNetworks.filter(seedsNetwork => seedsNetwork.status === 'approved')" :key="seeds_network._id" md="4">
            <n-link :to="'/produtores-organicos/' + seeds_network.slug" tag="div" class="card">
              <div class="img">
                <b-img :src="seeds_network.pictures && seeds_network.pictures.length ? seeds_network.pictures[0].average : null" :alt="seeds_network.name" class="card-img-top" />
              </div>
              <div class="card-body">
                <div class="card-title">
                  <h3>{{ seeds_network.name }}</h3>
                </div>
                <div class="card-text">
                  <p v-if="seeds_network.notes">{{ seeds_network.notes | truncate(1000) }}<br><br></p>
                  <p v-if="seeds_network.headquarters">
                    <strong>Sede:</strong>
                    {{ seeds_network.headquarters }}
                    <br>
                    <br>
                  </p>
                  <n-link class="btn btn-primary" :to="'/produtores-organicos/' + seeds_network.slug">
                    Saiba mais
                  </n-link>
                  <n-link to="/mapa" class="btn btn-default">
                    Voltar ao mapa
                  </n-link>
                </div>
              </div>
            </n-link>
          </b-col>
        </b-row>
      </div>
      <p v-else class="subtitle">Nenhum produtor encontrado</p>
    </div>
    <p v-else class="subtitle"><b-spinner small /> Carregando...</p>
  </div>
</template>

<script>
export default {
  props: {
    seedsNetworks: {
      type: Array,
      default: () => []
    }
  }
}
</script>
