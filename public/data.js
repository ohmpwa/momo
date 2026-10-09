// Momo — all content in one place: vocabulary, levels, buddies, UI text and spoken lines.
// Shared by the game (index.html) and the tools (tools/gen-audio.mjs, tools/fetch-emoji.mjs).
// After adding a word or phrase here, run both tools to record voices and fetch pictures.

const LANGS = ["en", "zh", "th"];

// Cloudflare Web Analytics (cookieless, no personal data). Paste the site token to enable; empty = off.
const ANALYTICS_TOKEN = "";

// ---------- Vocabulary: [emoji, English, Chinese, pinyin, Thai] ----------
const V = {
  animals:[["🐶","dog","狗","gǒu","หมา"],["🐱","cat","猫","māo","แมว"],["🐟","fish","鱼","yú","ปลา"],["🐦","bird","鸟","niǎo","นก"],["🐷","pig","猪","zhū","หมู"],["🐮","cow","牛","niú","วัว"]],
  colors:[["🔴","red","红色","hóngsè","สีแดง"],["🔵","blue","蓝色","lánsè","สีน้ำเงิน"],["🟡","yellow","黄色","huángsè","สีเหลือง"],["🟢","green","绿色","lǜsè","สีเขียว"],["⚫","black","黑色","hēisè","สีดำ"],["⚪","white","白色","báisè","สีขาว"]],
  fruits:[["🍎","apple","苹果","píngguǒ","แอปเปิล"],["🍌","banana","香蕉","xiāngjiāo","กล้วย"],["🍇","grapes","葡萄","pútao","องุ่น"],["🍉","watermelon","西瓜","xīguā","แตงโม"],["🍊","orange","橙子","chéngzi","ส้ม"],["🍓","strawberry","草莓","cǎoméi","สตรอว์เบอร์รี"]],
  numbers:[[1,"one","一","yī","หนึ่ง"],[2,"two","二","èr","สอง"],[3,"three","三","sān","สาม"],[4,"four","四","sì","สี่"],[5,"five","五","wǔ","ห้า"],[6,"six","六","liù","หก"],[7,"seven","七","qī","เจ็ด"],[8,"eight","八","bā","แปด"],[9,"nine","九","jiǔ","เก้า"],[10,"ten","十","shí","สิบ"]],
  body:[["👀","eyes","眼睛","yǎnjing","ตา"],["👂","ears","耳朵","ěrduo","หู"],["👃","nose","鼻子","bízi","จมูก"],["👄","mouth","嘴巴","zuǐba","ปาก"],["✋","hand","手","shǒu","มือ"],["🦶","foot","脚","jiǎo","เท้า"]],
  vehicles:[["🚗","car","汽车","qìchē","รถยนต์"],["🚌","bus","公共汽车","gōnggòng qìchē","รถบัส"],["🚲","bike","自行车","zìxíngchē","จักรยาน"],["✈️","plane","飞机","fēijī","เครื่องบิน"],["🚂","train","火车","huǒchē","รถไฟ"],["⛵","boat","船","chuán","เรือ"]],
  family:[["👨","dad","爸爸","bàba","พ่อ"],["👩","mom","妈妈","māma","แม่"],["👴","grandpa","爷爷","yéye","ปู่"],["👵","grandma","奶奶","nǎinai","ย่า"],["👦","brother","哥哥","gēge","พี่ชาย"],["👧","sister","姐姐","jiějie","พี่สาว"]],
  food:[["🍚","rice","米饭","mǐfàn","ข้าว"],["🥛","milk","牛奶","niúnǎi","นม"],["🍞","bread","面包","miànbāo","ขนมปัง"],["🥚","egg","鸡蛋","jīdàn","ไข่"],["🍜","noodles","面条","miàntiáo","ก๋วยเตี๋ยว"],["💧","water","水","shuǐ","น้ำ"]],
  shapes:[["⭕","circle","圆形","yuánxíng","วงกลม"],["🔺","triangle","三角形","sānjiǎoxíng","สามเหลี่ยม"],["🟥","square","正方形","zhèngfāngxíng","สี่เหลี่ยม"],["⭐","star","星星","xīngxing","ดาว"],["❤️","heart","心形","xīnxíng","หัวใจ"],["🌙","moon","月亮","yuèliang","พระจันทร์"]],
  clothes:[["👕","shirt","衬衫","chènshān","เสื้อ"],["👖","pants","裤子","kùzi","กางเกง"],["👗","dress","裙子","qúnzi","กระโปรง"],["🧢","cap","帽子","màozi","หมวก"],["🧦","socks","袜子","wàzi","ถุงเท้า"],["👟","shoes","鞋子","xiézi","รองเท้า"]],
  feelings:[["😀","happy","开心","kāixīn","ดีใจ"],["😢","sad","难过","nánguò","เสียใจ"],["😠","angry","生气","shēngqì","โกรธ"],["😴","sleepy","困","kùn","ง่วง"]],
  weather:[["☀️","sunny","晴天","qíngtiān","แดดออก"],["🌧️","rainy","下雨","xiàyǔ","ฝนตก"],["☁️","cloudy","多云","duōyún","มีเมฆ"],["❄️","snowy","下雪","xiàxuě","หิมะตก"],["🌈","rainbow","彩虹","cǎihóng","สายรุ้ง"],["🌬️","windy","刮风","guāfēng","ลมแรง"]],
  toys:[["⚽","ball","球","qiú","ลูกบอล"],["🧸","teddy bear","玩具熊","wánjù xióng","ตุ๊กตาหมี"],["🪁","kite","风筝","fēngzheng","ว่าว"],["🧩","puzzle","拼图","pīntú","จิ๊กซอว์"],["🎈","balloon","气球","qìqiú","ลูกโป่ง"],["🧱","blocks","积木","jīmù","ตัวต่อ"]],
  routine:[["🪥","brush teeth","刷牙","shuāyá","แปรงฟัน"],["🛁","take a bath","洗澡","xǐzǎo","อาบน้ำ"],["🍽️","eat","吃饭","chīfàn","กินข้าว"],["🛏️","sleep","睡觉","shuìjiào","นอน"],["🧼","wash hands","洗手","xǐshǒu","ล้างมือ"],["🎒","go to school","上学","shàngxué","ไปโรงเรียน"]],
  greetings:[["🙋","hello","你好","nǐ hǎo","สวัสดี"],["👋","goodbye","再见","zàijiàn","ลาก่อน"],["🙏","thank you","谢谢","xièxie","ขอบคุณ"],["🙇","sorry","对不起","duìbuqǐ","ขอโทษ"],["🌅","good morning","早上好","zǎoshang hǎo","อรุณสวัสดิ์"],["🌃","good night","晚安","wǎn'ān","ราตรีสวัสดิ์"]],
};
const COL = { en: 1, zh: 2, th: 4 };
const wordIn = (w, lang) => String(w[COL[lang]]);
const num = (n, lang) => wordIn(V.numbers[n - 1], lang);

