<template>
  <section id="home-section" class="container-fluid">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-6">
        <h1>Website for your to practice Languages by using Flashcard</h1>
        <h5 class="lead mb-2">Pretty sure this will enormously help you to improve your shit</h5>
        <hr>
        <router-link :to="{name: 'courses'}" v-slot="{ href }" custom>
            <a :href="href" class="btn btn-success">Get Started</a>
        </router-link>
        
      </div>
    </div>
  </section>
</template>

<script>
</script>

<style scoped>
  #home-section {
    background: url(https://images.unsplash.com/photo-1601758003630-df669e4e825a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    height: 100vh;
  }

  #home-section > .row {
    height: 100%;
    background-image: linear-gradient(315deg, rgba(45, 52, 54, .7) 19%, rgba(211, 211, 211, .2) 69%);

    color: white;
  }
</style>