# Glenwood Guest House Demo

这是一个静态、可移植的 Glenwood Guest House 网站演示包。页面包含首页、真实图片、房型详情弹窗、Gallery、评价、Find Us、FAQ 和三步模拟预订流程。

## 1. 最简单的在线部署

### Netlify

1. 将本目录推送到 Git 仓库，或在 Netlify 中导入项目。
2. Build command：`npm run build`
3. Publish directory：`dist`
4. Node.js 版本：20.19 或更新版本。

项目自带 `netlify.toml` 和 `public/_redirects`。

### Cloudflare Pages

1. 在 Cloudflare Pages 中连接仓库。
2. Framework preset 选择 `Vite`。
3. Build command：`npm run build`
4. Build output directory：`dist`
5. 环境变量 `NODE_VERSION` 建议设置为 `20.19.0` 或更新版本。

本站仅使用页面锚点，没有前端路径路由，因此刷新不会产生路由 404。

### Vercel

导入项目即可。项目自带 `vercel.json`，构建命令为 `npm run build`，输出目录为 `dist`。

## 2. Windows 本地启动

最简单方式：双击 `start-demo.bat`。

PowerShell 方式：

```powershell
powershell -ExecutionPolicy Bypass -File .\start-demo.ps1
```

脚本会检查 Node.js。如果依赖不存在，会执行 `npm install`；如果 `dist` 不存在，会自动执行生产构建。脚本不会启动开发模式。

## 3. 访问地址

启动后访问：

`http://localhost:8080`

这里的 localhost 仅是用户在自己电脑上访问独立 Demo 的地址，不是生产页面内部依赖。

## 4. 如何关闭

在启动服务的终端窗口中按 `Ctrl+C`。如果出现确认提示，输入 `Y`。

## 5. 修改电话、地址、评分和预订链接

编辑 `site-config.js`：

- 电话：`property.phoneDisplay` 和 `property.phoneHref`
- 地址：`property.address`
- Google Maps：`links.googleMaps`
- 评价链接：`links.bookingReviews`、`links.googleReviews`
- Booking.com 分数和数量：`reviews.booking.score`、`reviews.booking.count`
- 房型资料：`rooms`
- 真实预订链接：经房主批准后设置 `booking.liveUrl`，并配合页面接入逻辑使用

修改后重新运行：

```powershell
npm.cmd run build
```

## 6. Demo 预订边界

当前预订流程是演示，不读取实时库存、不显示虚假实时价格、不处理付款、不创建订单，也没有声称连接 Booking.com 或 FreeToBook。

页面继续显示：

> Demo booking flow — live availability will connect to Glenwood’s existing booking system before launch.

## 7. 网络要求

网站主体和图片可由本地静态服务器提供。Google Maps、Google/Booking.com 评价链接、电话行为和其他外部链接需要相应设备能力或网络连接。

## 8. 推荐浏览器

推荐最新版 Chrome、Edge、Firefox 或 Safari。Internet Explorer 不受支持。

## 9. 构建和验证命令

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run preview -- --host 0.0.0.0
```

Vite 生产预览默认显示终端给出的地址。独立 Demo 固定使用 8080 端口：

```powershell
npm.cmd run serve:demo
```

### 子目录部署

默认构建用于域名根目录，Vite `base` 为 `/`。若部署到 `/glenwood-demo/` 子目录：

```powershell
$env:VITE_BASE_PATH='/glenwood-demo/'
npm.cmd run build
```

完成后移除临时环境变量：

```powershell
Remove-Item Env:VITE_BASE_PATH
```

## 10. 已知限制

- 实时房态、价格、早餐、入住政策、取消政策和付款仍等待房主及预订服务商确认。
- 地图嵌入和外部评价需要网络。
- 部分照片来自旧官网，原始分辨率有限。
- 这是客户演示版本，不是已经投入运营的真实预订系统。
