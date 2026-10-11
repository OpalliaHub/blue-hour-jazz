# Blue Hour · 爵士合奏实验室

**Blue Hour is a browser-based jazz learning environment for beginners who do not read music.** Explore ensemble roles, play guided musical phrases, compare arrangements, and reflect with an optional AI coach. The interface and teaching guide support Simplified Chinese, Traditional Chinese, and English.

Blue Hour v3.0 面向无需读谱的中学生与大学生。学习者可以安排一支五人爵士乐队、加入 jam、比较不同编制，并用文字与实际聆听解释自己的选择。它把“先听见差异，再尝试，再解释”放在练习中心；按键是经过设计的音符、和弦或乐句，并非真实乐器的完整键盘。

| 当前内容 | 数量与范围 |
| --- | --- |
| 标准曲目录 | **240 个不同曲目条目，239 首可选择合奏** |
| 可合奏标准曲 | 235 首 ChoCo 来源和弦表 + 4 首带来源旋律的早期标准曲 |
| 只供聆听的曲目 | Take Five；当前伴奏引擎只支持 4/4 |
| 原创练习 | 另有 **5 首**，不计入上述标准曲数量 |
| 大师聆听 | 7 个主题、**14 个已核验录音入口**；链接到外部发行或播放页 |
| 场景与乐器 | 爵士俱乐部、屋顶、录音室；钢琴、贝斯、鼓、萨克斯、吉他 |
| 教学安排 | 60 分钟核心课 + 可选 20 分钟真实录音迁移活动 |

**源码公开与网站公开是两件事。** 这份仓库发布的是可配置的源码；现有 Sites 网站仍为拥有者私有访问。公开 GitHub 仓库不会自动更改该网站的可见性，也不会替你创建一个公网 AI 后端。

## 1. 本地启动

### 环境