const SETNAME = {
  en:{animals:"Animals",colors:"Colors",fruits:"Fruits",numbers:"Numbers",body:"My body",vehicles:"Vehicles",family:"Family",food:"Food",shapes:"Shapes",clothes:"Clothes",feelings:"Feelings",weather:"Weather",toys:"Toys",routine:"My day",greetings:"Greetings",abc:"A–Z"},
  zh:{animals:"动物",colors:"颜色",fruits:"水果",numbers:"数字",body:"身体",vehicles:"交通工具",family:"家人",food:"食物",shapes:"形状",clothes:"衣服",feelings:"心情",weather:"天气",toys:"玩具",routine:"每一天",greetings:"问候",abc:"汉字"},
  th:{animals:"สัตว์",colors:"สี",fruits:"ผลไม้",numbers:"ตัวเลข",body:"ร่างกาย",vehicles:"ยานพาหนะ",family:"ครอบครัว",food:"อาหาร",shapes:"รูปทรง",clothes:"เสื้อผ้า",feelings:"อารมณ์",weather:"อากาศ",toys:"ของเล่น",routine:"กิจวัตร",greetings:"คำทักทาย",abc:"ก–ฮ"},
};

// ---------- Alphabets: [emoji, letter, word, spoken] ----------
const ABC = {
  en:[["🍎","A","apple"],["⚽","B","ball"],["🐱","C","cat"],["🐶","D","dog"],["🥚","E","egg"],["🐟","F","fish"],["🍇","G","grapes"],["🎩","H","hat"],
      ["🍦","I","ice cream"],["🧃","J","juice"],["🪁","K","kite"],["🦁","L","lion"],["🌙","M","moon"],["👃","N","nose"],["🍊","O","orange"],["🐷","P","pig"],
      ["👸","Q","queen"],["🐰","R","rabbit"],["☀️","S","sun"],["🌳","T","tree"],["☂️","U","umbrella"],["🚐","V","van"],["⌚","W","watch"],["🩻","X","x-ray"],
      ["🪀","Y","yo-yo"],["🦓","Z","zebra"]].map(([e,l,w])=>[e,l,w,`${l} is for ${w}`]),
  th:[["🐔","ก","ไก่","กอ"],["🥚","ข","ไข่","ขอ"],["🍾","ฃ","ขวด","ขอ"],["🐃","ค","ควาย","คอ"],["🧍","ฅ","คน","คอ"],["🔔","ฆ","ระฆัง","คอ"],["🐍","ง","งู","งอ"],
      ["🍽️","จ","จาน","จอ"],["🥁","ฉ","ฉิ่ง","ฉอ"],["🐘","ช","ช้าง","ชอ"],["⛓️","ซ","โซ่","ซอ"],["🌳","ฌ","เฌอ","ชอ"],["👩","ญ","หญิง","ยอ"],["👑","ฎ","ชฎา","ดอ"],
      ["🔱","ฏ","ปฏัก","ตอ"],["🏛️","ฐ","ฐาน","ถอ"],["👸","ฑ","มณโฑ","ทอ"],["👴","ฒ","ผู้เฒ่า","ทอ"],["🧒","ณ","เณร","นอ"],["👦","ด","เด็ก","ดอ"],["🐢","ต","เต่า","ตอ"],
      ["👜","ถ","ถุง","ถอ"],["💂","ท","ทหาร","ทอ"],["🚩","ธ","ธง","ทอ"],["🐭","น","หนู","นอ"],["🍃","บ","ใบไม้","บอ"],["🐟","ป","ปลา","ปอ"],["🐝","ผ","ผึ้ง","ผอ"],
      ["🫙","ฝ","ฝา","ฝอ"],["🏆","พ","พาน","พอ"],["🦷","ฟ","ฟัน","ฟอ"],["⛵","ภ","สำเภา","พอ"],["🐴","ม","ม้า","มอ"],["👹","ย","ยักษ์","ยอ"],["🚣","ร","เรือ","รอ"],
      ["🐒","ล","ลิง","ลอ"],["💍","ว","แหวน","วอ"],["🛖","ศ","ศาลา","สอ"],["🧙","ษ","ฤๅษี","สอ"],["🐯","ส","เสือ","สอ"],["🧰","ห","หีบ","หอ"],["🪁","ฬ","จุฬา","ลอ"],
      ["🛁","อ","อ่าง","ออ"],["🦉","ฮ","นกฮูก","ฮอ"]].map(([e,l,w,n])=>[e,l,w,`${n} ${w}`]),
};
// How much of the alphabet each age works with
const ABC_SIZE = { en:{3:8,4:10,5:18,6:26}, th:{3:10,4:15,5:30,6:44} };

