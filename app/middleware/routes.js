import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';

import product from '../models/product';

const koaBody = convert(KoaBody());
const router = new Router();

router
  .get('/product', async (ctx) => {
    ctx.body = await product.getAll();
  })
  .get('/product/:id', async (ctx) => {
    const result = await product.get(ctx.params.id);
    if (result) {
      ctx.body = result;
    } else {
      ctx.status = 204;
    }
  })
  .post('/product', koaBody, async (ctx) => {
    ctx.status = 201;
    ctx.body = await product.create(ctx.request.body);
  })
  .put('/product/:id', koaBody, async (ctx) => {
    ctx.status = 204;
    await product.update(ctx.params.id, ctx.request.body);
  })
  .delete('/product/:id', async (ctx) => {
    ctx.status = 204;
    await product.delete(ctx.params.id);
  });

const routes = () => router.routes();
const allowedMethods = () => router.allowedMethods();

export { routes, allowedMethods };