- Node.js **22.15.0 或以上**；建议使用 **Node.js 24 LTS**，与本项目验证环境一致。完整测试使用 Node 的原生 TypeScript 支持和 [`registerHooks`（22.15.0 起提供）](https://nodejs.org/download/release/v22.15.0/docs/api/module.html)。
- 包管理器固定为 **pnpm 11.25.0**，依赖版本以 `pnpm-lock.yaml` 为准。
- 使用支持 Web Audio 的现代浏览器。麦克风要求安全上下文：本机 `localhost` / `127.0.0.1` 或 HTTPS。
- 不需要数据库、音频采样包、DeepSeek 账号即可体验合奏和本地学习活动。AI 教练需要额外配置。

从 GitHub 的 **Code** 菜单复制本仓库地址并克隆，或下载 ZIP、解压后进入含 `package.json` 的目录。首次运行：

```bash
cd blue-hour-jazz
node --version
npm install --global pnpm@11.25.0
pnpm --version
pnpm install
pnpm dev --host 127.0.0.1 --port 3000
```

打开终端显示的本机地址，通常是 `http://127.0.0.1:3000`。首次点击“开始合奏”后，浏览器才会启用声音。没有配置 AI 时，页面仍提供本地学习提示。

本仓库保留 Sites / Vinext / Cloudflare Vite 运行结构。启动入口是 `scripts/run-framework.mjs`，不要改用 `next dev` 或将它当成可直接静态导出的 Next.js 模板。干净克隆默认使用 portable 运行配置；`.sites-runtime/` 是本机生成状态，无需从其他电脑复制。

### 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev --host 127.0.0.1 --port 3000` | 本机开发、热更新与本地 AI 调试 |
| `pnpm build` | 生成 `dist/` 中的客户端与 Worker 构建产物 |
| `pnpm start` | 在本机 Wrangler 中预览已构建产物，须先 build |
| `pnpm test` | 音乐引擎、音频分析、曲库数据测试 |
| `pnpm typecheck` | TypeScript 检查 |
| `pnpm exec tsc --noEmit` | 与 typecheck 等效的直接命令 |
| `pnpm lint` | ESLint 检查 |

`pnpm start` 不运行开发服务器的模拟登录中间件，因此验证 AI 登录流程时应使用 `pnpm dev`。构建成功并不代表已完成公网部署或生产认证配置。

如果需要直接运行 `scripts/*.sh` 辅助脚本，或使用可选的 `managed-linux` 构建配置，请先执行 `chmod +x scripts/*.sh`，确保脚本具有执行权限。上表中的默认 portable 配置与 pnpm 命令不依赖这些执行权限。

## 2. 配置 DeepSeek 教练

### 本机密钥

在项目根目录执行：

```bash
cp .dev.vars.example .dev.vars
```

用编辑器打开 `.dev.vars`，填入自己的密钥：

```dotenv
DEEPSEEK_API_KEY=YOUR_DEEPSEEK_API_KEY
DEEPSEEK_MODEL=deepseek-flash
```

| 配置项 | 说明 |
| --- | --- |
| `DEEPSEEK_API_KEY` | 仅服务端使用的 DeepSeek 密钥；留空时 AI 返回未连接提示 |
| `DEEPSEEK_MODEL` | 可选；代码默认 `deepseek-flash`，需为你的账号当前可用且兼容该请求格式的模型 |

保存后重启开发服务器。教练名称 `edushoegazers` 写在服务端提示词与响应里，目前没有 `DEEPSEEK_AGENT_NAME` 环境变量。项目也不要求 Tracking ID。

`.dev.vars` 已被 Git 忽略；模板文件 `.dev.vars.example` 只含空值或示例。不要把真实密钥放进 README、前端组件、JSON 曲谱、`NEXT_PUBLIC_*` 变量或 GitHub 提交。生产环境应在托管平台的 Secret 配置中设置同名变量。

Cloudflare Vite 插件从 `.dev.vars` 读取本地 Secret；构建时可能把它复制到输出目录用于本地预览，生产 Secret 则需单独在平台设置。因此不要发布未经检查的 `dist/` 压缩包。参见 [Cloudflare Vite Plugin — Secrets](https://developers.cloudflare.com/workers/vite-plugin/reference/secrets/)。

### 本地登录与调用

1. 保持使用 `pnpm dev` 和回环地址 `127.0.0.1`。
2. 在同一个浏览器打开 `http://127.0.0.1:3000/signin-with-chatgpt?return_to=%2F`。
3. 本地预览会建立一个**模拟身份**并返回首页；这一步不会验证真实互联网账号。
4. 在 AI 教练里提问，例如：“保持贝斯开启，比较含根音和去根音配音，我应该听什么？”

模拟身份只服务于本机开发。开发插件限制回环连接，并清除客户端自带的认证头；不要把开发服务器经隧道公开充当生产后端。改变端口时，上面的登录地址也要同步改变。退出本地身份可访问同源 `/signout-with-chatgpt?return_to=%2F`。

### AI 实际能做什么

浏览器向 `POST /api/coach` 发送问题、最多最近 6 条对话和经过限制的游戏文字状态，例如曲目、当前与下一和弦、角色、难度、当前按键材料、编制、速度、主奏、钢琴配音与观察记录。服务端再调用 DeepSeek。每个问题最多 1,200 字符；请求有长度检查、25 秒超时，以及每个身份每分钟 6 次的实例内尽力限流。限流不跨实例持久化，不能替代生产用量控制。

教练可以解释一个聆听实验，或建议“加入贝斯”“移除贝斯”“放慢速度”；建议动作须由学习者点击应用。它不能听到录音、评价每一个真实演奏音符、替你写反思或任意控制所有控件。原始音频与音频分析不会自动发送给 DeepSeek。

## 3. v3 玩法与功能边界

### 编制、伴奏与 Solo

五种乐器可以分别开关。钢琴、贝斯、吉他、萨克斯可切换伴奏 / Solo；同一时刻有一位主奏，其他声部按编配规则减少密度。选择“我来演奏”后，该声部的自动演奏交给学习者，其他成员继续伴奏。

钢琴配音可以选“自动随编制”“含根音”“去根音”。自动模式在缺少贝斯或贝斯担任 Solo 时补充低音，在贝斯伴奏时为低音声部让出空间。这是教学编配规则，不是所有爵士情境都必须遵守的定律。

A/B 按钮同时改变贝斯是否在场与自动钢琴编配，并重置为全员伴奏、从曲首开始。因此 A/B 比较的是整体编配。若要只比较配音，应保持贝斯与其他设置不变，手动切换钢琴的“含根音 / 去根音”。

### 三档难度

| 难度 | 键盘按键 | 学习材料 |
| --- | --- | --- |
| 入门 | `A S D` | 基础节拍、短动机、角色与留白 |
| 进阶 | `A S D F J K` | 更多和弦音、连接与乐句材料 |
| Bebop | `A S D F J K L ;` | 半音趋近、包围音、张力与解决等引导范例 |

每个按键的当前音符或功能在页面显示，并随和声、乐器与难度变化。它们是固定生成材料，不能任意指定音高、长按延音或编辑每个音。提高难度不会自动提高速度；鼓使用节奏材料而非音阶。复杂乐句参考实际下一和弦变化，避免把所有变化都假设在下一小节。

8 小节挑战以音频时钟测量真实按键触发时间，用约 ±120 ms 的窗口统计落拍；同一拍不会因重复按键多次加分。它衡量操作节拍表现，不等于旋律正确率、爵士音乐素养或真实乐器演奏能力。

### 真实演奏与麦克风

“真实演奏”支持本地录音或导入浏览器可解码的 WAV、MP3、M4A 等文件。点击授权后可选择麦克风或音频接口；开始录音时会暂停应用伴奏，减少扬声器串音。

- **单音模式**：估计约 40–1500 Hz 的基频、实音音名、相对 A4=440 Hz 十二平均律的音分及稳定片段。移调乐器的实音可能与谱面记音不同。
- **节奏 / 和弦模式**：观察能量起音与强弱；不进行钢琴复调扒谱，也不识别完整和弦。
- **限制**：每次最多 120 秒、8 MiB。短音、踏板、噪声、泛音、削波与设备延迟会影响结果；检测置信度不是“演奏正确率”，起音间隔也不是与乐队同步的节拍分数。
- **保存**：可回放、下载录音与分析 JSON。录音及分析在浏览器内处理，不自动上传或持久保存；离开前主动下载。离开录音视图或隐藏标签页会停止录音并释放设备。

为不便开麦克风的学习者保留聆听、按键与文字反思等同等参与方式。

### 本地学习记录

前测、后测、观察、同伴讨论与离场卡支持浏览器本地保存及 JSON 导出。界面语言和难度也会保留；旧的自由文本与对话不会自动翻译。清除浏览器数据、更换设备或使用隐私窗口可能丢失记录，应主动导出备份。项目没有班级云数据库、多人实时合奏或教师后台。

## 4. 曲库、真实旋律与聆听推荐

目录支持搜索、类型筛选、分页与逐曲来源查看。可播放数量按不同标题计数，移调重复条目不重复计算。

| 类型 | 播放内容与来源 |
| --- | --- |
| 235 首和弦表 | 来自 ChoCo 的 iReal Pro 和弦标注子集；保留具体来源编配的展开顺序和小节内变化。自动萨克斯为生成的和弦音示范，不是原曲主题或大师 Solo 扒谱 |
| 4 首带旋律标准曲 | Oh, Lady Be Good!、Look for the Silver Lining、Embraceable You、I Got Rhythm；旋律来自 Freed Jazz 谱源，伴奏为简化教学改编 |
| Take Five | 外部聆听与比较任务；5/4 暂不作为 4/4 可播放曲目加入引擎 |
| 5 首原创练习 | 12 小节蓝调、ii–V–I、minor vamp、张力解决练习、B♭ Rhythm Changes 32 小节练习 |

四首 Freed Jazz 改编保留来源音高与时值，伴奏每小节只保留第一个来源和弦。I Got Rhythm 使用来源前 32 小节学习循环，省略四小节尾声及原谱导航；不是完整原版结尾。ChoCo 曲目则使用 `chordEvents` 保留所选来源的小节内和弦变化，不把每首曲目替换成同一个通用进行。

235 首数据共有 10,367 个和弦事件，来源展开长度为 12–100 小节；某个条目的引子、反复或尾声属于所选标注，不保证是该曲唯一或公认标准曲式。原始风格标签是来源元数据，不表示合成器能精确模仿每个流派或录音。

14 个录音入口分布在 7 个聆听主题，不意味着每首目录曲都附有两个大师版本。外部平台可能要求订阅或受地区限制；项目不下载录音、歌词、唱片封面或大师独奏转录。所有应用内声音均由 Web Audio 合成。

## 5. 导入自己的曲目

点击“带上你的曲目来 jam”，选择 JSON 文件或粘贴 JSON。仅导入自创或已取得适当使用权限的素材；导入器不解析 PDF、MuseScore、MusicXML、iReal 链接或整本 Real Book。

最小示例是一段原创四小节练习：

```json
{
  "title": "我的 ii–V–I 练习",
  "key": "C",
  "bpm": 88,
  "chords": ["Dm7", "G7", "Cmaj7", "Cmaj7"]
}
```

若某小节中途换和弦，加入绝对拍数事件：

```json
{
  "title": "两小节和声连接",
  "key": "C",
  "bpm": 88,
  "chords": ["Dm7", "Cmaj7"],
  "chordEvents": [
    { "beat": 0, "chord": "Dm7" },
    { "beat": 2, "chord": "G7" },
    { "beat": 4, "chord": "Cmaj7" },
    { "beat": 7.5, "chord": "A7" }
  ],
  "melodyEvents": [
    { "beat": 0, "midi": 65, "duration": 1 },
    { "beat": 1, "midi": 69, "duration": 1 },
    { "beat": 2, "midi": 71, "duration": 1 },
    { "beat": 4, "midi": 72, "duration": 2 }
  ]
}
```

该示例的音符是原创说明材料。`beat` 从 0 开始，以四分音符为 1 拍；每小节 4 拍，所以第二小节从 4 开始。无旋律事件的时间段保持休止。

| 字段 | 约束与行为 |
| --- | --- |
| `title` | 必填，1–80 个字符 |
| `chords` | 必填，1–256 小节；每项是该小节开始时的和弦摘要 |
| `key` | 可选，最多 24 个字符的调性说明；不会自动移调 |
| `bpm` | 可选，50–240，省略为 90；入门界面的速度上限为 160 |
| `chordEvents` | 可选，1–2048 个变化；第一项必须在 `beat: 0`，拍点不能重复，必须在曲目内并落在 0.5 拍网格。导入时会排序；每个和弦持续到下一事件 |
| `melody` | 可选，1–1024 个逐拍 MIDI 整数；音高 48–88，`-1` 为休止 |
| `melodyEvents` | 可选，最多 2048 个 `{beat, midi, duration}`；起点在曲目内，MIDI 36–96，时值大于 0 且不超过 16 拍，支持小数拍。存在时优先于 `melody` |

界面选择文件的上限是 **100,000 字节（100 KB）**。若开发者直接给 `normalizeImportedSong` 传入 JSON 字符串，该函数另有 32,000 字符限制；页面先解析为对象，再做结构检查。只支持 4/4，不会从标题识别或转换其他拍号。

和弦可使用根音及升降号、主要三和弦 / 七和弦、部分扩展与斜杠低音，例如 `C`、`Dm7`、`G7`、`Cmaj7`、`Bm7b5`、`F#dim7`、`CmMaj7`、`C6/9`、`G7b9`、`G7alt`、`Cmaj7#11`、`G13b9`、`C/E`。准确支持集合见 `lib/music.ts` 的解析器；不支持的符号会报错，不会静默换成其他和弦。

下载目录曲目的 JSON 时应一并保留来源与许可说明。应用导入后的运行对象会标准化，不能把它当作完整的出版元数据归档工具。

## 6. 教学设计与课程展示

运行应用后打开 `/teaching-guide.html`，或在源码中查看 [教学设计指南](public/teaching-guide.html)。指南可切换三种语言、打印或另存 PDF，含 TPACK、ICAP、探究活动、角色体验、游戏反馈、AI 辅助边界、形成性评价和 APA 参考文献。

| 时间 | 活动 | 可观察的学习证据 |
| --- | --- | --- |
| 0–8 分钟 | 前测、听见不同角色 | 初始解释与 3 道概念题 |
| 8–23 分钟 | A/B 编制实验、配音比较 | 记录听见的差异，说明哪些变量改变 |
| 23–48 分钟 | 扮演乐手、轮流主奏、节拍挑战 | 节拍操作记录、留白与配合的解释 |
| 48–60 分钟 | 后测、同伴讨论、离场卡 | 修订后的解释、3 道后测与个人反思 |
| 可选另加 20 分钟 | 真实录音迁移 | 回放一段演奏，结合聆听解释选择与检测局限 |

目标包括辨认声部职责、解释贝斯与钢琴配音的关系、用具体听觉证据讨论留白。后测 2/3 等标准是设计目标，不是已经观测到的教学成效。点击控件本身不等于 ICAP 的共同建构；同伴必须比较并共同修订解释。

指南另附 30 分钟小组展示安排、5–10 分钟问答、5–6 人分工栏及评价指标。分工栏是浏览器内可编辑内容，刷新或切换指南语言不会保存，应及时打印。课堂形成性评价与大学课程的作业评分要求分别列明；真实实施前不要填写虚构的学生数据或成效。

课程对齐依据为用户提供的课程大纲、Group project guide、Sample1LessonPlan 与 grade descriptors；这些原文件不随公共仓库重新发布。

## 7. 构建、部署与认证

### 已有 Sites 网站

现有网站的访问范围仍为**拥有者私有**。GitHub 的 Public 设置只公开这个仓库；网站访问权限、部署账号、生产 Secret 都需要在各自平台单独配置。导出仓库中的 `.openai/hosting.json` 不含原站点身份，D1 / R2 绑定为空；复用到自己的 Sites 项目时需要自己的项目注册与运行配置。

### 在其他平台部署

该项目包含服务端 `POST /api/coach`，目前通过 `cloudflare:workers` 读取绑定，构建路径采用 Cloudflare Worker。**GitHub Pages 不能直接运行这个服务端路由**；单独上传静态文件也不会提供可用的 AI 教练。

迁移时需要先完成这些具体适配，再开放 AI 路由：

1. 为目标平台建立正式 Worker / 服务端运行配置，并验证 `pnpm build` 的产物与路由。
2. 设置生产 Secret `DEEPSEEK_API_KEY`，按需设置模型；Secret 不从 GitHub 源码自动获得。
3. 接入真实登录、会话或令牌验证。目前路由依赖 Sites 受信任边界提供的 `oai-authenticated-user-id`。迁移后的服务器必须在验证身份后从受信任上下文取得用户 ID，并剥离客户端伪造的同名头；也可改写路由直接使用已验证会话。
4. 确保外部请求不能绕过身份验证边界直达后端，再配置持久限流、调用额度、日志与 HTTPS。
5. 检查登录、同源请求、密钥错误、超时与缺少身份时的拒绝行为，再进行真实账户测试。

不能通过在浏览器硬编码用户 ID、要求访客自己提交认证头、或信任任意请求中的该头来替代认证。本仓库的本地模拟登录也不是公网身份服务。Cloudflare Secret 的平台配置方法见 [官方文档](https://developers.cloudflare.com/workers/vite-plugin/reference/secrets/)；本 README 不把尚未适配的平台宣称为一键部署成功。

## 8. 验证与常见问题

修改代码后运行：

```bash
pnpm test
pnpm typecheck
pnpm build
```

v3 源快照已通过 38 项自动测试、TypeScript 检查与生产构建。测试覆盖配音、角色交接、和弦边界、半拍变化、输入校验、音高 / 起音分析、曲库唯一性及来源保留等程序行为；这些检查不能证明真实课堂学习提升，也不能代替不同设备上的听觉与麦克风试用。新机器克隆后应重新运行上述检查。

| 问题 | 排查方法 |
| --- | --- |
| 没有声音 | 点击“开始合奏”；检查系统音量、浏览器标签静音与选中的输出设备。Web Audio 需要用户操作解锁 |
| `registerHooks` 不存在或不能导入 `.ts` | 检查实际运行的 `node --version`，切换到 Node 24 LTS，再重新执行测试 |
| `pnpm` 不存在或版本不符 | 安装 `pnpm@11.25.0` 并检查 PATH；保留锁文件，用 pnpm 安装 |
| 3000 端口被占用 | 改为 `pnpm dev --host 127.0.0.1 --port 3001`，浏览器及本地登录地址同步改端口 |
| AI 提示“请登录” | 本地 dev 环境先访问同源 `/signin-with-chatgpt?return_to=%2F`；生产环境检查可信认证配置。不要伪造请求头绕过 |
| AI 提示“暂未连接” | 检查项目根目录 `.dev.vars` 的密钥是否为空，重启 dev；生产环境检查 Worker Secret 绑定 |
| AI 凭据错误、额度不足或服务异常 | 核对服务端密钥、DeepSeek 余额与可用模型。前两类上游错误会转成 502；超时或连接异常可返回 503 |
| 提问过于频繁 | 等待响应提供的重试时间；本地节拍、曲目与反思活动可继续使用 |
| 无法使用麦克风 | 使用 HTTPS 或回环地址，检查站点及系统麦克风权限；授权后重新选择输入设备。也可导入短音频或使用无录音活动 |
| 音高跳动 / 和弦没有音符表 | 单音模式只适合较清晰单音；调整输入增益、减少噪声与踏板。复调请用节奏 / 和弦模式观察起音，不期待完整扒谱 |
| 导入曲目失败 | 核对 100 KB 文件上限、JSON 格式、4/4 小节数、和弦拼写及首个 chordEvents 的 beat 为 0 |
| 记录或录音丢失 | 学习记录依赖当前浏览器；录音只在内存中。使用导出按钮保存到自己的文件夹 |
| 克隆后没有原网站或班级数据 | 仓库只含源码和公开素材，不包含原站点身份、生产密钥、浏览器学习记录或录音 |

## 9. 代码导航

| 路径 | 作用 |
| --- | --- |
| `app/page.tsx` | 主界面、学习流程、挑战、导入与本地状态 |
| `app/api/coach/route.ts` | DeepSeek 服务端路由、身份检查与教学提示词 |
| `lib/music.ts` | 合成伴奏、和声解析、角色编配、按键材料、导入校验 |
| `components/MicrophoneLab.tsx` / `lib/audio-analysis.ts` | 本地录音界面与音高 / 起音分析 |
| `components/JazzStage.tsx` | 动漫舞台与乐手呈现 |
| `components/RepertoirePanel.tsx` | 曲库搜索、筛选、来源与聆听入口 |
| `lib/repertoire.ts` | 四首来源旋律与精选聆听主题 |
| `lib/standard-catalog.ts` / `lib/standard-catalog-data.ts` | 235 首来源和弦表、字段映射与归属信息 |
| `lib/standard-catalog-generate.py` | 从固定 ChoCo 来源重建数据 |
| `lib/learning.ts` / `lib/i18n.ts` | 教学任务、前后测与三语界面 |
| `public/teaching-guide.html` | 可打印的三语教学设计 |
| `public/REPERTOIRE-LICENSES.txt` | 逐曲出处、版本、改编与许可说明 |
| `vite.config.ts` / `build/` / `scripts/` | Sites、Vinext 与 Cloudflare 运行适配 |

扩展曲库时，应加入具体曲目的真实和声来源与归属，经过导入校验和曲库测试；不要用同一段生成伴奏套用不同标题来增加数量。重建现有 ChoCo 子集需将上游仓库检出到 `5fe168fd55be5c84512abcfbc4e6f1b1f8f0092a`，然后运行：

```bash
python3 lib/standard-catalog-generate.py /path/to/choco
pnpm test
```

脚本使用已固定的来源 ID，核验修订、拍号、时序与标题唯一性后重建数据，并非自动导入所有爵士作品。

## 10. 许可与致谢

本项目的原创应用代码按 [MIT License](LICENSE) 发布。依赖与随附第三方文件保留各自许可，见 [第三方说明](THIRD_PARTY_NOTICES.md)。**代码许可不覆盖所有曲目、歌词、演奏录音或他人的编曲权利。**

- **ChoCo 和弦标注数据**：采用上游声明的 **CC BY 4.0**；保留 de Berardinis、Meroño-Peñuela、Poltronieri、Presutti 与原始 iReal 社区标注者的归属。使用的是 iReal Pro 标注子集，未使用其排除于该许可的子集。数据许可不能被理解为所有底层作品已进入公有领域。[来源仓库](https://github.com/smashub/choco) · [固定版本许可](https://github.com/smashub/choco/blob/5fe168fd55be5c84512abcfbc4e6f1b1f8f0092a/LICENSE.md) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **四首 Freed Jazz 旋律**：依据来源对作品与其谱版在美国公有领域状态的声明制作教学改编。来源明确提示其他地区可能不同，这不是全球统一授权或“所有标准曲开源”的结论。[Freed Jazz](https://freedjazz.org/)
- **14 个大师录音入口**：仅链接外部发行或播放页面，不附带录音复制、下载或再分发权利。
- **Real Book**：仓库没有整本扫描、整套旋律、歌词或商业录音；自行导入必须有相应权限。

完整来源、SHA-256、固定修订与改编说明见 [曲目许可文件](public/REPERTOIRE-LICENSES.txt)。ChoCo 学术来源：de Berardinis, J., Meroño-Peñuela, A., Poltronieri, A., & Presutti, V. (2023). *ChoCo: A chord corpus and a data transformation workflow for musical harmony knowledge graphs*. Scientific Data, 10, 641. [https://doi.org/10.1038/s41597-023-02410-w](https://doi.org/10.1038/s41597-023-02410-w)。

教学框架原文与其余参考文献列于三语教学指南。v3 文档与曲库核验日期：**2026-10-12**。
