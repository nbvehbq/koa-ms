import Koa from 'koa';
import err from './middleware/error';
import { routes, allowedMethods } from './middleware/routes';

const app = new Koa();

app.use(err);
app.use(routes());
app.use(allowedMethods());

app.listen(3000);
