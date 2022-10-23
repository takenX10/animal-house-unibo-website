import { CreateReactApp, isInReactRoutes } from './router/reactRouter';
import { CreateVueApp, isInVueRoutes } from './router/vueRouter';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'mdb-vue-ui-kit/css/mdb.min.css';

if (isInVueRoutes()) {
  CreateVueApp();
} else if (isInReactRoutes()) {
  CreateReactApp();
} else {
  /* idk man why you opening this page! */
}
