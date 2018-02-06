<template>
  <div>
    <header class="navbar container">
      <section class="navbar-section">
        <router-link class="btn btn-link" to="/orders">列表</router-link>
        <router-link v-show="showAdd" class="btn btn-link" to="/order/create">添加</router-link>
      </section>
      <section class="navbar-section">
        <a class="btn btn-link" v-on:click="daochushuju">导出数据</a>
        <a class="btn btn-link" v-on:click="daorushuju">导入数据</a>
      </section>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'carrepair',
    computed: {
      showAdd: function() {
        return this.$route.path === '/orders';
      }
    },
    methods: {
      daochushuju: function() {
        this.$store.dispatch('daochushuju');
      },
      daorushuju: function() {
        this.$store.dispatch('daorushuju');
      }
    }
  }
</script>

<style>
  @import "~spectre.css/dist/spectre.min.css";
  @import "~spectre.css/dist/spectre-exp.min.css";
  @import "~spectre.css/dist/spectre-icons.min.css";

  .column {
    padding: .4rem
  }
  header {
    margin-top: 50px;
  }
  table {
    border-collapse: collapse;
  }
  .table-bordered {
    border: 1px solid #dee2e6;
  }
  .table-bordered td, .table-bordered th {
    border: 1px solid #dee2e6;
  }
  .column .table tr td {
    height: 41px;
  }
  .table td, .table th {
    padding: .3rem .4rem;
  }
  .container {
    width: 1000px;
  }
  a {
    text-decoration: underline;
  }
  textarea {
    resize: none;
  }
  .form-checkbox .form-icon, .form-radio .form-icon {
    right: 0;
    left: auto;
  }
</style>
