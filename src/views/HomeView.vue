<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <span class="badge">Welcome to Gatherly</span>
        <h1 class="hero-title">Connect, Discover, and Experience</h1>
        <p class="hero-subtitle">
          Join our vibrant community to explore the best events tailored for you.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <div class="hero-actions">
          <router-link to="/browse/events" class="btn btn-primary">Discover Events</router-link>
          <router-link to="/about" class="btn btn-secondary">Learn More</router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="feature-card" v-for="i in 3" :key="i">
        <div class="feature-icon">{{ ['🎯', '🌐', '👥'][i-1] }}</div>
        <h3>{{ ['Curated Events', 'Global Reach', 'Community Driven'][i-1] }}</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </section>

    <section class="sitemap-visual">
      <h2>Website Structure / Site-Map</h2>
      <p class="sitemap-desc">A quick overview of how this application is structured via Vue Router.</p>
      <ul class="tree">
        <li>
          <router-link to="/">Home</router-link>
          <ul>
            <li><router-link to="/about">About</router-link></li>
            <li>
              <router-link to="/browse">Browse</router-link>
              <ul>
                <li>
                  <router-link to="/browse/events">Event List</router-link>
                  <ul>
                    <li><router-link to="/browse/events/1">Event Detail (Example)</router-link></li>
                  </ul>
                </li>
                <li><router-link to="/browse/category">Category</router-link></li>
              </ul>
            </li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>