// ---------- Short sentences (ages 5–6) ----------
const pl = (w, n) => n < 2 || /s$/.test(w) ? w : w.replace(/y$/, "ie") + "s";
const pickBy = (map, w, fallback) => map[w[1]] ?? fallback;
const SENT = {
  en:{
    animals:w=>`I see a ${w[1]}`, fruits:w=>`I like ${pl(w[1],2)}`, family:w=>`This is my ${w[1]}`, feelings:w=>`I am ${w[1]}`,
    food:w=>`I want ${pickBy({egg:"an egg"},w,"some "+w[1])}`, colors:w=>`It is ${w[1]}`, vehicles:w=>`I go by ${w[1]}`,
    body:w=>`Touch your ${w[1]}`, clothes:w=>`I wear ${pickBy({shirt:"a shirt",dress:"a dress",cap:"a cap"},w,w[1])}`,
    toys:w=>`I play with ${w[1]==="blocks"?"blocks":"a "+w[1]}`,
    routine:w=>pickBy({"brush teeth":"I brush my teeth","take a bath":"I take a bath",eat:"I eat my lunch",sleep:"I go to sleep","wash hands":"I wash my hands","go to school":"I go to school"},w),
  },
  zh:{
    animals:w=>`我看见${w[2]}`, fruits:w=>`我喜欢吃${w[2]}`, family:w=>`这是我${w[2]}`, feelings:w=>`我很${w[2]}`,
    food:w=>`我要${w[2]}`, colors:w=>`这是${w[2]}`, vehicles:w=>w[1]==="bike"?"我骑自行车":`我坐${w[2]}`,
    body:w=>`摸摸你的${w[2]}`, clothes:w=>w[1]==="cap"?"我戴帽子":`我穿${w[2]}`, toys:w=>`我玩${w[2]}`, routine:w=>`我${w[2]}`,
  },
  th:{
    animals:w=>`หนูเห็น${w[4]}`, fruits:w=>`หนูชอบกิน${w[4]}`, family:w=>`นี่คือ${w[4]}ของหนู`, feelings:w=>`หนูรู้สึก${w[4]}`,
    food:w=>`หนูอยากได้${w[4]}`, colors:w=>`นี่คือ${w[4]}`, vehicles:w=>w[1]==="bike"?"หนูขี่จักรยาน":`หนูนั่ง${w[4]}`,
    body:w=>`ชี้ที่${w[4]}`, clothes:w=>`หนูใส่${w[4]}`, toys:w=>`หนูเล่น${w[4]}`, routine:w=>`หนู${w[4]}`,
  },
};

// ---------- Difficulty by age ----------
// n: choices · rounds · cnt: max count · pairs: memory pairs · speed: balloon seconds · seq: words to remember
const AGES = {
  3:{icon:"🐣",n:2,rounds:4,cnt:3,pairs:3,speed:9,seq:1,pat:"AB"},
  4:{icon:"🐥",n:3,rounds:5,cnt:5,pairs:4,speed:7,seq:2,pat:"AB"},
  5:{icon:"🐤",n:4,rounds:5,cnt:10,pairs:5,speed:5.5,seq:3,pat:"AAB"},
  6:{icon:"🦅",n:4,rounds:6,cnt:10,pairs:6,speed:4.5,seq:4,pat:"ABC"},
};

// ---------- Game catalog & level paths ----------
const GAMES = {
  tap:{i:"👂",t:{en:"Listen & tap",zh:"听一听",th:"ฟังแล้วแตะ"}},
  shadow:{i:"🌑",t:{en:"Whose shadow?",zh:"找影子",th:"เงาของใคร"}},
  pop:{i:"🎈",t:{en:"Balloon pop",zh:"戳气球",th:"ลูกโป่งลอยฟ้า"}},
  memory:{i:"🧠",once:1,t:{en:"Memory match",zh:"记忆配对",th:"จับคู่ความจำ"}},
  count:{i:"🔢",t:{en:"Let's count",zh:"数一数",th:"นับเลข"}},
  basket:{i:"🧺",t:{en:"Fill the basket",zh:"装篮子",th:"ใส่ตะกร้า"}},
  odd:{i:"🔍",t:{en:"Odd one out",zh:"找不同",th:"อันไหนต่างพวก"}},
  pattern:{i:"🧩",t:{en:"Patterns",zh:"找规律",th:"เรียงตามแบบ"}},
  letter:{i:"🔤",t:{en:"First letter",zh:"认汉字",th:"อ่านคำ"}},
  seq:{i:"🦜",t:{en:"Parrot memory",zh:"鹦鹉学舌",th:"จำให้ได้"}},
  add:{i:"➕",t:{en:"Adding",zh:"加法",th:"บวกเลข"}},
  talk:{i:"🎤",t:{en:"Say it!",zh:"跟我说",th:"พูดตาม"}},
  sentence:{i:"💬",t:{en:"Short sentences",zh:"说句子",th:"ประโยคสั้น"}},
  abc:{i:"🔠",t:{en:"ABC",zh:"认汉字",th:"ก ไก่"}},
};
// Each level is "game.set" (+ ".h" for a harder 🔥 version). The id is stable, so levels can be inserted later.
const parsePath = s => s.split(",").map(x => { const [game, set, h] = x.split("."); return { game, set, hard: !!h, id: x }; });
const PATHS = {
  3:parsePath("tap.animals,shadow.animals,tap.colors,pop.fruits,tap.fruits,memory.animals,shadow.vehicles,count.numbers,tap.toys,tap.body,pop.animals,tap.family,memory.fruits,shadow.food,tap.weather,pop.colors,shadow.toys,tap.vehicles,tap.greetings,tap.animals.h"),
  4:parsePath("tap.animals,count.numbers,pattern.colors,odd.fruits,basket.fruits,shadow.vehicles,abc.animals,pop.vehicles,memory.food,tap.feelings,odd.animals,tap.weather,tap.shapes,pattern.fruits,abc.fruits,seq.animals,shadow.clothes,memory.toys,pop.shapes.h,talk.animals,tap.routine,memory.family.h,count.numbers.h,abc.body.h"),
  5:parsePath("tap.body,odd.food,letter.animals,abc.animals,seq.animals,sentence.fruits,memory.family,count.numbers,basket.fruits,pattern.shapes,pop.food,letter.fruits,tap.routine,talk.fruits,sentence.family,tap.clothes,seq.colors,memory.vehicles,abc.body,add.numbers,tap.greetings,odd.vehicles.h,letter.body,sentence.animals,pop.clothes.h,talk.family,odd.weather,sentence.toys,pattern.animals.h,abc.fruits.h"),
  6:parsePath("letter.vehicles,sentence.feelings,seq.fruits,add.numbers,abc.vehicles,odd.food,pattern.animals,sentence.food,memory.food,talk.family,letter.food,sentence.vehicles,pop.clothes,seq.body,abc.shapes,basket.fruits.h,tap.feelings.h,sentence.body,letter.clothes,talk.greetings,talk.vehicles,memory.clothes.h,sentence.clothes,add.numbers.h,odd.shapes.h,seq.family.h,letter.routine,sentence.routine,pattern.shapes.h,letter.shapes.h,pop.vehicles.h,talk.food.h,abc.colors.h,sentence.colors.h"),
};
// Level order before ids existed (progress was saved as "age-index"); used once to migrate old saves
const LEGACY_PATHS = {
  3:"tap.animals,shadow.animals,tap.colors,pop.fruits,tap.fruits,memory.animals,shadow.vehicles,count.numbers,tap.body,pop.animals,tap.family,memory.fruits,shadow.food,pop.colors,tap.vehicles,tap.animals.h",
  4:"tap.animals,count.numbers,pattern.colors,odd.fruits,basket.fruits,shadow.vehicles,pop.vehicles,memory.food,tap.feelings,odd.animals,tap.shapes,pattern.fruits,seq.animals,shadow.clothes,pop.shapes.h,talk.animals,memory.family.h,count.numbers.h",
  5:"tap.body,odd.food,letter.animals,seq.animals,memory.family,count.numbers,basket.fruits,pattern.shapes,pop.food,letter.fruits,talk.fruits,tap.clothes,seq.colors,memory.vehicles,add.numbers,odd.vehicles.h,letter.body,pop.clothes.h,talk.family,pattern.animals.h",
  6:"letter.vehicles,seq.fruits,add.numbers,odd.food,pattern.animals,memory.food,talk.family,letter.food,pop.clothes,seq.body,basket.fruits.h,tap.feelings.h,letter.clothes,talk.vehicles,memory.clothes.h,add.numbers.h,odd.shapes.h,seq.family.h,pattern.shapes.h,letter.shapes.h,pop.vehicles.h,talk.food.h",
};

