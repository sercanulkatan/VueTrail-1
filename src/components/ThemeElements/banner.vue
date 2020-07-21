<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark unique-color" style>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" tag="li" active-class="active" exact>
          <a class="nav-link">
            Kayıtlı Ürünler
            <span class="sr-only">(current)</span>
          </a>
        </router-link>
        <!-- Exact act,ve class için tam eşleşme durumunu kontrol eder -->
        <router-link to="/productAdd" tag="li" active-class="active">
          <a class="nav-link">Ürün Ekle</a>
        </router-link>
        <router-link to="/productSell" tag="li">
          <a class="nav-link">Ürün Çıkışı</a>
        </router-link>
      </ul>
    </div>
  </nav>
  <!-- Navbar -->
</template>