<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const mode = computed({
  get: () => (route.query.mode === 'register' ? 'register' : 'login'),
  set: (value) => {
    router.replace({ query: { ...route.query, mode: value } })
  }
})

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errorMessage = ref('')
const successMessage = ref('')

const toggleMode = (nextMode) => {
  mode.value = nextMode
  errorMessage.value = ''
  successMessage.value = ''
  form.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
}

const handleLogin = () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    authStore.login({
      email: form.value.email,
      password: form.value.password,
      name: form.value.email.split('@')[0]
    })

    successMessage.value = 'Welcome back! Redirecting you to your events.'
    const redirectPath = route.query.redirect || '/browse/events'
    window.setTimeout(() => router.push(redirectPath), 600)
  } catch (error) {
    errorMessage.value = error.message
  }
}

const handleRegister = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  try {
    authStore.register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    })

    successMessage.value = 'Account created successfully. Welcome aboard!'
    window.setTimeout(() => router.push('/browse/events'), 600)
  } catch (error) {
    errorMessage.value = error.message
  }
}

const submitForm = () => {
  if (mode.value === 'register') {
    handleRegister()
    return
  }

  handleLogin()
}

const isLoggedIn = computed(() => authStore.isAuthenticated)

if (isLoggedIn.value) {
  router.replace('/browse/events')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-panel">
      <div class="auth-illustration">
        <div class="illustration-badge">Gatherly</div>
        <h1>Discover events worth sharing.</h1>
        <p>
          Join a space designed for memorable experiences, curated communities, and your next big
          moment.
        </p>
        <ul>
          <li>Curated event recommendations</li>
          <li>Instant ticket and RSVP access</li>
          <li>Friendly community updates</li>
        </ul>
      </div>

      <div class="auth-card">
        <div class="card-header">
          <button
            type="button"
            class="tab-button"
            :class="{ active: mode === 'login' }"
            @click="toggleMode('login')"
          >
            Login
          </button>
          <button
            type="button"
            class="tab-button"
            :class="{ active: mode === 'register' }"
            @click="toggleMode('register')"
          >
            Create account
          </button>
        </div>

        <div v-if="errorMessage" class="message error">{{ errorMessage }}</div>
        <div v-if="successMessage" class="message success">{{ successMessage }}</div>

        <form class="auth-form" @submit.prevent="submitForm">
          <div v-if="mode === 'register'" class="field-group">
            <label for="name">Full name</label>
            <input id="name" v-model="form.name" type="text" placeholder="Jane Doe" />
          </div>

          <div class="field-group">
            <label for="email">Email address</label>
            <input id="email" v-model="form.email" type="email" placeholder="you@example.com" />
          </div>

          <div class="field-group">
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" placeholder="••••••••" />
          </div>

          <div v-if="mode === 'register'" class="field-group">
            <label for="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              placeholder="Repeat your password"
            />
          </div>

          <div v-if="mode === 'login'" class="form-options">
            <label class="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" class="helper-link">Forgot password?</a>
          </div>

          <button type="submit" class="submit-button">
            {{ mode === 'register' ? 'Create account' : 'Login to continue' }}
          </button>
        </form>

        <div class="divider"><span>or continue with</span></div>

        <div class="social-buttons">
          <button type="button" class="social-button">Google</button>
          <button type="button" class="social-button">GitHub</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: calc(100vh - 120px);
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #f8f5ff 0%, #f4f6fb 100%);
  border-radius: 28px;
  padding: 2rem;
}

.auth-panel {
  width: min(100%, 1100px);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  background: #ffffff;
  border: 1px solid rgba(29, 27, 53, 0.08);
  border-radius: 28px;
  box-shadow: 0 25px 70px rgba(40, 35, 90, 0.1);
  overflow: hidden;
}

.auth-illustration {
  background: linear-gradient(135deg, #1c1948 0%, #312d77 100%);
  color: #fff;
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.illustration-badge {
  width: fit-content;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.auth-illustration h1 {
  margin: 1.5rem 0 1rem;
  font-size: clamp(2.2rem, 4vw, 3.25rem);
  line-height: 1.1;
}

.auth-illustration p {
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  line-height: 1.7;
}

.auth-illustration ul {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}

.auth-illustration li::before {
  content: '✓';
  margin-right: 0.75rem;
  color: #9ef0c8;
  font-weight: 700;
}

.auth-card {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-header {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  background: #f3f3fa;
  border-radius: 14px;
  padding: 0.4rem;
  margin-bottom: 1.5rem;
}

.tab-button {
  border: none;
  background: transparent;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  font-weight: 700;
  color: #5a5a7a;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-button.active {
  background: #fff;
  color: #1c1948;
  box-shadow: 0 4px 12px rgba(28, 25, 72, 0.08);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2f2d4a;
}

.field-group input {
  border: 1px solid #e2e4ef;
  border-radius: 12px;
  background: #fbfbff;
  padding: 0.9rem 1rem;
  font-size: 0.98rem;
  color: #1b1a2d;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field-group input:focus {
  outline: none;
  border-color: rgba(102, 68, 255, 0.7);
  box-shadow: 0 0 0 4px rgba(102, 68, 255, 0.08);
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.88rem;
  color: #5f5d7a;
}

.remember-me {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.helper-link {
  color: #3f45d9;
  text-decoration: none;
}

.submit-button {
  border: none;
  background: linear-gradient(135deg, #5146d8 0%, #6c3df5 100%);
  color: white;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.98rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 10px 20px rgba(93, 81, 211, 0.25);
}

.submit-button:hover {
  transform: translateY(-1px);
}

.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0 1rem;
}

.divider::before {
  content: '';
  position: absolute;
  inset: 50% 0 auto 0;
  height: 1px;
  background: #ebebf5;
}

.divider span {
  position: relative;
  display: inline-block;
  padding: 0 0.9rem;
  background: #fff;
  color: #7a7a94;
  font-size: 0.8rem;
  letter-spacing: 0.03em;
}

.social-buttons {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.social-button {
  border: 1px solid #e7e8f5;
  background: #fff;
  color: #1d1b3a;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  font-weight: 700;
  cursor: pointer;
}

.message {
  margin-bottom: 1rem;
  padding: 0.8rem 0.9rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
}

.message.error {
  background: rgba(218, 54, 54, 0.08);
  color: #b71c1c;
}

.message.success {
  background: rgba(36, 155, 93, 0.08);
  color: #166534;
}

@media (max-width: 860px) {
  .auth-panel {
    grid-template-columns: 1fr;
  }

  .auth-illustration {
    padding: 2.5rem 2rem;
  }
}
</style>