// ---------- Buddies ----------
// n: name · say: self-introduction (spoken) · hi: home greeting
const PETS = [
  {id:"momo",e:"🐰",n:{en:"Momo",zh:"莫莫",th:"โมโมะ"},
   say:{en:"Hi! I am Momo the bunny!",zh:"你好!我是小兔子Momo!",th:"สวัสดีจ้า! หนูชื่อโมโมะ เป็นกระต่ายน้อย!"},
   hi:{en:"Hop hop! Let's play!",zh:"蹦蹦跳跳,一起玩吧!",th:"กระโดดเหยงๆ ไปเล่นกันเถอะ!"}},
  {id:"panpan",e:"🐼",n:{en:"Panpan",zh:"盼盼",th:"แพนแพน"},
   say:{en:"Hello! I am Panpan the panda!",zh:"你好!我是熊猫盼盼!",th:"สวัสดีจ้า! เราชื่อแพนแพน เป็นแพนด้า!"},
   hi:{en:"I love bamboo, but I love learning with you most!",zh:"我爱吃竹子,更爱和你一起学习!",th:"แพนแพนชอบกินไผ่ แต่ชอบเรียนกับหนูที่สุด!"}},
  {id:"miew",e:"🐱",n:{en:"Miew",zh:"咪咪",th:"เหมียวเหมียว"},
   say:{en:"Meow! I am Miew the kitty!",zh:"喵!我是小猫咪咪!",th:"เมี้ยว! เราชื่อเหมียวเหมียว เป็นแมวน้อย!"},
   hi:{en:"Meow~ What shall we play today?",zh:"喵~ 今天玩什么呢?",th:"เมี้ยว~ วันนี้เล่นอะไรดีน้า"}},
  {id:"puy",e:"🐶",n:{en:"Puy",zh:"小白",th:"ปุยฝ้าย"},
   say:{en:"Woof! I am Puy the puppy!",zh:"汪汪!我是小狗!",th:"โฮ่งๆ! เราชื่อปุยฝ้าย เป็นลูกหมา!"},
   hi:{en:"Woof woof! I'm ready!",zh:"汪汪!我准备好了!",th:"โฮ่งๆ! ปุยฝ้ายพร้อมแล้ว!"}},
  {id:"kiko",e:"🦊",n:{en:"Kiko",zh:"琪琪",th:"กิโกะ"},
   say:{en:"Hi! I am Kiko the fox!",zh:"你好!我是小狐狸!",th:"สวัสดี! เราชื่อกิโกะ เป็นจิ้งจอกน้อย!"},
   hi:{en:"I'm a clever fox. Can you beat me?",zh:"我是聪明的小狐狸,来比一比吧!",th:"กิโกะฉลาดมาก มาแข่งกันไหม?"}},
  {id:"lala",e:"🦄",n:{en:"Lala",zh:"拉拉",th:"ลาล่า"},
   say:{en:"Hello! I am Lala the unicorn!",zh:"你好!我是独角兽拉拉!",th:"สวัสดีจ้า! เราชื่อลาล่า เป็นยูนิคอร์น!"},
   hi:{en:"I make a star every time you get it right! ✨",zh:"你答对一次,我就变出一颗星星! ✨",th:"ลาล่าเสกดาวให้ทุกครั้งที่หนูตอบถูก ✨"}},
  {id:"koko",e:"🐨",n:{en:"Koko",zh:"可可",th:"โคโค่"},
   say:{en:"Hi! I am Koko the koala!",zh:"你好!我是考拉可可!",th:"สวัสดี! เราชื่อโคโค่ เป็นโคอาล่า!"},
   hi:{en:"I'm a little sleepy. Help me wake up!",zh:"我有点困,快来叫醒我!",th:"โคโค่ง่วงนิดหน่อย มาช่วยปลุกหน่อยนะ"}},
  {id:"gab",e:"🐸",n:{en:"Gab",zh:"呱呱",th:"อ๊บอ๊บ"},
   say:{en:"Ribbit! I am Gab the frog!",zh:"呱呱!我是小青蛙!",th:"อ๊บๆ! เราชื่ออ๊บอ๊บ เป็นกบน้อย!"},
   hi:{en:"Ribbit! Let's hop and learn!",zh:"呱呱!一起跳着学习吧!",th:"อ๊บๆ! กระโดดไปเรียนด้วยกันนะ"}},
  {id:"chick",e:"🐥",n:{en:"Peep",zh:"叽叽",th:"ปิ๊บปิ๊บ"},
   say:{en:"Tweet! I am Peep the chick!",zh:"叽叽!我是小鸡!",th:"ปิ๊บๆ! เราชื่อปิ๊บปิ๊บ เป็นลูกเจี๊ยบ!"},
   hi:{en:"Small chick, big heart!",zh:"我个子小,心很大!",th:"ปิ๊บๆ! ปิ๊บปิ๊บตัวเล็กแต่ใจใหญ่"}},
  {id:"tiger",e:"🐯",n:{en:"Tiger",zh:"虎虎",th:"ไทเกอร์"},
   say:{en:"Roar! I am Tiger!",zh:"嗷呜!我是小老虎!",th:"แฮ่! เราชื่อไทเกอร์ เป็นเสือน้อย!"},
   hi:{en:"Roar! I'll help you get stronger!",zh:"嗷呜!我帮你变得更棒!",th:"แฮ่! ไทเกอร์จะช่วยหนูเก่งขึ้น!"}},
  {id:"pengu",e:"🐧",n:{en:"Pengu",zh:"企企",th:"เพนกู"},
   say:{en:"Hi! I am Pengu the penguin!",zh:"你好!我是小企鹅!",th:"สวัสดี! เราชื่อเพนกู เป็นเพนกวิน!"},
   hi:{en:"Waddle waddle, let's learn together!",zh:"摇摇摆摆,一起学习吧!",th:"เพนกูเดินเตาะแตะ มาเรียนด้วยกันนะ!"}},
  {id:"leo",e:"🦁",n:{en:"Leo",zh:"里奥",th:"ลีโอ"},
   say:{en:"Roar! I am Leo the lion!",zh:"嗷!我是小狮子里奥!",th:"โฮก! เราชื่อลีโอ เป็นสิงโตน้อย!"},
   hi:{en:"King of the jungle, brave like you!",zh:"森林之王,和你一样勇敢!",th:"ลีโอราชาแห่งป่า กล้าหาญเหมือนหนูเลย!"}},
];
// Each buddy has a slightly different voice pitch
const PET_PITCH = {momo:1.2,panpan:1.05,miew:1.25,puy:1.15,kiko:1.1,lala:1.25,koko:1,gab:1.1,chick:1.3,tiger:1,pengu:1.15,leo:.95};

