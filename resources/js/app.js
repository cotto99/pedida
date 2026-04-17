import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import ScrollOpen from './pages/ScrollOpen.vue';
import Quiz from './pages/Quiz.vue';
import ScrollClose from './pages/ScrollClose.vue';
import Proposal from './pages/Proposal.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',            component: ScrollOpen  },
        { path: '/quiz',        component: Quiz        },
        { path: '/scroll-close', component: ScrollClose },
        { path: '/proposal',    component: Proposal    },
    ]
});

createApp(App).use(router).mount('#app');