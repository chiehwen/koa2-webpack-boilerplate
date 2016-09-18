// 載入 koa v2.x
import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';

const port = process.env.PORT || 3000;

// 初始化 Koa
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = 'Hello World';
});

// 監聽 3001 埠口
app.listen(port, (err) => {
  if (err)
    throw err;
  console.log('server is listening on port', port);
});