const STICKERS = ["🦄","🐼","🦁","🐸","🐵","🐧","🦋","🐳","🌈","🚀","🍦","🎂","🧸","👑","🎩","🕶️","🦖","🐙","🌻","🍩"];
const PRICE = 10;
const MISSION_BONUS = 5;

// ---------- Spoken lines (all pre-recorded) ----------
const SAY = {
  en:{tryAgain:"Try again",hooray:"Hooray! You did it!",shadow:"Whose shadow is this?",howMany:"How many?",odd:"Which one is different?",
      next:"What comes next?",locked:"Finish the level before first!",allDone:"You collected them all!",needStars:"Collect a few more stars!",yay:"Yay!",
      rest:"Time to rest your eyes! See you tomorrow!",mission:"Mission complete! Here are bonus stars!",
      age:a=>`${num(a,"en")} years old`,
      basket:(n,w)=>`Put ${num(n,"en")} ${pl(w[1],n)} in the basket`,
      plus:(a,b)=>`${num(a,"en")} plus ${num(b,"en")}`, sum:(a,b)=>`${num(a,"en")} plus ${num(b,"en")} is ${num(a+b,"en")}`,
      letter:w=>`${w[1][0]}, ${w[1]}`},
  zh:{tryAgain:"再试试",hooray:"太棒了!",shadow:"这是谁的影子?",howMany:"有几个?",odd:"哪个不一样?",
      next:"下一个是什么?",locked:"先完成前面的关卡吧!",allDone:"全部收集好了!",needStars:"再多收集一些星星吧!",yay:"耶!",
      rest:"该让眼睛休息一下啦!明天见!",mission:"任务完成!送你额外的星星!",
      age:a=>`${num(a,"zh")}岁`,
      basket:(n,w)=>`请放${num(n,"zh")}个${w[2]}`,
      plus:(a,b)=>`${num(a,"zh")}加${num(b,"zh")}`, sum:(a,b)=>`${num(a,"zh")}加${num(b,"zh")}等于${num(a+b,"zh")}`},
  th:{tryAgain:"ลองใหม่นะ",hooray:"เย้! เก่งมากเลย!",shadow:"นี่คือเงาของอะไรเอ่ย?",howMany:"มีกี่อันเอ่ย?",odd:"อันไหนไม่เหมือนพวกนะ?",
      next:"ต่อไปคืออะไรเอ่ย?",locked:"ผ่านด่านก่อนหน้าก่อนนะ",allDone:"ครบแล้ว เก่งมาก",needStars:"เก็บดาวเพิ่มอีกนิดนะ",yay:"เย้!",
      rest:"ได้เวลาพักสายตาแล้วจ้า พรุ่งนี้มาเล่นกันใหม่นะ",mission:"ภารกิจสำเร็จ! รับดาวโบนัสไปเลย!",
      age:a=>`${num(a,"th")}ขวบ`,
      basket:(n,w)=>`ใส่${w[4]} ${num(n,"th")} ${w[1]==="grapes"?"พวง":"ลูก"} ลงในตะกร้า`,
      plus:(a,b)=>`${num(a,"th")}บวก${num(b,"th")}`, sum:(a,b)=>`${num(a,"th")}บวก${num(b,"th")} เท่ากับ ${num(a+b,"th")}`},
};

