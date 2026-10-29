<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <RouterLink to="/" class="brand">
        <span class="brand-mark">G</span>
        <span>Gatherly<span class="brand-caption">Organizer</span></span>
      </RouterLink>

      <p class="nav-label">WORKSPACE</p>
      <nav class="dashboard-nav" aria-label="Organizer navigation">
        <RouterLink to="/dashboard" exact-active-class="active" class="nav-link">
          <span aria-hidden="true">▦</span>
          Dashboard
        </RouterLink>
        <RouterLink to="/dashboard/events" active-class="active" class="nav-link">
          <span aria-hidden="true">✦</span>
          Event Management
        </RouterLink>
      </nav>

      <div class="sidebar-bottom">
        <p class="sidebar-tip">Bring your community together with events worth sharing.</p>
        <RouterLink to="/browse/events" class="back-link">← Back to public site</RouterLink>
      </div>
    </aside>

    <main class="dashboard-main">
      <header class="dashboard-topbar">
        <span>Organizer workspace</span>
        <RouterLink to="/browse/events">View public events ↗</RouterLink>
      </header>
      <div class="dashboard-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  background: #f7f8fc;
  color: #292744;
}

.dashboard-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.25rem 1.5rem;
  background: #1c1948;
  color: white;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: inherit;
  font-size: 1.1rem;
  font-weight: 750;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 12px;
  background: #7862ff;
  font-size: 1.2rem;
}

.brand-caption {
  display: block;
  margin-top: 0.1rem;
  color: #b8b5d5;
  font-size: 0.72rem;
  font-weight: 500;
}

.nav-label {
  margin: 3rem 0 0.8rem;
  color: #9692bd;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.dashboard-nav {
  display: grid;
  gap: 0.45rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 0.9rem;
  border-radius: 10px;
  color: #d5d3e5;
  font-size: 0.9rem;
  text-decoration: none;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  background: #38336f;
  color: white;
}

.nav-link.active {
  box-shadow: inset 3px 0 #a99aff;
}

.sidebar-bottom {
  margin-top: auto;
}

.sidebar-tip {
  padding: 1rem;
  border: 1px solid #3b376d;
  border-radius: 12px;
  color: #c2bfd9;
  font-size: 0.78rem;
  line-height: 1.6;
}

.back-link {
  display: inline-block;
  margin: 1rem 0.25rem 0;
  color: #d5d3e5;
  font-size: 0.82rem;
  text-decoration: none;
}

.back-link:hover,
.dashboard-topbar a:hover {
  color: #a99aff;
}

.dashboard-main {
  min-width: 0;
}

.dashboard-topbar {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  border-bottom: 1px solid #e9eaf1;
  background: white;
  color: #77758d;
  font-size: 0.84rem;
}

.dashboard-topbar a {
  color: #5146a8;
  font-weight: 650;
  text-decoration: none;
}

.dashboard-content {
  width: min(100%, 1280px);
  margin: 0 auto;
  padding: 2.5rem 3rem 4rem;
}

@media (max-width: 760px) {
  .dashboard-shell {
    grid-template-columns: 1fr;
  }

  .dashboard-sidebar {
    position: static;
    height: auto;
    padding: 1rem 1.25rem;
  }

  .nav-label,
  .sidebar-bottom {
    display: none;
  }

  .dashboard-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 1rem;
  }

  .dashboard-topbar {
    height: 58px;
    padding: 0 1.25rem;
  }

  .dashboard-content {
    padding: 1.5rem 1.25rem 3rem;
  }
}
</style>
