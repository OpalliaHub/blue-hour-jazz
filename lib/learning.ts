export type LearningQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const PRE_QUIZ: LearningQuestion[] = [
  {
    question: "钢琴、鼓和萨克斯正在合奏，没有贝斯。想让低音基础更清楚，钢琴可以怎么做？",
    options: ["只把高音旋律弹得更快", "适量加入低音，兼顾和声与节奏", "每个音都用最大音量"],
    answer: 1,
    explanation: "在这个小编制练习里，钢琴可以适量补充低音。并非每次都要填满低音区；先听整体，再决定弹多少。",
  },
  {
    question: "贝斯加入后，哪一种钢琴伴奏思路更合适？",
    options: ["考虑少弹低音，用去根音和弦给贝斯留空间", "绝对不能弹任何根音", "必须和贝斯始终弹同一条低音"],
    answer: 0,
    explanation: "去根音和弦省略和弦根音，是有贝斯支持时的一种常见选择，不是禁令。实际选择还取决于音区、风格、节奏和同伴。",
  },
  {
    question: "刚加入 jam，萨克斯正在说一个短句。你怎样回应更有音乐感？",
    options: ["从头到尾不停地弹", "完全不听别人，只看分数", "先听一句，再用简短声音回应，也允许停顿"],
    answer: 2,
    explanation: "合奏需要聆听、呼应与留白。少弹几个音也可以作出有效贡献；按得多并不等于合作得好。",
  },
];

export const POST_QUIZ: LearningQuestion[] = [
  {
    question: "把四重奏里的贝斯关闭后，钢琴想继续提供清楚的低音基础，哪项调整值得试听？",
    options: ["所有乐器都加倍弹奏", "保持同样的密度，只增加音量", "让钢琴适量补入低音，并听整体是否更清楚"],
    answer: 2,
    explanation: "保持练习和速度，比较两个编制。原型会同时调整贝斯声部与钢琴配音，示范角色适应，不能把整体差异只归因于去根音。真实乐队也可以保留更轻的音响。",
  },
  {
    question: "同学说：“有贝斯就一定不能弹含根音的和弦。”你会怎么解释？",
    options: ["正确，根音在所有风格里都被禁止", "去根音可以减少低音重叠，但仍要按具体声音决定", "错误，钢琴始终必须重复贝斯的每一个音"],
    answer: 1,
    explanation: "目标是协调音区和角色。去根音是一种编配方法，不是普遍规则。请用你刚才的 A/B 试听说明自己的选择。",
  },
  {
    question: "你负责伴奏，发现自己盖住了主旋律。下一轮最值得尝试什么？",
    options: ["减少密度、留出空拍，听主旋律后再回应", "连续按更多音来提高分数", "让所有乐器同步演奏完全相同的旋律"],
    answer: 0,
    explanation: "有目的的留白让同伴更容易被听见。时机反馈只帮助感受拍点；音乐表达还需要由你、同伴和老师一起判断。",
  },
];

export const TASKS = [
  { title: "01 · 找到乐队的地板", description: "选钢琴、鼓、萨克斯，先听一轮。预测：加入贝斯后，钢琴的低音会怎样变化？" },
  { title: "02 · 做一次 A/B 试听", description: "保持曲目和速度相同，比较无贝斯／有贝斯。钢琴会随编制自动调整；说出一处听到的差异。" },
  { title: "03 · 把你的声音放进去", description: "选一个乐手角色，用三个演奏垫加入。先听一句、弹一句，再主动留出空拍；不需要读谱。" },
  { title: "04 · 换位，听见别人", description: "换一种乐器或编制再演一轮。与同伴讨论：你减少了什么，又为谁留下了空间？" },
  { title: "05 · 带走一个新发现", description: "完成后测，写下“我改变了什么—听到了什么—下次会怎样做”，保存学习记录。" },
];

export const REFERENCES = [
  { label: "Mishra & Koehler (2006) · TPACK", url: "https://doi.org/10.1111/j.1467-9620.2006.00684.x" },
  { label: "Chi & Wylie (2014) · ICAP", url: "https://doi.org/10.1080/00461520.2014.965823" },
  { label: "Plass, Homer, & Kinzer (2015) · 游戏学习", url: "https://doi.org/10.1080/00461520.2015.1122533" },
  { label: "Berklee Online (2015) · 钢琴和弦配置", url: "https://online.berklee.edu/takenote/basic-piano-voicing-techniques/" },
];