// Every line the game can speak, per language: [lang, text, pitchHz?]
function spokenPhrases() {
  const out = [];
  for (const lang of LANGS) {
    const s = SAY[lang], add = (t, p) => out.push([lang, t, p]);
    for (const w of Object.values(V).flat()) { add(wordIn(w, lang)); if (s.letter) add(s.letter(w)); }
    for (const [k, v] of Object.entries(s)) if (typeof v === "string") add(v);
    for (const a of [3, 4, 5, 6]) add(s.age(a));
    for (const w of V.fruits) for (let n = 1; n <= 5; n++) add(s.basket(n, w));
    for (let a = 1; a <= 9; a++) for (let b = 1; a + b <= 10; b++) { add(s.plus(a, b)); add(s.sum(a, b)); }
    for (const p of PETS) add(p.say[lang], Math.round(((PET_PITCH[p.id] || 1.15) - 1.1) * 120));
    for (const [set, f] of Object.entries(SENT[lang])) for (const w of V[set]) add(f(w));
    for (const x of ABC[lang] || []) { add(x[3]); add(x[2]); }
  }
  return out;
}

// ---------- On-screen text ----------
const UI = {
  en:{
    install:"📲 Install app", iosTitle:"📲 Add Momo to your Home Screen", iosSteps:"<li>Tap the <b>Share</b> button <b>⬆️</b> at the bottom (or top) of Safari</li><li>Choose <b>Add to Home Screen ➕</b></li><li>Tap <b>Add</b> — Momo opens like an app, full screen</li>", iosOther:"On iPhone/iPad this works in Safari.", close:"OK",
    ageQ:"How old are you?", ageSub:"We'll set the right difficulty (you can change it later)",
    ageLabel:a=>`${a} years`, kg:{3:"Kindergarten 1",4:"Kindergarten 1–2",5:"Kindergarten 2–3",6:"Kindergarten 3"},
    learn:"I want to learn", pickBuddy:"Pick a buddy to play with!", playWith:n=>`Play with ${n}!`,
    changeBuddy:"Buddy", stickers:"Stickers", parents:"Parents", cleared:(c,n)=>`Cleared ${c}/${n} levels`,
    tip:"Tip for parents: play 10–15 minutes a day and say the words together 💕 · 🔥 = challenge level",
    great:s=>`Great job! +${s} ⭐`, again:"Play again", next:"Next level", home:"Home", allLevels:a=>`🏆 You finished every level for age ${a}! Try the next age?`,
    listenAgain:"Listen again", whoseShadow:"Whose shadow is this?", popThe:"Pop the", matchWords:"Match the picture to the word", findSame:"Find the matching pictures",
    howMany:"How many?", odd:s=>`Which one is not in “${s}”?`, whatNext:"What comes next?", startsWith:w=>`${w} starts with…?`, whichWord:"Which word is it?",
    listenOrder:(n,k)=>`Listen to ${n}, then tap in order (${k} words)`, listen:"Listen", pressSpeak:"Tap and speak", sayThenTap:"Say it, then tap ✔",
    listening:"👂 Listening...", heard:x=>`I heard “${x}”. Try again!`, micFail:"Microphone not available", saidIt:"✔ I said it",
    whichLetter:"Which letter is it?", whichPicture:"Which picture matches?",
    bookTitle:"📒 Sticker book", bookSub:(p,n)=>`One sticker costs ${p} ⭐ · Tap a sticker you own and ${n} will wear it`, buy:p=>`Surprise sticker (${p}⭐)`,
    gate:"For grown-ups", report:"👪 Parent report",
    totals:(s,k,K,w,W)=>`⭐ Total stars <b>${s}</b> · Stickers <b>${k}/${K}</b> · Words practised <b>${w}/${W}</b>`,
    levelsPassed:"Levels cleared", known:"✅ Words learned", practise:"💪 Words to practise", noneKnown:"None yet — keep playing!", noneHard:"No tricky words yet 👍",
    parentTip:"Tip: point at real things at home and ask about the “to practise” words — they'll stick faster. Momo also brings these words back more often.",
    reset:"🗑 Reset this player", confirmReset:"Delete all stars, stickers, levels and stats for this player?",
    who:"Who's playing?", addPlayer:"Add player", namePh:"Child's name", create:"Let's go!", player:n=>`Player ${n}`,
    rename:"Save name", deleteP:"🗑 Delete this player", confirmDelete:n=>`Delete ${n} and all their progress?`,
    restTitle:"Time to rest your eyes! 😴", restSub:"Great playing today. See you tomorrow!", moreTime:"Grown-up: +10 minutes",
    mission:"🎯 Today's mission", missionDone:b=>`Mission complete! +${b} ⭐`,
    settings:"⚙️ Settings", limit:"Daily play time", off:"No limit", minutes:m=>`${m} min`, today:m=>`Played today: ${m} min`,
    bilingual:"Say the Thai word first (bilingual)", music:"Background music",
    offline:"⬇️ Download voices & pictures for offline", offlineDone:"✅ Ready to play offline", downloading:(x,y)=>`Downloading ${x}/${y}…`, offlineFail:"Download failed — check the internet and try again",
    privacy:"🔒 Privacy",
    privacyText:"<li>No sign-up, no ads, no cookies.</li><li>Progress is stored only on this device — nothing is sent to a server.</li><li>The 🎤 game uses the browser's speech recognition; on Chrome/Android the voice is processed by Google. It only listens after the child taps the microphone.</li><li>Pictures and voices are served from this site (no third-party trackers).</li>",
    credits:"Pictures: Twemoji (CC BY 4.0) · Voices: Microsoft neural voices",
    profile:"Player", save:"Save",
  },
  zh:{
    install:"📲 安装应用", iosTitle:"📲 把Momo添加到主屏幕", iosSteps:"<li>点Safari底部(或顶部)的<b>分享</b>按钮 <b>⬆️</b></li><li>选择<b>添加到主屏幕 ➕</b></li><li>点<b>添加</b>,Momo就会像应用一样全屏打开</li>", iosOther:"iPhone/iPad 请使用 Safari。", close:"好的",
    ageQ:"小朋友几岁啦?", ageSub:"选择年龄来调整难度(以后可以更改)",
    ageLabel:a=>`${a}岁`, kg:{3:"幼儿园小班",4:"小班–中班",5:"中班–大班",6:"幼儿园大班"},
    learn:"我想学", pickBuddy:"选一个好朋友一起玩吧!", playWith:n=>`和${n}一起玩!`,
    changeBuddy:"好朋友", stickers:"贴纸", parents:"家长", cleared:(c,n)=>`已完成 ${c}/${n} 关`,
    tip:"家长小贴士:每天玩10–15分钟,和孩子一起说 💕 · 🔥 = 挑战关",
    great:s=>`太棒了! +${s} ⭐`, again:"再玩一次", next:"下一关", home:"首页", allLevels:a=>`🏆 ${a}岁的关卡全部完成!试试下一个年龄吧?`,
    listenAgain:"再听一次", whoseShadow:"这是谁的影子?", popThe:"戳一戳", matchWords:"把图片和词语配对", findSame:"找出一样的图片",
    howMany:"有几个?", odd:s=>`哪个不是“${s}”?`, whatNext:"下一个是什么?", startsWith:()=>"", whichWord:"哪个字是它?",
    listenOrder:(n,k)=>`听${n}说,再按顺序点(${k}个词)`, listen:"听", pressSpeak:"按一下再说", sayThenTap:"说完点 ✔",
    listening:"👂 正在听...", heard:x=>`我听到“${x}”,再试一次!`, micFail:"麦克风不能用", saidIt:"✔ 我说了",
    whichLetter:"是哪个字母?", whichPicture:"哪张图片对?",
    bookTitle:"📒 贴纸本", bookSub:(p,n)=>`一张贴纸 ${p} ⭐ · 点已有的贴纸让${n}戴上`, buy:p=>`抽贴纸 (${p}⭐)`,
    gate:"请家长回答", report:"👪 家长报告",
    totals:(s,k,K,w,W)=>`⭐ 星星 <b>${s}</b> · 贴纸 <b>${k}/${K}</b> · 练过的词 <b>${w}/${W}</b>`,
    levelsPassed:"完成关卡", known:"✅ 已学会的词", practise:"💪 需要多练的词", noneKnown:"还没有——继续加油!", noneHard:"还没有常错的词 👍",
    parentTip:"小贴士:指着家里的真实物品,问问“需要多练”的词,记得更快。游戏也会更常出现这些词。",
    reset:"🗑 清除这个玩家的数据", confirmReset:"确定清除这个玩家的星星、贴纸、关卡和记录吗?",
    who:"谁来玩?", addPlayer:"添加玩家", namePh:"孩子的名字", create:"开始吧!", player:n=>`玩家${n}`,
    rename:"保存名字", deleteP:"🗑 删除这个玩家", confirmDelete:n=>`确定删除${n}和所有进度吗?`,
    restTitle:"该让眼睛休息啦! 😴", restSub:"今天玩得真棒,明天见!", moreTime:"家长:再玩10分钟",
    mission:"🎯 今日任务", missionDone:b=>`任务完成! +${b} ⭐`,
    settings:"⚙️ 设置", limit:"每天游戏时间", off:"不限制", minutes:m=>`${m}分钟`, today:m=>`今天已玩:${m}分钟`,
    bilingual:"先说泰语词(双语模式)", music:"背景音乐",
    offline:"⬇️ 下载声音和图片(离线使用)", offlineDone:"✅ 可以离线玩了", downloading:(x,y)=>`正在下载 ${x}/${y}…`, offlineFail:"下载失败,请检查网络后重试",
    privacy:"🔒 隐私",
    privacyText:"<li>不用注册,没有广告,没有cookie。</li><li>进度只保存在这台设备上,不会上传到服务器。</li><li>🎤游戏使用浏览器的语音识别;在Chrome/安卓上声音由Google处理,只有孩子点麦克风后才会听。</li><li>图片和声音都来自本网站,没有第三方追踪。</li>",
    credits:"图片:Twemoji (CC BY 4.0) · 声音:Microsoft 神经语音",
    profile:"玩家", save:"保存",
  },
  th:{
    install:"📲 ติดตั้งแอป", iosTitle:"📲 เพิ่ม Momo ไว้ที่หน้าจอโฮม", iosSteps:"<li>แตะปุ่ม <b>แชร์</b> <b>⬆️</b> ด้านล่าง (หรือด้านบน) ของ Safari</li><li>เลือก <b>เพิ่มไปยังหน้าจอโฮม ➕</b></li><li>แตะ <b>เพิ่ม</b> แล้ว Momo จะเปิดเต็มจอเหมือนแอป</li>", iosOther:"บน iPhone/iPad ให้เปิดด้วย Safari", close:"ตกลง",
    ageQ:"น้องอายุเท่าไหร่จ๊ะ?", ageSub:"เลือกเพื่อปรับความยากให้พอดี (เปลี่ยนได้ทีหลัง)",
    ageLabel:a=>`${a} ขวบ`, kg:{3:"อนุบาล 1",4:"อนุบาล 1–2",5:"อนุบาล 2–3",6:"อนุบาล 3"},
    learn:"อยากฝึกภาษา", pickBuddy:"เลือกเพื่อนร่วมเล่นกันเลย!", playWith:n=>`ไปเล่นกับ${n}!`,
    changeBuddy:"เปลี่ยนเพื่อน", stickers:"สติกเกอร์", parents:"ผู้ปกครอง", cleared:(c,n)=>`ผ่านแล้ว ${c}/${n} ด่าน`,
    tip:"คำแนะนำผู้ปกครอง: เล่นวันละ 10–15 นาที และพูดตามไปพร้อมกับลูก 💕 · ด่าน 🔥 = ท้าทายขึ้น",
    great:s=>`เก่งมาก! +${s} ⭐`, again:"เล่นอีก", next:"ด่านต่อไป", home:"หน้าแรก", allLevels:a=>`🏆 ผ่านครบทุกด่านของ ${a} ขวบแล้ว! ลองอายุถัดไปดูไหม?`,
    listenAgain:"ฟังอีกครั้ง", whoseShadow:"เงานี้คือใคร?", popThe:"จิ้มลูกโป่ง", matchWords:"จับคู่ภาพกับคำศัพท์", findSame:"หาภาพที่เหมือนกัน",
    howMany:"มีกี่อัน?", odd:s=>`อันไหนไม่ใช่${s}?`, whatNext:"ต่อไปคืออะไร?", startsWith:()=>"", whichWord:"คำไหนคือภาพนี้?",
    listenOrder:(n,k)=>`ฟัง${n} แล้วแตะตามลำดับ (${k} คำ)`, listen:"ฟัง", pressSpeak:"กดแล้วพูด", sayThenTap:"พูดตามแล้วกด ✔",
    listening:"👂 กำลังฟัง...", heard:x=>`ได้ยินว่า "${x}" ลองอีกครั้งนะ`, micFail:"ไมค์ใช้ไม่ได้", saidIt:"✔ พูดแล้ว",
    whichLetter:"ตัวอักษรไหนเอ่ย?", whichPicture:"ภาพไหนตรงกับประโยค?",
    bookTitle:"📒 สมุดสติกเกอร์", bookSub:(p,n)=>`แลกสติกเกอร์ ${p} ⭐ · แตะสติกเกอร์ที่ได้แล้วเพื่อให้${n}ใส่`, buy:p=>`สุ่มสติกเกอร์ (${p}⭐)`,
    gate:"สำหรับผู้ใหญ่", report:"👪 รายงานสำหรับผู้ปกครอง",
    totals:(s,k,K,w,W)=>`⭐ ดาวทั้งหมด <b>${s}</b> · สติกเกอร์ <b>${k}/${K}</b> · ฝึกไปแล้ว <b>${w}/${W}</b> คำ`,
    levelsPassed:"ด่านที่ผ่าน", known:"✅ คำที่รู้แล้ว", practise:"💪 คำที่ควรฝึกเพิ่ม", noneKnown:"ยังไม่มี — เล่นต่ออีกนิดนะ", noneHard:"ยังไม่มีคำที่ผิดบ่อย 👍",
    parentTip:"เคล็ดลับ: ชี้ของจริงในบ้านแล้วถามลูกด้วยคำในกลุ่ม \"ควรฝึกเพิ่ม\" จะจำได้เร็วขึ้น และเกมจะนำคำเหล่านี้กลับมาให้ทวนบ่อยขึ้นด้วย",
    reset:"🗑 ล้างข้อมูลผู้เล่นคนนี้", confirmReset:"ล้างดาว สติกเกอร์ ด่าน และสถิติของผู้เล่นคนนี้ทั้งหมด?",
    who:"ใครจะเล่นจ๊ะ?", addPlayer:"เพิ่มผู้เล่น", namePh:"ชื่อน้อง", create:"ไปเล่นกัน!", player:n=>`ผู้เล่น ${n}`,
    rename:"บันทึกชื่อ", deleteP:"🗑 ลบผู้เล่นคนนี้", confirmDelete:n=>`ลบ ${n} และความคืบหน้าทั้งหมด?`,
    restTitle:"ได้เวลาพักสายตาแล้ว 😴", restSub:"วันนี้เล่นเก่งมาก พรุ่งนี้มาเล่นกันใหม่นะ", moreTime:"ผู้ใหญ่: เล่นต่ออีก 10 นาที",
    mission:"🎯 ภารกิจวันนี้", missionDone:b=>`ภารกิจสำเร็จ! +${b} ⭐`,
    settings:"⚙️ ตั้งค่า", limit:"เวลาเล่นต่อวัน", off:"ไม่จำกัด", minutes:m=>`${m} นาที`, today:m=>`วันนี้เล่นไปแล้ว ${m} นาที`,
    bilingual:"พูดคำภาษาไทยก่อน (โหมดสองภาษา)", music:"เพลงพื้นหลัง",
    offline:"⬇️ ดาวน์โหลดเสียงและรูปไว้เล่นออฟไลน์", offlineDone:"✅ พร้อมเล่นแบบออฟไลน์แล้ว", downloading:(x,y)=>`กำลังดาวน์โหลด ${x}/${y}…`, offlineFail:"ดาวน์โหลดไม่สำเร็จ ตรวจสอบอินเทอร์เน็ตแล้วลองใหม่",
    privacy:"🔒 ความเป็นส่วนตัว",
    privacyText:"<li>ไม่ต้องสมัคร ไม่มีโฆษณา ไม่มีคุกกี้</li><li>ความคืบหน้าเก็บไว้ในเครื่องนี้เท่านั้น ไม่มีการส่งขึ้นเซิร์ฟเวอร์</li><li>เกม 🎤 ใช้ระบบฟังเสียงของเบราว์เซอร์ บน Chrome/Android เสียงจะถูกประมวลผลโดย Google และจะฟังเฉพาะตอนที่น้องกดปุ่มไมค์เท่านั้น</li><li>รูปและเสียงโหลดจากเว็บนี้เอง ไม่มีตัวติดตามของบุคคลที่สาม</li>",
    credits:"รูปภาพ: Twemoji (CC BY 4.0) · เสียง: Microsoft neural voices",
    profile:"ผู้เล่น", save:"บันทึก",
  },
};

