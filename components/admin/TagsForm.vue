<template>
  <b-form-group label="Palavras chave">
    <b-form-tags v-model="tags" placeholder="Insira aqui os palavras chave..." @input="changed" />
    <small>ou selecione abaixo para adicionar:</small>
    <div>
      <b-badge v-for="tag in currentTags" :key="tag" :variant="tags.includes(tag) ? 'default' : 'secondary'" @click="addTag(tag)">{{ tag }}</b-badge>
    </div>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    currentTags: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tags: []
    }
  },
  created () {
    this.tags = this.value
  },
  methods: {
    addTag (tag) {
      if (this.tags.includes(tag)) {
        this.tags = this.tags.filter(t => t !== tag)
      } else {
        this.tags.push(tag)
      }
      this.changed()
    },
    changed () {
      this.$emit('input', this.tags)
    }
  }
}
</script>
  <style lang="sass" scoped>
    .badge.badge-secondary
      cursor: pointer
  </style>
