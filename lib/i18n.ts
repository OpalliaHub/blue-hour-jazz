export type Locale = 'zh-CN' | 'zh-TW' | 'en';
export function isLocale(value:unknown):value is Locale { return value==='zh-CN'||value==='zh-TW'||value==='en'; }
// Explicit, reviewed UI copy; learner-authored notes are never rewritten.
const phrases: Record<string, readonly [string,string]> = {
"chords 需要包含 1–256 小节的首和弦摘要。":["chords 需要包含 1–256 小節的首和弦摘要。", "chords must contain the first chord of each of 1–256 bars."],"chordEvents 需要包含 1–2048 个和弦变化。":["chordEvents 需要包含 1–2048 個和弦變化。", "chordEvents must contain 1–2048 chord changes."],"和弦变化需要有效的 beat（落在八分音符拍点）与 chord。":["和弦變化需要有效的 beat（落在八分音符拍點）與 chord。", "Each chord change needs a valid beat on an eighth-note division and a supported chord."],"和弦变化须从第 0 拍开始，且拍点不能重复。":["和弦變化須從第 0 拍開始，且拍點不能重複。", "Chord changes must start at beat 0 without duplicate beat positions."],"melody 可包含 1–1024 个 MIDI 音高（48–88），用 -1 表示休止。":["melody 可包含 1–1024 個 MIDI 音高（48–88），用 -1 表示休止。", "melody supports 1–1024 MIDI pitches (48–88); use -1 for a rest."],"授权和弦标注 · 自动示范非原曲旋律":["授權和弦標註 · 自動示範非原曲旋律", "Licensed changes · generated demo, not the original head"],
"真实演奏":["真實演奏", "Real performance"],"Record & reflect":["錄音與反思", "Record & reflect"],"让真实的乐器，加入你的学习。":["讓真實的樂器，加入你的學習。", "Bring your real instrument into the room."],"录下一句，观察音高与起音，再用耳朵判断。":["錄下一句，觀察音高與起音，再用耳朵判斷。", "Record a phrase, explore pitch and onsets, then judge by ear."],"当前编配":["目前編配", "Current arrangement"],"每个声部，都有自己的任务。":["每個聲部，都有自己的任務。", "Every part has a purpose."],"钢琴配音":["鋼琴配音", "Piano voicing"],"自动随编制":["自動隨編制", "Follow the band"],"含根音":["含根音", "Rooted"],"去根音":["去根音", "Rootless"],"伴奏":["伴奏", "Comping"],"旋律前景 · Solo":["旋律前景 · Solo", "Melodic foreground · Solo"],"和声回应 · Comping":["和聲回應 · Comping", "Harmonic response · Comping"],"低音根基 · Comping":["低音根基 · Comping", "Bass foundation · Comping"],"{instrument}演奏模式":["{instrument}演奏模式", "{instrument} performance mode"],"每次一位主奏。切换 Solo 后，其他声部减少密度；选择扮演角色后，由你的演奏垫接管该声部。":["每次一位主奏。切換 Solo 後，其他聲部減少密度；選擇扮演角色後，由你的演奏墊接管該聲部。", "One featured soloist at a time. Other parts leave space during a solo. Choose a role to take over that part with your pads."],"Rhythm Changes 实验室":["Rhythm Changes 實驗室", "Rhythm Changes Lab"],"原创练习 · 32 小节 AABA · 降 B 调":["原創練習 · 32 小節 AABA · 降 B 調", "Original study · 32-bar AABA · B-flat"],"选修迁移：把练习带到真实乐器":["選修遷移：把練習帶到真實樂器", "Optional transfer: play your real instrument"],"用同一速度录下 20 秒单音乐句，对照音高与起音图，再比较一次伴奏与 Solo。先写自己的听感，再参考分析。录音不计入按键挑战分数。":["用同一速度錄下 20 秒單音樂句，對照音高與起音圖，再比較一次伴奏與 Solo。先寫自己的聽感，再參考分析。錄音不計入按鍵挑戰分數。", "Record a 20-second single-note phrase at the same tempo. Compare pitch and onset displays, then compare comping and solo. Write what you hear before consulting the analysis. Recordings do not count toward pad-challenge scores."],"打开真实演奏":["開啟真實演奏", "Open real performance"],"真实演奏与角色编配 · v3.0":["真實演奏與角色編配 · v3.0", "Real performance & arrangements · v3.0"],"多音乐句会吸附到节拍，并向下一次和弦变化解决。每次按键只记一次实际触发，自动乐句音符不额外计分。":["多音樂句會吸附到節拍，並向下一次和弦變化解決。每次按鍵只記一次實際觸發，自動樂句音符不額外計分。", "Phrase pads align to the pulse and resolve toward the next chord change. Only the actual key press is scored; generated notes add no points."],"本地按键与自述记录；真实录音分析另行导出，不等于器乐能力评分。":["本地按鍵與自述紀錄；真實錄音分析另行匯出，不等於器樂能力評分。", "Local pad and reflection records; recording analysis is exported separately and is not an instrumental ability score."],"支持授权或自创的 JSON 和弦表。chords 按小节排列；可用 chordEvents 指定小节内变化（beat 从 0 开始，每小节 4 拍）。导入生成教学伴奏，不会还原原曲旋律。":["支援授權或自創的 JSON 和弦表。chords 按小節排列；可用 chordEvents 指定小節內變化（beat 從 0 開始，每小節 4 拍）。匯入產生教學伴奏，不會還原原曲旋律。", "Import your own or authorized JSON chart. chords lists one chord per bar; optional chordEvents specifies changes within bars (beat starts at 0, four beats per bar). Import generates accompaniment, not the original melody."],
  "标准曲 · {count} 小节教学版": [
    "標準曲 · {count} 小節教學版",
    "Standard · {count}-bar teaching arrangement"
  ],
  "张力与归途": [
    "張力與歸途",
    "Tension & Home"
  ],
  "原创练习 · 旋律小调与 altered": [
    "原創練習 · 旋律小調與 altered",
    "Original study · Melodic minor & altered"
  ],
  "入门": [
    "入門",
    "Beginner"
  ],
  "进阶": [
    "進階",
    "Intermediate"
  ],
  "3 个按键 · 先听四拍，再用少量声音回应。": [
    "3 個按鍵 · 先聽四拍，再用少量聲音回應。",
    "3 keys · Listen for four beats, then answer with a few sounds."
  ],
  "6 个按键 · 探索导向音、经过音与更丰富的和声。": [
    "6 個按鍵 · 探索導向音、經過音與更豐富的和聲。",
    "6 keys · Explore guide tones, passing tones and richer harmony."
  ],
  "8 个按键 · 练习音阶、半音趋近、包围与解决。先慢练，再提速。": [
    "8 個按鍵 · 練習音階、半音趨近、包圍與解決。先慢練，再提速。",
    "8 keys · Explore scales, chromatic approaches, enclosures and resolution. Start slowly."
  ],
  "选择一个角色，用键盘或触屏加入合奏。": [
    "選擇一個角色，用鍵盤或觸控螢幕加入合奏。",
    "Choose a role and join with your keyboard or touchscreen."
  ],
  "欢迎来到 Blue Hour。我是你的合奏教练。先听一轮，再把贝斯请下台：你觉得钢琴需要照顾哪一片音区？": [
    "歡迎來到 Blue Hour。我是你的合奏教練。先聽一輪，再把貝斯請下台：你覺得鋼琴需要照顧哪一片音區？",
    "Welcome to Blue Hour. I’m your ensemble coach. Listen once, then remove the bass: which register might the piano need to support?"
  ],
  "浏览器无法保存，离开前请导出学习记录。": [
    "瀏覽器無法儲存，離開前請導出學習記錄。",
    "Your browser could not save this. Export your learning record before leaving."
  ],
  "已切换练习难度。速度不会自动提高，请按自己的节奏探索。": [
    "已切換練習難度。速度不會自動提高，請按自己的節奏探索。",
    "Practice level changed. The tempo will not increase automatically; explore at your own pace."
  ],
  "声音未能启动，请检查浏览器音频权限后重试。": [
    "聲音未能啓動，請檢查瀏覽器音訊權限後重試。",
    "Audio could not start. Check your browser’s audio permissions and try again."
  ],
  "你现在扮演{instrument}。先听一拍，再用 {count} 个按键回应伙伴。": [
    "你現在扮演{instrument}。先聽一拍，再用 {count} 個按鍵回應夥伴。",
    "You are playing {instrument}. Listen to one beat, then respond with {count} keys."
  ],
  "聆听模式：所有在场乐手自动演奏。": [
    "聆聽模式：所有在場樂手自動演奏。",
    "Listening mode: every musician on stage plays automatically."
  ],
  "B 编制：贝斯承担低音，钢琴示范中音区去根音配音。": [
    "B 編制：貝斯承擔低音，鋼琴示範中音區去根音配音。",
    "Band B: the bass supports the low register; the piano demonstrates rootless mid-register voicings."
  ],
  "A 编制：没有贝斯，钢琴增加低音支撑。点击播放，比较同一首练习。": [
    "A 編制：沒有貝斯，鋼琴增加低音支撐。點擊播放，比較同一首練習。",
    "Band A: without a bassist, the piano adds low-register support. Press play and compare the same exercise."
  ],
  "先在下方选择你想扮演的乐手。": [
    "先在下方選擇你想扮演的樂手。",
    "First choose the musician you want to play below."
  ],
  "8 小节挑战：每拍最多计一次命中，先稳定，再尝试留白。": [
    "8 小節挑戰：每拍最多計一次命中，先穩定，再嘗試留白。",
    "8-bar challenge: each beat can count once. Find a steady pulse, then explore leaving space."
  ],
  "完成！32 拍中有 {count} 拍合拍。下一轮试着听着伙伴留出空间。": [
    "完成！32 拍中有 {count} 拍合拍。下一輪試著聽著夥伴留出空間。",
    "Finished! {count} of 32 beats were in the timing window. Next time, listen and leave room for your partners."
  ],
  "完成！32 拍中有 {count} 拍合拍。放慢速度，先感受四拍脉搏。": [
    "完成！32 拍中有 {count} 拍合拍。放慢速度，先感受四拍脈搏。",
    "Finished! {count} of 32 beats were in the timing window. Slow down and feel the four-beat pulse first."
  ],
  "先选择角色并点击「开始合奏」，再使用下方按键。": [
    "先選擇角色並點擊「開始合奏」，再使用下方按鍵。",
    "Choose a role and press “Start session”, then use the keys below."
  ],
  "合拍 · 这一下和乐队的脉搏在一起。": [
    "合拍 · 這一下和樂隊的脈搏在一起。",
    "On the beat · Your sound meets the band’s pulse."
  ],
  "偏早 {ms} ms · 听下一拍，再轻轻加入。": [
    "偏早 {ms} ms · 聽下一拍，再輕輕加入。",
    "{ms} ms early · Listen for the next beat and join gently."
  ],
  "偏晚 {ms} ms · 听下一拍，再轻轻加入。": [
    "偏晚 {ms} ms · 聽下一拍，再輕輕加入。",
    "{ms} ms late · Listen for the next beat and join gently."
  ],
  "本地练习与自述记录，不代表真实器乐能力；无自动听音评价。": [
    "本地練習與自述記錄，不代表真實器樂能力；無自動聽音評價。",
    "Local practice and self-reports do not establish instrumental proficiency; no automatic audio assessment is provided."
  ],
  "暂时无法连接": [
    "暫時無法連接",
    "Unable to connect right now"
  ],
  "AI 暂时离线": [
    "AI 暫時離線",
    "AI is temporarily offline"
  ],
  "离线练习：保持曲目和速度相同，比较 A / B 编制。低音由谁承担？用一句话解释听到的变化。": [
    "離線練習：保持曲目和速度相同，比較 A / B 編制。低音由誰承擔？用一句話解釋聽到的變化。",
    "Offline exercise: keep the tune and tempo fixed and compare bands A and B. Who supports the bass register? Describe the change in one sentence."
  ],
  "已放慢 12 BPM，请再试一轮。": [
    "已放慢 12 BPM，請再試一輪。",
    "Slowed by 12 BPM. Try another round."
  ],
  "请先确认你有权使用此素材。": [
    "請先確認你有權使用此素材。",
    "Please confirm that you have the right to use this material."
  ],
  "曲目已导入当前会话。请保留原始 JSON 以便下次使用。": [
    "曲目已導入當前會話。請保留原始 JSON 以便下次使用。",
    "Tune imported for this session. Keep the original JSON file to use it again later."
  ],
  "JSON 格式无效，请检查括号、引号和逗号。": [
    "JSON 格式無效，請檢查括號、引號和逗號。",
    "Invalid JSON. Check brackets, quotation marks and commas."
  ],
  "导入失败": [
    "導入失敗",
    "Import failed"
  ],
  "Blue Hour 首页": [
    "Blue Hour 首頁",
    "Blue Hour home"
  ],
  "你的爵士旅程": [
    "你的爵士旅程",
    "YOUR JAZZ JOURNEY"
  ],
  "合奏实验室": [
    "合奏實驗室",
    "Jam studio"
  ],
  "学习路线": [
    "學習路線",
    "Learning path"
  ],
  "曲库与大师": [
    "曲庫與大師",
    "Repertoire & listening"
  ],
  "我的演奏手记": [
    "我的演奏手記",
    "My session notes"
  ],
  "今晚的歌单": [
    "今晚的歌單",
    "TONIGHT’S SETLIST"
  ],
  "导入我的曲目": [
    "導入我的曲目",
    "Import my tune"
  ],
  "你的学习进度": [
    "你的學習進度",
    "Your learning progress"
  ],
  "从第一拍，走进爵士。": [
    "從第一拍，走進爵士。",
    "Step into jazz, one beat at a time."
  ],
  "教师指南与设计依据": [
    "教師指南與設計依據",
    "Teacher guide & design rationale"
  ],
  "展开导航": [
    "展開導航",
    "Open navigation"
  ],
  "THE CLUB": [
    "爵士俱樂部",
    "THE CLUB"
  ],
  "演奏手记": [
    "演奏手記",
    "Session notes"
  ],
  "界面语言": [
    "界面語言",
    "Interface language"
  ],
  "初学者友好": [
    "初學者友好",
    "Beginner friendly"
  ],
  "合奏教练": [
    "合奏教練",
    "Ensemble coach"
  ],
  "LISTEN. PLAY. BELONG.": [
    "聆聽 · 演奏 · 彼此共鳴",
    "LISTEN. PLAY. BELONG."
  ],
  "听见彼此，找到你的声部。": [
    "聽見彼此，找到你的聲部。",
    "Hear each other. Find your part."
  ],
  "每一次合奏，都是一次发现。": [
    "每一次合奏，都是一次發現。",
    "Every session, a new discovery."
  ],
  "从标准曲出发，听见爵士的来路。": [
    "從標準曲出發，聽見爵士的來路。",
    "Follow the tunes. Hear the history."
  ],
  "把听到的，变成自己的理解。": [
    "把聽到的，變成自己的理解。",
    "Make what you hear your own."
  ],
  "不必读懂乐谱。选一个角色，让你的第一拍和乐队相遇。": [
    "不必讀懂樂譜。選一個角色，讓你的第一拍和樂隊相遇。",
    "No score reading needed. Pick a role and let your first beat meet the band."
  ],
  "60 分钟，从聆听到共同创造。按自己的节奏，完成四站探索。": [
    "60 分鐘，從聆聽到共同創造。按自己的節奏，完成四站探索。",
    "60 minutes, from listening to creating together. Explore four stops at your own pace."
  ],
  "把标准曲、历史人物与耳朵里的声音连接起来。": [
    "把標準曲、歷史人物與耳朵里的聲音連接起來。",
    "Connect jazz standards, influential musicians and the sounds you hear."
  ],
  "练习记录保存在此浏览器中。导出后可作为课堂讨论与反思的素材。": [
    "練習記錄儲存在此瀏覽器中。導出後可作為課堂討論與反思的素材。",
    "Practice records stay in this browser. Export them for classroom discussion and reflection."
  ],
  "VOL. 01": [
    "第一輯",
    "VOL. 01"
  ],
  "THE FIRST JAM": [
    "初次合奏",
    "THE FIRST JAM"
  ],
  "关闭提示": [
    "關閉提示",
    "Dismiss notification"
  ],
  "爵士合奏舞台": [
    "爵士合奏舞台",
    "Jazz ensemble stage"
  ],
  "选择场景": [
    "選擇場景",
    "Choose a scene"
  ],
  "暂停合奏": [
    "暫停合奏",
    "Pause session"
  ],
  "开始合奏": [
    "開始合奏",
    "Start session"
  ],
  "自有／授权素材": [
    "自有／授權素材",
    "Your own / licensed material"
  ],
  "标准曲 · 教学版": [
    "標準曲 · 教學版",
    "Standard · teaching arrangement"
  ],
  "原创教学练习": [
    "原創教學練習",
    "Original teaching study"
  ],
  "{count} 小节": [
    "{count} 小節",
    "{count} bars"
  ],
  "第 {bar} 小节，第 {beat} 拍": [
    "第 {bar} 小節，第 {beat} 拍",
    "Bar {bar}, beat {beat}"
  ],
  "音量": [
    "音量",
    "Volume"
  ],
  "速度": [
    "速度",
    "Tempo"
  ],
  "减慢速度": [
    "減慢速度",
    "Slow down"
  ],
  "加快速度": [
    "加快速度",
    "Speed up"
  ],
  "摇摆感": [
    "搖擺感",
    "Swing"
  ],
  "摇摆比例": [
    "搖擺比例",
    "Swing ratio"
  ],
  "四拍一小节 · 点击乐手也可加入": [
    "四拍一小節 · 點擊樂手也可加入",
    "Four beats per bar · Click a musician to join"
  ],
  "练习难度": [
    "練習難度",
    "Practice level"
  ],
  "选择你的探索深度": [
    "選擇你的探索深度",
    "Choose how deeply to explore"
  ],
  "改变材料，不替你加速": [
    "改變材料，不替你加速",
    "New material. Your own tempo."
  ],
  "个演奏垫": [
    "個演奏墊",
    "pads"
  ],
  "今晚，和谁一起演奏？": [
    "今晚，和誰一起演奏？",
    "Who’s playing with you tonight?"
  ],
  "切换编制，听见分工的变化": [
    "切換編制，聽見分工的變化",
    "Change the lineup. Hear the roles change."
  ],
  "让{instrument}离场": [
    "讓{instrument}離場",
    "Remove {instrument}"
  ],
  "让{instrument}加入": [
    "讓{instrument}加入",
    "Add {instrument}"
  ],
  "和声色彩 · 中音配音": [
    "和聲色彩 · 中音配音",
    "Harmony · mid-register voicings"
  ],
  "和声 + 低音支撑": [
    "和聲 + 低音支撐",
    "Harmony + bass support"
  ],
  "低音线 · 和声根基": [
    "低音線 · 和聲根基",
    "Bass line · harmonic foundation"
  ],
  "律动 · 摇摆脉搏": [
    "律動 · 搖擺脈搏",
    "Groove · swing pulse"
  ],
  "旋律 · 呼吸留白": [
    "旋律 · 呼吸留白",
    "Melody · breath and space"
  ],
  "和声 · 节奏回应": [
    "和聲 · 節奏回應",
    "Harmony · rhythmic response"
  ],
  "你正在演奏": [
    "你正在演奏",
    "You’re playing"
  ],
  "扮演此角色": [
    "扮演此角色",
    "Play this role"
  ],
  "一个小实验：贝斯离场之后呢？": [
    "一個小實驗：貝斯離場之後呢？",
    "A small experiment: what if the bassist leaves?"
  ],
  "保持同一曲目和速度，比较钢琴的低音与和弦。": [
    "保持同一曲目和速度，比較鋼琴的低音與和弦。",
    "Keep the tune and tempo fixed. Compare the piano’s bass notes and chords."
  ],
  "记录发现": [
    "記錄發現",
    "Record your discovery"
  ],
  "A 无贝斯": [
    "A 無貝斯",
    "A · No bass"
  ],
  "B 有贝斯": [
    "B 有貝斯",
    "B · With bass"
  ],
  "轮到你了：{instrument}。": [
    "輪到你了：{instrument}。",
    "Your turn: {instrument}."
  ],
  "把一个声部，留给自己。": [
    "把一個聲部，留給自己。",
    "Save one part for yourself."
  ],
  "只听乐队": [
    "只聽樂隊",
    "Just listen"
  ],
  "选择上方的乐手角色，乐队会把这个声部交给你。按键材料随当前和声与难度变化。": [
    "選擇上方的樂手角色，樂隊會把這個聲部交給你。按鍵材料隨當前和聲與難度變化。",
    "Choose a musician above and the band will hand that part to you. The keys adapt to the current harmony and practice level."
  ],
  "和弦进行": [
    "和弦進行",
    "Chord progression"
  ],
  "选择一个角色": [
    "選擇一個角色",
    "Choose a role"
  ],
  "先听四拍": [
    "先聽四拍",
    "Listen to four beats"
  ],
  "轻轻加入": [
    "輕輕加入",
    "Join gently"
  ],
  "刚才的声音": [
    "剛才的聲音",
    "Sound in focus"
  ],
  "音阶 / 音高材料": [
    "音階 / 音高材料",
    "Scale / pitch material"
  ],
  "8 小节节拍挑战": [
    "8 小節節拍挑戰",
    "8-bar timing challenge"
  ],
  "第 {beat} / 32 拍 · {hits} 次合拍": [
    "第 {beat} / 32 拍 · {hits} 次合拍",
    "Beat {beat} / 32 · {hits} on time"
  ],
  "以 ±120 ms 为入门节拍窗口；可降速、重试，不扣分。": [
    "以 ±120 ms 為入門節拍窗口；可降速、重試，不扣分。",
    "Beginner timing window: ±120 ms. Slow down and retry; no penalties."
  ],
  "结束练习": [
    "結束練習",
    "End practice"
  ],
  "开始挑战": [
    "開始挑戰",
    "Start challenge"
  ],
  "挑战只评价实际按键触发时机（±120 ms），受设备延迟影响，不评价进阶乐句正确性、音色、创造力或真实器乐能力。合成音色用于教学示范。": [
    "挑戰只評價實際按鍵觸發時機（±120 ms），受設備延遲影響，不評價進階樂句正確性、音色、創造力或真實器樂能力。合成音色用於教學示範。",
    "The challenge scores only actual key-trigger timing (±120 ms), subject to device latency. It does not assess advanced phrase correctness, tone, creativity or instrumental proficiency. Synthesized sounds are teaching demonstrations."
  ],
  "60 MIN / BEGINNER": [
    "60 分鐘 / 入門路線",
    "60 MIN / BEGINNER"
  ],
  "今天的目标：知道何时发声，也知道如何留白。": [
    "今天的目標：知道何時發聲，也知道如何留白。",
    "Today’s goal: know when to play, and when to leave space."
  ],
  "听辨旋律、和声、低音和节奏的分工；用一次 A/B 实验解释编制变化；完成节拍练习，并与同伴修订你的解释。": [
    "聽辨旋律、和聲、低音和節奏的分工；用一次 A/B 實驗解釋編制變化；完成節拍練習，並與同伴修訂你的解釋。",
    "Identify melody, harmony, bass and rhythm roles; explain lineup changes with an A/B experiment; practise timing and revise your explanation with a partner."
  ],
  "起点 · 8 分钟": [
    "起點 · 8 分鐘",
    "Starting point · 8 min"
  ],
  "先说说，你现在的理解。": [
    "先說說，你現在的理解。",
    "What do you understand so far?"
  ],
  "先完成小测，再进入实验。这里没有成绩压力，答案用于比较自己的变化。": [
    "先完成小測，再進入實驗。這裡沒有成績壓力，答案用於比較自己的變化。",
    "Take the short quiz before exploring. There is no grade pressure; use your answers to notice changes in understanding."
  ],
  "听辨与预测 · 15 分钟": [
    "聽辨與預測 · 15 分鐘",
    "Listening & prediction · 15 min"
  ],
  "少一个乐手，音乐会怎样？": [
    "少一個樂手，音樂會怎樣？",
    "One musician leaves. What changes?"
  ],
  "先预测，播放 A 无贝斯，再播放 B 有贝斯。至少各听一个循环，只改变编制。注意钢琴低音、和弦位置及留给伙伴的空间。": [
    "先預測，播放 A 無貝斯，再播放 B 有貝斯。至少各聽一個循環，只改變編制。注意鋼琴低音、和弦位置及留給夥伴的空間。",
    "Predict first, then play A without bass and B with bass. Listen to at least one full loop of each, changing only the lineup. Notice the piano’s low notes, voicing register and space for others."
  ],
  "去听 A 编制": [
    "去聽 A 編制",
    "Listen to band A"
  ],
  "去听 B 编制": [
    "去聽 B 編制",
    "Listen to band B"
  ],
  "我的预测与听辨证据": [
    "我的預測與聽辨證據",
    "My prediction & listening evidence"
  ],
  "我原先预测……A 中我听见……B 中变化是……所以我认为……": [
    "我原先預測……A 中我聽見……B 中變化是……所以我認為……",
    "I predicted… In A, I heard… In B, this changed… So I think…"
  ],
  "本游戏中贝斯与钢琴配音自动联动，A/B 比较整体编配，不能单独归因于一个因素。有贝斯也不代表钢琴绝不能弹根音。": [
    "本遊戲中貝斯與鋼琴配音自動聯動，A/B 比較整體編配，不能單獨歸因於一個因素。有貝斯也不代表鋼琴絕不能彈根音。",
    "Here, the bass part and piano voicings change together. A/B compares the overall arrangement, so differences cannot be attributed to a single factor. A bassist does not mean the piano must never play roots."
  ],
  "扮演与协作 · 25 分钟": [
    "扮演與協作 · 25 分鐘",
    "Role play & collaboration · 25 min"
  ],
  "做乐手，也做彼此的聆听者。": [
    "做樂手，也做彼此的聆聽者。",
    "Be a musician—and a listener for someone else."
  ],
  "选择一个角色，慢速练习后完成 8 小节挑战。两人轮流操作和观察，然后交换角色。共同决定一处留白或编制调整，重听并修订解释。": [
    "選擇一個角色，慢速練習後完成 8 小節挑戰。兩人輪流操作和觀察，然後交換角色。共同決定一處留白或編制調整，重聽並修訂解釋。",
    "Choose a role, practise slowly and finish an 8-bar challenge. In pairs, take turns playing and observing, then swap roles. Agree on a rest or lineup change, listen again and revise your explanation."
  ],
  "进入合奏": [
    "進入合奏",
    "Join the session"
  ],
  "同伴反馈与共同修订": [
    "同伴回饋與共同修訂",
    "Peer feedback & shared revision"
  ],
  "同伴提出……我们比较后把原来的解释改为……依据是……": [
    "同伴提出……我們比較後把原來的解釋改為……依據是……",
    "My partner suggested… After comparing, we changed our explanation to… Our evidence was…"
  ],
  "这是同设备轮流合作活动；网站当前不支持多人在线同步合奏。": [
    "這是同設備輪流合作活動；網站當前不支持多人在線同步合奏。",
    "This is turn-taking collaboration on one device. The site currently does not support synchronized online multiplayer sessions."
  ],
  "迁移与反思 · 12 分钟": [
    "遷移與反思 · 12 分鐘",
    "Transfer & reflection · 12 min"
  ],
  "把发现带到下一次 jam。": [
    "把發現帶到下一次 jam。",
    "Take your discovery to your next jam."
  ],
  "我的退出卡": [
    "我的退出卡",
    "My exit ticket"
  ],
  "我对合奏分工的理解改变了什么？如果萨克斯离场，我会如何调整？下一次我想改进……": [
    "我對合奏分工的理解改變了什麼？如果色士風離場，我會如何調整？下一次我想改進……",
    "How has my understanding of ensemble roles changed? What would I change if the saxophone left? Next time I want to improve…"
  ],
  "导出学习证据": [
    "導出學習證據",
    "Export learning evidence"
  ],
  "设计背后的依据": [
    "設計背後的依據",
    "The thinking behind the design"
  ],
  "TPACK 连接音乐内容、教学方法与技术；ICAP 用于区分聆听、操作、解释和共同修订。游戏提供练习情境与反馈，不把点击量当作学习成效。": [
    "TPACK 連接音樂內容、教學方法與技術；ICAP 用於區分聆聽、操作、解釋和共同修訂。遊戲提供練習情境與回饋，不把點擊量當作學習成效。",
    "TPACK connects music content, teaching approaches and technology. ICAP distinguishes listening, manipulating, explaining and jointly revising. The game supplies practice and feedback; click counts are not learning outcomes."
  ],
  "完整教学设计、评价量规与小组展示指南": [
    "完整教學設計、評價量規與小組展示指南",
    "Full teaching design, assessment rubric & group presentation guide"
  ],
  "YOUR SESSION BOOK": [
    "你的演奏手記",
    "YOUR SESSION BOOK"
  ],
  "已经和乐队完成 {count} 次练习。": [
    "已經和樂隊完成 {count} 次練習。",
    "You’ve completed {count} sessions with the band."
  ],
  "你的第一场 jam，正等着开始。": [
    "你的第一場 jam，正等著開始。",
    "Your first jam is waiting to begin."
  ],
  "每一次认真聆听，都值得留下记录。": [
    "每一次認真聆聽，都值得留下記錄。",
    "Every moment of careful listening is worth recording."
  ],
  "导出记录": [
    "導出記錄",
    "Export records"
  ],
  "前测 · 初始理解": [
    "前測 · 初始理解",
    "Pre-quiz · starting understanding"
  ],
  "后测 · 当前理解": [
    "後測 · 當前理解",
    "Post-quiz · current understanding"
  ],
  "尚未完成": [
    "尚未完成",
    "Not completed"
  ],
  "不同题目的同构概念测验，仅供课堂讨论。单次差异不能证明教学效果。": [
    "不同題目的同構概念測驗，僅供課堂討論。單次差異不能證明教學效果。",
    "Parallel concept questions support classroom discussion. One pre/post difference cannot establish instructional effectiveness."
  ],
  "练习足迹": [
    "練習足跡",
    "Practice history"
  ],
  "选择一个角色，完成 8 小节挑战，记录就会出现在这里。": [
    "選擇一個角色，完成 8 小節挑戰，記錄就會出現在這裡。",
    "Choose a role and complete an 8-bar challenge. Your record will appear here."
  ],
  "开始第一场合奏": [
    "開始第一場合奏",
    "Start your first session"
  ],
  "BPM ·": [
    "BPM ·",
    "BPM ·"
  ],
  "练习": [
    "練習",
    "Practice"
  ],
  "/ 32 拍合拍": [
    "/ 32 拍合拍",
    "/ 32 beats on time"
  ],
  "{count} 次按键": [
    "{count} 次按鍵",
    "{count} key presses"
  ],
  "我的听辨与反思": [
    "我的聽辨與反思",
    "My listening & reflection"
  ],
  "A / B 编制听辨": [
    "A / B 編制聽辨",
    "A/B lineup listening"
  ],
  "同伴反馈": [
    "同伴回饋",
    "Peer feedback"
  ],
  "退出卡": [
    "退出卡",
    "Exit ticket"
  ],
  "学习记录仅保存在当前浏览器。只有点击 AI 发送时，问题、最近对话、当前编制和听辨记录才会发送给 DeepSeek。": [
    "學習記錄僅儲存在當前瀏覽器。只有點擊 AI 發送時，問題、最近對話、當前編制和聽辨記錄才會發送給 DeepSeek。",
    "Learning records stay in this browser. When you send an AI question, your question, recent conversation, current lineup and listening notes are sent to DeepSeek."
  ],
  "清空此浏览器的全部学习记录？此操作无法撤销。": [
    "清空此瀏覽器的全部學習記錄？此操作無法撤銷。",
    "Clear all learning records in this browser? This cannot be undone."
  ],
  "本地学习记录已清空。": [
    "本地學習記錄已清空。",
    "Local learning records cleared."
  ],
  "清空本地记录": [
    "清空本地記錄",
    "Clear local records"
  ],
  "BLUE HOUR · 每个声部，都有被听见的位置。": [
    "BLUE HOUR · 每個聲部，都有被聽見的位置。",
    "BLUE HOUR · Every part deserves to be heard."
  ],
  "三语合奏与标准曲 · v2.0": [
    "三語合奏與標準曲 · v2.0",
    "Three-language sessions & standards · v2.0"
  ],
  "你的合奏教练": [
    "你的合奏教練",
    "Your ensemble coach"
  ],
  "edushoegazers · AI 辅助": [
    "edushoegazers · AI 輔助",
    "edushoegazers · AI assisted"
  ],
  "连接在发送时验证": [
    "連接在發送時驗證",
    "Connection is checked when you send"
  ],
  "正在探索": [
    "正在探索",
    "EXPLORING NOW"
  ],
  "{instrument}的合奏角色": [
    "{instrument}的合奏角色",
    "The {instrument} role"
  ],
  "乐器之间的对话": [
    "樂器之間的對話",
    "A conversation between instruments"
  ],
  "钢琴休息中 · 观察其余乐手分工": [
    "鋼琴休息中 · 觀察其餘樂手分工",
    "Piano resting · Observe the other musicians’ roles"
  ],
  "你在控制钢琴 · 选择如何回应伙伴": [
    "你在控制鋼琴 · 選擇如何回應夥伴",
    "You control the piano · Choose how to respond"
  ],
  "贝斯在场 · 钢琴示范去根音配音": [
    "貝斯在場 · 鋼琴示範去根音配音",
    "Bass present · Piano demonstrates rootless voicings"
  ],
  "贝斯缺席 · 钢琴示范补充低音": [
    "貝斯缺席 · 鋼琴示範補充低音",
    "No bass · Piano demonstrates low-register support"
  ],
  "你": [
    "你",
    "You"
  ],
  "练习提示 · 本地": [
    "練習提示 · 本地",
    "Practice prompt · local"
  ],
  "合奏教练 · DeepSeek": [
    "合奏教練 · DeepSeek",
    "Ensemble coach · DeepSeek"
  ],
  "试试这个建议": [
    "試試這個建議",
    "Try this suggestion"
  ],
  "教练正在思考": [
    "教練正在思考",
    "Your coach is thinking"
  ],
  "为什么贝斯加入后钢琴可以用去根音配音？": [
    "為什麼貝斯加入後鋼琴可以用去根音配音？",
    "Why can the piano use rootless voicings when a bassist joins?"
  ],
  "为什么要给低音留空间？": [
    "為什麼要給低音留空間？",
    "Why leave room for the bass?"
  ],
  "根据当前编制，给我一个适合初学者的小实验。": [
    "根據當前編制，給我一個適合初學者的小實驗。",
    "Give me a beginner-friendly experiment for the current lineup."
  ],
  "给我一个小实验": [
    "給我一個小實驗",
    "Give me a small experiment"
  ],
  "向教练提问": [
    "向教練提問",
    "Ask the coach"
  ],
  "聊聊你刚才听到了什么…": [
    "聊聊你剛才聽到了什麼…",
    "What did you just hear?"
  ],
  "发送给 AI 教练": [
    "發送給 AI 教練",
    "Send to the AI coach"
  ],
  "发送将使用 DeepSeek。教练读取游戏状态与文字，不听取音频。AI 建议需要你判断。": [
    "發送將使用 DeepSeek。教練讀取遊戲狀態與文字，不聽取音訊。AI 建議需要你判斷。",
    "Sending uses DeepSeek. The coach reads game state and text, not audio. Judge AI suggestions for yourself."
  ],
  "“先听见别人，再找到自己。”": [
    "“先聽見別人，再找到自己。”",
    "“First hear the others. Then find your place.”"
  ],
  "今晚的 jam 提醒": [
    "今晚的 jam 提醒",
    "Tonight’s jam reminder"
  ],
  "关闭导入": [
    "關閉導入",
    "Close import"
  ],
  "YOUR REPERTOIRE": [
    "你的曲目",
    "YOUR REPERTOIRE"
  ],
  "带上你的曲目来 jam。": [
    "帶上你的曲目來 jam。",
    "Bring your own tune to the jam."
  ],
  "支持授权或自创的 JSON 和弦表，每个和弦对应一小节。导入生成教学伴奏，不会自动还原原曲旋律。Real Book 全库未包含。": [
    "支持授權或自創的 JSON 和弦表，每個和弦對應一小節。導入生成教學伴奏，不會自動還原原曲旋律。Real Book 全庫未包含。",
    "Import licensed or original JSON chord charts, with one chord per bar. This generates a teaching accompaniment, not the original melody. The complete Real Book library is not included."
  ],
  "选择 JSON 文件": [
    "選擇 JSON 檔案",
    "Choose a JSON file"
  ],
  "我的合奏练习": [
    "我的合奏練習",
    "My ensemble study"
  ],
  "授权 / 自创曲目": [
    "授權 / 自創曲目",
    "Licensed / original tune"
  ],
  "下载模板": [
    "下載模板",
    "Download template"
  ],
  "文件应小于100KB": [
    "檔案應小於100KB",
    "File must be smaller than 100 KB"
  ],
  "曲目 JSON": [
    "曲目 JSON",
    "Tune JSON"
  ],
  "{\"title\":\"我的练习\",\"key\":\"C\",\"bpm\":88,\"chords\":[\"Dm7\",\"G7\",\"Cmaj7\",\"Cmaj7\"]}": [
    "{\"title\":\"我的練習\",\"key\":\"C\",\"bpm\":88,\"chords\":[\"Dm7\",\"G7\",\"Cmaj7\",\"Cmaj7\"]}",
    "{\"title\":\"My study\",\"key\":\"C\",\"bpm\":88,\"chords\":[\"Dm7\",\"G7\",\"Cmaj7\",\"Cmaj7\"]}"
  ],
  "我确认这是自创、获授权或可合法使用的素材。": [
    "我確認這是自創、獲授權或可合法使用的素材。",
    "I confirm this material is original, licensed or otherwise lawful to use."
  ],
  "导入并排练": [
    "導入並排練",
    "Import & rehearse"
  ],
  "已记录 · {score} / {count}。把解释带回下一轮聆听。": [
    "已記錄 · {score} / {count}。把解釋帶回下一輪聆聽。",
    "Recorded · {score} / {count}. Bring your explanation to the next listening round."
  ],
  "记录我的理解": [
    "記錄我的理解",
    "Record my understanding"
  ],
  "钢琴": [
    "鋼琴",
    "Piano"
  ],
  "低音提琴": [
    "低音大提琴",
    "Double bass"
  ],
  "爵士鼓": [
    "爵士鼓",
    "Drums"
  ],
  "萨克斯": [
    "色士風",
    "Saxophone"
  ],
  "吉他": [
    "吉他",
    "Guitar"
  ],
  "午夜俱乐部": [
    "午夜俱樂部",
    "Midnight club"
  ],
  "天台暮色": [
    "天台暮色",
    "Rooftop twilight"
  ],
  "排练工作室": [
    "排練工作室",
    "Rehearsal studio"
  ],
  "钢琴、鼓和萨克斯正在合奏，没有贝斯。想让低音基础更清楚，钢琴可以怎么做？": [
    "鋼琴、鼓和色士風正在合奏，沒有貝斯。想讓低音基礎更清楚，鋼琴可以怎麼做？",
    "Piano, drums and saxophone are playing without a bassist. What could the piano do to make the bass foundation clearer?"
  ],
  "只把高音旋律弹得更快": [
    "只把高音旋律彈得更快",
    "Play only the high melody, faster"
  ],
  "适量加入低音，兼顾和声与节奏": [
    "適量加入低音，兼顧和聲與節奏",
    "Add some low notes while considering harmony and rhythm"
  ],
  "每个音都用最大音量": [
    "每個音都用最大音量",
    "Play every note as loudly as possible"
  ],
  "在这个小编制练习里，钢琴可以适量补充低音。并非每次都要填满低音区；先听整体，再决定弹多少。": [
    "在這個小編制練習里，鋼琴可以適量補充低音。並非每次都要填滿低音區；先聽整體，再決定彈多少。",
    "In this small-group exercise, the piano can add some bass support. It does not need to fill the low register constantly; listen to the whole band before choosing how much to play."
  ],
  "贝斯加入后，哪一种钢琴伴奏思路更合适？": [
    "貝斯加入後，哪一種鋼琴伴奏思路更合適？",
    "After a bassist joins, which piano accompaniment approach makes sense?"
  ],
  "考虑少弹低音，用去根音和弦给贝斯留空间": [
    "考慮少彈低音，用去根音和弦給貝斯留空間",
    "Consider fewer low notes and rootless chords to leave the bass space"
  ],
  "绝对不能弹任何根音": [
    "絕對不能彈任何根音",
    "Never play any root notes"
  ],
  "必须和贝斯始终弹同一条低音": [
    "必須和貝斯始終彈同一條低音",
    "Always duplicate the bassist’s entire line"
  ],
  "去根音和弦省略和弦根音，是有贝斯支持时的一种常见选择，不是禁令。实际选择还取决于音区、风格、节奏和同伴。": [
    "去根音和弦省略和弦根音，是有貝斯支持時的一種常見選擇，不是禁令。實際選擇還取決於音區、風格、節奏和同伴。",
    "Rootless chords omit the chord’s root. They are a common option with bass support, not a prohibition. Register, style, rhythm and partners still shape the choice."
  ],
  "刚加入 jam，萨克斯正在说一个短句。你怎样回应更有音乐感？": [
    "剛加入 jam，色士風正在說一個短句。你怎樣回應更有音樂感？",
    "You just joined a jam and the saxophone plays a short phrase. How could you respond musically?"
  ],
  "从头到尾不停地弹": [
    "從頭到尾不停地彈",
    "Play without stopping from beginning to end"
  ],
  "完全不听别人，只看分数": [
    "完全不聽別人，只看分數",
    "Ignore everyone else and watch only the score"
  ],
  "先听一句，再用简短声音回应，也允许停顿": [
    "先聽一句，再用簡短聲音回應，也允許停頓",
    "Listen to a phrase, answer briefly and allow pauses"
  ],
  "合奏需要聆听、呼应与留白。少弹几个音也可以作出有效贡献；按得多并不等于合作得好。": [
    "合奏需要聆聽、呼應與留白。少彈幾個音也可以作出有效貢獻；按得多並不等於合作得好。",
    "Ensemble playing needs listening, response and space. A few notes can contribute meaningfully; more key presses do not necessarily mean better collaboration."
  ],
  "把四重奏里的贝斯关闭后，钢琴想继续提供清楚的低音基础，哪项调整值得试听？": [
    "把四重奏里的貝斯關閉後，鋼琴想繼續提供清楚的低音基礎，哪項調整值得試聽？",
    "You turn off the bass in a quartet. Which piano change is worth trying to maintain a clear bass foundation?"
  ],
  "所有乐器都加倍弹奏": [
    "所有樂器都加倍彈奏",
    "Make every instrument play twice as much"
  ],
  "保持同样的密度，只增加音量": [
    "保持同樣的密度，只增加音量",
    "Keep the same density and increase only the volume"
  ],
  "让钢琴适量补入低音，并听整体是否更清楚": [
    "讓鋼琴適量補入低音，並聽整體是否更清楚",
    "Let the piano add some low notes and listen for a clearer overall sound"
  ],
  "保持练习和速度，比较两个编制。原型会同时调整贝斯声部与钢琴配音，示范角色适应，不能把整体差异只归因于去根音。真实乐队也可以保留更轻的音响。": [
    "保持練習和速度，比較兩個編制。原型會同時調整貝斯聲部與鋼琴配音，示範角色適應，不能把整體差異只歸因於去根音。真實樂隊也可以保留更輕的音響。",
    "Keep the study and tempo fixed and compare both lineups. This prototype changes the bass part and piano voicings together to demonstrate adapting roles. The overall change cannot be attributed only to rootless voicings. Real bands can also choose a lighter texture."
  ],
  "同学说：“有贝斯就一定不能弹含根音的和弦。”你会怎么解释？": [
    "同學說：“有貝斯就一定不能彈含根音的和弦。”你會怎麼解釋？",
    "A classmate says, “With a bassist, the piano must never play chords containing a root.” How would you explain it?"
  ],
  "正确，根音在所有风格里都被禁止": [
    "正確，根音在所有風格里都被禁止",
    "Correct: roots are forbidden in every style"
  ],
  "去根音可以减少低音重叠，但仍要按具体声音决定": [
    "去根音可以減少低音重疊，但仍要按具體聲音決定",
    "Rootless voicings can reduce low-register overlap, but the sound should guide the choice"
  ],
  "错误，钢琴始终必须重复贝斯的每一个音": [
    "錯誤，鋼琴始終必須重復貝斯的每一個音",
    "Incorrect: the piano must always duplicate every bass note"
  ],
  "目标是协调音区和角色。去根音是一种编配方法，不是普遍规则。请用你刚才的 A/B 试听说明自己的选择。": [
    "目標是協調音區和角色。去根音是一種編配方法，不是普遍規則。請用你剛才的 A/B 試聽說明自己的選擇。",
    "The goal is to coordinate registers and roles. Rootless voicing is an arranging option, not a universal rule. Use evidence from your A/B listening to explain your choice."
  ],
  "你负责伴奏，发现自己盖住了主旋律。下一轮最值得尝试什么？": [
    "你負責伴奏，發現自己蓋住了主旋律。下一輪最值得嘗試什麼？",
    "You are accompanying and notice that you cover the main melody. What is most useful to try next?"
  ],
  "减少密度、留出空拍，听主旋律后再回应": [
    "減少密度、留出空拍，聽主旋律後再回應",
    "Reduce density, leave empty beats and respond after listening to the melody"
  ],
  "连续按更多音来提高分数": [
    "連續按更多音來提高分數",
    "Press more notes continuously to raise your score"
  ],
  "让所有乐器同步演奏完全相同的旋律": [
    "讓所有樂器同步演奏完全相同的旋律",
    "Make all instruments play exactly the same melody together"
  ],
  "有目的的留白让同伴更容易被听见。时机反馈只帮助感受拍点；音乐表达还需要由你、同伴和老师一起判断。": [
    "有目的的留白讓同伴更容易被聽見。時機回饋只幫助感受拍點；音樂表達還需要由你、同伴和老師一起判斷。",
    "Intentional space makes partners easier to hear. Timing feedback supports awareness of the pulse; musical expression still needs your judgment, your partners’ and your teacher’s."
  ],
  "01 · 找到乐队的地板": [
    "01 · 找到樂隊的地板",
    "01 · Find the band’s foundation"
  ],
  "选钢琴、鼓、萨克斯，先听一轮。预测：加入贝斯后，钢琴的低音会怎样变化？": [
    "選鋼琴、鼓、色士風，先聽一輪。預測：加入貝斯後，鋼琴的低音會怎樣變化？",
    "Choose piano, drums and saxophone and listen once. Predict: what will happen to the piano’s low notes when the bassist joins?"
  ],
  "02 · 做一次 A/B 试听": [
    "02 · 做一次 A/B 試聽",
    "02 · Try an A/B comparison"
  ],
  "保持曲目和速度相同，比较无贝斯／有贝斯。钢琴会随编制自动调整；说出一处听到的差异。": [
    "保持曲目和速度相同，比較無貝斯／有貝斯。鋼琴會隨編制自動調整；說出一處聽到的差異。",
    "Keep the tune and tempo the same. Compare with and without bass. The piano adapts to the lineup; describe one audible difference."
  ],
  "03 · 把你的声音放进去": [
    "03 · 把你的聲音放進去",
    "03 · Add your own voice"
  ],
  "选一个乐手角色，用三个演奏垫加入。先听一句、弹一句，再主动留出空拍；不需要读谱。": [
    "選一個樂手角色，用三個演奏墊加入。先聽一句、彈一句，再主動留出空拍；不需要讀譜。",
    "Choose a musician and join with three pads. Listen to a phrase, play a phrase, then deliberately leave a rest. No score reading needed."
  ],
  "04 · 换位，听见别人": [
    "04 · 換位，聽見別人",
    "04 · Swap roles and hear others"
  ],
  "换一种乐器或编制再演一轮。与同伴讨论：你减少了什么，又为谁留下了空间？": [
    "換一種樂器或編制再演一輪。與同伴討論：你減少了什麼，又為誰留下了空間？",
    "Try another instrument or lineup. Discuss with a partner: what did you play less of, and who gained space?"
  ],
  "05 · 带走一个新发现": [
    "05 · 帶走一個新發現",
    "05 · Take away a discovery"
  ],
  "完成后测，写下“我改变了什么—听到了什么—下次会怎样做”，保存学习记录。": [
    "完成後測，寫下“我改變了什麼—聽到了什麼—下次會怎樣做”，儲存學習記錄。",
    "Finish the post-quiz and record: “What I changed—what I heard—what I will try next.” Save your learning record."
  ],
  "Plass, Homer, & Kinzer (2015) · 游戏学习": [
    "Plass, Homer, & Kinzer (2015) · 遊戲學習",
    "Plass, Homer, & Kinzer (2015) · Game-based learning"
  ],
  "Berklee Online (2015) · 钢琴和弦配置": [
    "Berklee Online (2015) · 鋼琴和弦配置",
    "Berklee Online (2015) · Piano voicings"
  ],
  "bpm 必须是 50–240 之间的数字。": [
    "bpm 必須是 50–240 之間的數字。",
    "bpm must be a number between 50 and 240."
  ],
  "melodyEvents 最多可包含 2048 个音符事件。": [
    "melodyEvents 最多可包含 2048 個音符事件。",
    "melodyEvents can contain up to 2,048 note events."
  ],
  "旋律事件需要有效的 beat（曲目内拍数）、midi（36–96）与 duration（0–16 拍）。": [
    "旋律事件需要有效的 beat（曲目內拍數）、midi（36–96）與 duration（0–16 拍）。",
    "Melody events require a valid beat within the tune, midi pitch (36–96), and duration greater than 0 and up to 16 beats."
  ],
  "多音乐句会吸附到节拍；导向目标音的乐句在下一小节首拍解决。每次按键只记一次实际触发，自动乐句音符不额外计分。": [
    "多音樂句會對齊拍點；導向目標音的樂句在下一小節首拍解決。每次按鍵只記一次實際觸發，自動樂句音符不額外計分。",
    "Multi-note phrases align to the beat; target-note phrases resolve on the first beat of the next bar. Each press records one actual trigger; automatically generated phrase notes do not add hits."
  ],
  "根据当前编制与进阶难度，给我一个关于导向音、趋近音或包围的练习。": [
    "根據當前編制與進階難度，給我一個關於導向音、趨近音或包圍的練習。",
    "For this lineup and practice level, suggest an exercise using guide tones, approaches or enclosures."
  ],
  "当前按键材料": [
    "當前按鍵材料",
    "Selected pad material"
  ],
  "午夜蓝调": [
    "午夜藍調",
    "Midnight Blues"
  ],
  "转角晴天": [
    "轉角晴天",
    "Sunny Corners"
  ],
  "天鹅绒回声": [
    "天鵝絨回聲",
    "Velvet Echoes"
  ],
  "原创练习 · 12 小节 Blues": [
    "原創練習 · 12 小節 Blues",
    "Original study · 12-bar blues"
  ],
  "原创练习 · ii–V–I 对话": [
    "原創練習 · ii–V–I 對話",
    "Original study · ii–V–I conversation"
  ],
  "原创练习 · 小调循环": [
    "原創練習 · 小調循環",
    "Original study · minor-key loop"
  ],
  "自带授权素材 · 和弦练习": [
    "自帶授權素材 · 和弦練習",
    "Licensed material · chord study"
  ],
  "自定义": [
    "自定義",
    "Custom"
  ],
  "Jam studio": [
    "Jam studio",
    "Jam studio"
  ],
  "Learning path": [
    "Learning path",
    "Learning path"
  ],
  "Repertoire & listening": [
    "Repertoire & listening",
    "Repertoire & listening"
  ],
  "Session notes": [
    "Session notes",
    "Session notes"
  ],
  "LIVE SESSION": [
    "合奏進行中",
    "LIVE SESSION"
  ],
  "READY WHEN YOU ARE": [
    "準備好，就開始",
    "READY WHEN YOU ARE"
  ],
  "THE STAGE IS YOURS": [
    "舞台屬於你",
    "THE STAGE IS YOURS"
  ],
  "01 / THE LIVING ROOM": [
    "01 / 溫暖客廳",
    "01 / THE LIVING ROOM"
  ],
  "02 / UNDER THE STARS": [
    "02 / 星空之下",
    "02 / UNDER THE STARS"
  ],
  "03 / THE RECORDING ROOM": [
    "03 / 錄音工作室",
    "03 / THE RECORDING ROOM"
  ],
  "蓝调时刻爵士舞台。选择乐手，体验不同乐器的合奏角色。": [
    "藍調時刻爵士舞台。選擇樂手，體驗不同樂器的合奏角色。",
    "Blue Hour jazz stage. Choose a musician to explore an ensemble role."
  ],
  "休息中": [
    "休息中",
    "Resting"
  ],
  "你的角色": [
    "你的角色",
    "Your role"
  ],
  "乐手": [
    "樂手",
    "musician"
  ],
  "当前角色": [
    "當前角色",
    "Selected role"
  ],
  "点击选择角色": [
    "點擊選擇角色",
    "Select this role"
  ],
  "{instrument}乐手，{status}": [
    "{instrument}樂手，{status}",
    "{instrument} musician, {status}"
  ],
  "曲目文件过大，请控制在 32 KB 以内。": [
    "曲目檔案過大，請控制在 32 KB 以內。",
    "Tune file is too large. Keep it within 32 KB."
  ],
  "请导入有效的 JSON 曲目文件。": [
    "請導入有效的 JSON 曲目檔案。",
    "Please import a valid JSON tune file."
  ],
  "曲目内容必须是 JSON 对象。": [
    "曲目內容必須是 JSON 對象。",
    "Tune data must be a JSON object."
  ],
  "请填写 1–80 个字符的曲目名称 title。": [
    "請填寫 1–80 個字符的曲目名稱 title。",
    "Provide a title between 1 and 80 characters."
  ],
  "chords 需要包含 1–64 小节，每小节一个和弦。": [
    "chords 需要包含 1–64 小節，每小節一個和弦。",
    "chords must contain 1–64 bars, with one chord per bar."
  ],
  "bpm 必须是 50–180 之间的数字。": [
    "bpm 必須是 50–180 之間的數字。",
    "bpm must be a number between 50 and 180."
  ],
  "key 应为不超过 24 个字符的调性文字。": [
    "key 應為不超過 24 個字符的調性文字。",
    "key must be a key-name string of up to 24 characters."
  ],
  "melody 可包含 1–256 个 MIDI 音高（48–88），用 -1 表示休止。": [
    "melody 可包含 1–256 個 MIDI 音高（48–88），用 -1 表示休止。",
    "melody supports 1–256 MIDI pitches (48–88); use -1 for a rest."
  ],
  "暂不支持和弦「{chord}」。请检查和弦拼写或使用支持的基本／扩展和弦。": [
    "暫不支持和弦「{chord}」。請檢查和弦拼寫或使用支持的基本／擴展和弦。",
    "Chord “{chord}” is not supported. Check its spelling or use a supported basic or extended chord."
  ],
  "第 {bar} 小节不是有效的和弦。": [
    "第 {bar} 小節不是有效的和弦。",
    "Bar {bar} does not contain a valid chord."
  ],
  "网络连接失败，请检查网络后重试。": [
    "網絡連接失敗，請檢查網絡後重試。",
    "Connection failed. Check your network and try again."
  ],
  "暂时无法完成请求，请检查输入后重试。": [
    "暫時無法完成請求，請檢查輸入後重試。",
    "Unable to complete the request. Check your input and try again."
  ],
  "音频只能在浏览器中播放。": [
    "音訊只能在瀏覽器中播放。",
    "Audio can play only in a browser."
  ],
  "浏览器不支持 Web Audio，请使用最新版 Chrome、Safari 或 Edge。": [
    "瀏覽器不支持 Web Audio，請使用最新版 Chrome、Safari 或 Edge。",
    "This browser does not support Web Audio. Use a current Chrome, Safari or Edge browser."
  ],
  "浏览器音频尚未启动，请点击播放后重试。": [
    "瀏覽器音訊尚未啓動，請點擊播放後重試。",
    "Browser audio is not running yet. Press play and try again."
  ],
  "曲目至少需要一个和弦。": [
    "曲目至少需要一個和弦。",
    "A tune must contain at least one chord."
  ]
};
const simplifiedOverrides:Record<string,string>={
  "THE CLUB": "爵士俱乐部",
  "LISTEN. PLAY. BELONG.": "聆听 · 演奏 · 彼此共鸣",
  "VOL. 01": "第一辑",
  "THE FIRST JAM": "初次合奏",
  "60 MIN / BEGINNER": "60 分钟 / 入门路线",
  "YOUR SESSION BOOK": "你的演奏手记",
  "YOUR REPERTOIRE": "你的曲目",
  "Jam studio": "Jam studio",
  "Learning path": "Learning path",
  "Repertoire & listening": "Repertoire & listening",
  "Session notes": "Session notes",
  "LIVE SESSION": "合奏进行中",
  "READY WHEN YOU ARE": "准备好，就开始",
  "THE STAGE IS YOURS": "舞台属于你",
  "01 / THE LIVING ROOM": "01 / 温暖客厅",
  "02 / UNDER THE STARS": "02 / 星空之下",
  "03 / THE RECORDING ROOM": "03 / 录音工作室"
};
const traditionalCharacters:Record<string,string>={"对":"對","风":"風","复":"復","绒":"絨","叠":"疊","题":"題","频":"頻","温":"溫","盖":"蓋","样":"樣","会":"會","现":"現","错":"錯","规":"規","从":"從","获":"獲","节":"節","鸣":"鳴","单":"單","为":"為","续":"續","范":"範","于":"於","证":"證","给":"給","着":"著","战":"戰","线":"線","迁":"遷","览":"覽","顿":"頓","贝":"貝","载":"載","达":"達","项":"項","与":"與","择":"擇","误":"誤","绩":"績","础":"礎","暂":"暫","发":"發","别":"別","戏":"戲","败":"敗","尝":"嘗","时":"時","动":"動","许":"許","这":"這","议":"議","读":"讀","触":"觸","释":"釋","义":"義","选":"選","变":"變","权":"權","间":"間","试":"試","担":"擔","离":"離","没":"沒","练":"練","备":"備","蓝":"藍","论":"論","协":"協","检":"檢","扩":"擴","辅":"輔","际":"際","并":"並","责":"責","决":"決","测":"測","术":"術","击":"擊","导":"導","队":"隊","则":"則","预":"預","仅":"僅","异":"異","迹":"跡","编":"編","声":"聲","钟":"鐘","学":"學","须":"須","写":"寫","计":"計","鹅":"鵝","网":"網","标":"標","组":"組","记":"記","听":"聽","断":"斷","问":"問","贡":"貢","来":"來","后":"後","脉":"脈","较":"較","认":"認","适":"適","闭":"閉","独":"獨","萨":"薩","种":"種","环":"環","转":"轉","据":"據","乐":"樂","订":"訂","构":"構","应":"應","阶":"階","压":"壓","库":"庫","虑":"慮","门":"門","趋":"趨","内":"內","满":"滿","请":"請","实":"實","换":"換","几":"幾","帮":"幫","条":"條","络":"絡","响":"響","习":"習","补":"補","联":"聯","经":"經","历":"歷","围":"圍","键":"鍵","确":"確","价":"價","难":"難","录":"錄","评":"評","创":"創","说":"說","归":"歸","属":"屬","轻":"輕","开":"開","钢":"鋼","馈":"饋","摇":"搖","页":"頁","区":"區","观":"觀","们":"們","两":"兩","辑":"輯","体":"體","销":"銷","刚":"剛","顾":"顧","终":"終","觉":"覺","绝":"絕","讨":"討","简":"簡","见":"見","继":"繼","进":"進","话":"話","个":"個","稳":"穩","减":"減","号":"號","结":"結","摆":"擺","弹":"彈","数":"數","谱":"譜","调":"調","让":"讓","态":"態","带":"帶","么":"麼","头":"頭","输":"輸","轮":"輪","负":"負","点":"點","谁":"誰","将":"將","还":"還","状":"狀","称":"稱","处":"處","启":"啓","关":"關","丰":"豐","过":"過","迟":"遲","无":"無","当":"當","师":"師","欢":"歡","浏":"瀏","随":"隨","验":"驗","设":"設","献":"獻","课":"課","厅":"廳","垫":"墊","撑":"撐","机":"機","盘":"盤","场":"場","语":"語","连":"連"};
const reverse = new Map<string,string>();
for(const [key,[traditional,english]] of Object.entries(phrases)){
  if(!reverse.has(traditional))reverse.set(traditional,key);
  if(!reverse.has(english))reverse.set(english,key);
  const simplified=simplifiedOverrides[key];if(simplified)reverse.set(simplified,key);
}
function translate(locale:Locale,input:string):string {
 const key=Object.prototype.hasOwnProperty.call(phrases,input)?input:(reverse.get(input)??input);
 const entry=phrases[key];
 if(entry)return locale==='en'?entry[1]:locale==='zh-TW'?entry[0]:(simplifiedOverrides[key]??key);
 return locale==='zh-TW'?Array.from(input,c=>traditionalCharacters[c]??c).join(''):input;
}
export function createTranslator(locale:Locale){
 return (key:string,params?:Record<string,string|number>):string=>{
  const result=translate(locale,key);
  return result.replace(/\{(\w+)\}/g,(token,name:string)=>params?.[name]===undefined?token:typeof params[name]==='string'?translate(locale,String(params[name])):String(params[name]));
 };
}
export function translateError(locale:Locale,message:string):string {
 const t=createTranslator(locale);
 if(phrases[message]||reverse.has(message))return t(message);
 const chord=message.match(/^(?:暂不支持和弦|暫不支持和弦)「(.+)」。/)??message.match(/^Chord “(.+)” is not supported\./);
 if(chord)return t('暂不支持和弦「{chord}」。请检查和弦拼写或使用支持的基本／扩展和弦。',{chord:chord[1]});
 const bar=message.match(/^第 (\d+) 小[节節]不是有效的和弦。/)??message.match(/^Bar (\d+) does not contain a valid chord\./);
 if(bar)return t('第 {bar} 小节不是有效的和弦。',{bar:bar[1]});
 if(/fetch|network|load failed|connection/i.test(message))return t('网络连接失败，请检查网络后重试。');
 if(locale==='en'&&/[\u3400-\u9fff]/.test(message))return t('暂时无法完成请求，请检查输入后重试。');
 return t(message);
}
