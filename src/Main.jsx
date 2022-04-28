import { CreateReactApp, isInReactRoutes } from './router/ReactRouter';
import { CreateVueApp, isInVueRoutes } from './router/VueRouter';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

if (isInVueRoutes()) {
    CreateVueApp();
} else if (isInReactRoutes()) {
    CreateReactApp();
} else {
    /* idk man why you opening this page! */
}