// ---------- Flags (inline SVG: flag emoji don't render on Windows) ----------
const star = (cx, cy, r, rot = 0) => { let d = ""; for (let i = 0; i < 10; i++) { const a = rot + Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .382 : r;
  d += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(2) + "," + (cy - rr * Math.sin(a)).toFixed(2); } return d + "Z"; };
const FLAGS = {
  en:`<svg viewBox="0 0 60 30" class="flag"><clipPath id="uk"><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath><rect width="60" height="30" fill="#012169"/><path d="M0,0L60,30M60,0L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0L60,30M60,0L0,30" clip-path="url(#uk)" stroke="#C8102E" stroke-width="4"/><path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/></svg>`,
  zh:`<svg viewBox="0 0 30 20" class="flag"><rect width="30" height="20" fill="#DE2910"/><g fill="#FFDE00"><path d="${star(5,5,3)}"/><path d="${star(10,2,1,.9)}"/><path d="${star(12,4,1,.3)}"/><path d="${star(12,7,1,0)}"/><path d="${star(10,9,1,.9)}"/></g></svg>`,
  th:`<svg viewBox="0 0 30 20" class="flag"><rect width="30" height="20" fill="#A51931"/><rect y="3.33" width="30" height="13.34" fill="#F4F5F8"/><rect y="6.67" width="30" height="6.66" fill="#2D2A4A"/></svg>`,
};
const LANG_NAME = { en: "English", zh: "中文", th: "ภาษาไทย" };
