<template>
  <div class="posts-component pt-4">
    <b-row>
      <b-col v-for="post in posts" :key="post._id" lg="6">
        <n-link :to="'/noticias/' + post.slug" tag="div" class="card">
          <div class="img">
            <b-img :src="post.picture ? post.picture.average : null" :alt="post.title" class="card-img-top" />
          </div>
          <div class="card-body">
            <div class="pattern" />
            <div class="card-title">
              <h3>{{ post.title }}</h3>
            </div>
            <div class="card-text">
              <p>{{ (post.description || post.content) | truncate(1000) }}</p>
              <tags :tags="post.tags" />
            </div>
          </div>
        </n-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="sass">
  .posts-component
    .card
      cursor: pointer
      border: none
      color: #757575
      background-color: #fff
      margin-bottom: 15px
      border-radius: 15px
      min-height: calc(100% - 15px)
      .img
        overflow-y: hidden
      .card-img-top
        border-top-left-radius: 15px
        border-top-right-radius: 15px
      .card-body
        padding: 50px
        .pattern
          width: 15px
          height: 25px
          background-color: #00794e
          position: absolute
          left: 0
        .card-title
          padding: 10px 20px
          margin: -20px
          margin-bottom: 20px
          h3
            color: #00794e
            font-size: 24px
            font-weight: 700
        .card-text
          font-size: 14px
          font-family: 'Titillium Web', sans-serif
          .tags-component
            .btn
              background-color: #00794e
              border-color: #00794e
              color: #fff
              width: auto
              margin: 5px 5px 0 0
              text-transform: none

</style>
