import { CreateReactApp, isInReactRoutes, ReactRoutes } from './router/reactRouter';
import { CreateVueApp, isInVueRoutes } from './router/vueRouter';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

if (isInVueRoutes()) {
    CreateVueApp();
} else if (isInReactRoutes(ReactRoutes)) {
    CreateReactApp();
} else {
    /* idk man why you opening this page! */
}
