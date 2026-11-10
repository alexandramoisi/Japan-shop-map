/* Shop data for the Tokyo & Kyoto Shop Map. Pins are approximate. */
var CATS = {
  clothing: { label: "Clothing", v: "--c-clothing" },
  shoes: { label: "Shoes", v: "--c-shoes" },
  issey: { label: "Issey Miyake", v: "--c-issey" },
  second: { label: "Second-hand", v: "--c-second" },
  market: { label: "Markets", v: "--c-market" },
  basics: { label: "Basics & bags", v: "--c-basics" }
};
var STYLES = ["Minimal", "Gorpcore", "Yohji", "yoshiokubo", "Craft"];

// p: [min,max] price tier, null = varies
var SHOPS = [
 // ---- Tokyo clothing
 {id:"t1",city:"tokyo",cat:"clothing",style:["Minimal"],p:[1,1],name:"MUJI Daikanyama (MUJI Labo)",area:"Daikanyama, by the station",why:"First stand-alone MUJI Labo shop: genderless natural-fibre basics, clothes hung from ceiling rings by SANAA.",lat:35.648216,lng:139.701689,src:"https://www.fashionsnap.com/article/2024-10-09/muji-daikanyama-open/"},
 {id:"t2",city:"tokyo",cat:"clothing",style:["Minimal"],p:[1,1],name:"MUJI Ginza",area:"Ginza 3-3-5, Namiki-dori",why:"Global flagship with MUJI Labo and ReMUJI, re-dyed recycled MUJI clothing.",lat:35.673214,lng:139.765368,src:"https://www.gltjp.com/en/directory/item/12911/"},
 {id:"t3",city:"tokyo",cat:"clothing",style:["Minimal"],p:[1,1],name:"fog linen work",area:"Shimokitazawa, 3 min from south-west exit",why:"Easy linen clothing plus homewares in a quiet glass-fronted shop.",lat:35.660284,lng:139.664910,src:"https://co-trip.jp/article/623774/"},
 {id:"t4",city:"tokyo",cat:"clothing",style:["Gorpcore"],p:[1,1],name:"mont-bell Ebisu",area:"Ebis Q Plaza, 1-8-12 Ebisu",why:"Japan's own outdoor brand: real technical shells, down and fleece at everyday prices.",lat:35.647564,lng:139.710014,src:"https://www.timeout.com/tokyo/shopping/mont-bell"},
 {id:"t5",city:"tokyo",cat:"clothing",style:["Minimal"],p:[1,2],name:"nest Robe Omotesando",area:"4-4-8 Jingumae",why:"Linen-focused clothing made in its own Japanese factories.",lat:35.667102,lng:139.711195,src:"https://openers.jp/en/fashion/fashion_news/13642"},
 {id:"t6",city:"tokyo",cat:"clothing",style:["Minimal"],p:[1,2],name:"nest Robe / CONFECT",area:"Shibuya Parco 4F",why:"The linen brand with men's and women's under one roof; tax-free.",lat:35.662048,lng:139.698657,src:"https://en.shibuya.parco.jp/shop/detail/?cd=028017"},
 {id:"t7",city:"tokyo",cat:"clothing",style:["Minimal"],p:[2,2],name:"Yaeca Home Store",area:"Shirokane (residential)",why:"Shop in a house with a café and bookshop; loose made-in-Japan shirts (¥20,900–29,700) and tees (¥7,700).",lat:35.642292,lng:139.728728,src:"https://monocle.com/fashion/retail/yaeca-home-store-tokyo/"},
 {id:"t8",city:"tokyo",cat:"clothing",style:["Minimal"],p:[2,2],name:"evam eva Omotesando",area:"Omotesando",why:"Yamanashi knitwear: fine knits, cashmere, water-twisted linen.",lat:35.667318,lng:139.708569,src:"https://evameva.jp/tag/event/page/2"},
 {id:"t9",city:"tokyo",cat:"clothing",style:["Minimal"],p:[2,2],name:"evam eva Ginza",area:"Matsuya Ginza 5F",why:"Men's and women's knits; a calm shop inside the department store.",lat:35.672082,lng:139.766658,src:"https://evameva.jp/?p=4752"},
 {id:"t10",city:"tokyo",cat:"clothing",style:["Minimal"],p:[2,2],name:"Minotaur Inst.",area:"Miyashita Park South 3F, Shibuya",why:"Japanese-made minimal unisex everyday wear with technical fabrics; tax-free.",lat:35.661791,lng:139.701851,src:"https://mitsui-shopping-park.com/urban/miyashita/store/1568836.html"},
 {id:"t11",city:"tokyo",cat:"clothing",style:["Gorpcore","Minimal"],p:[2,2],name:"nanamica Tokyo",area:"12-8 Uguisudani-cho, Daikanyama",hours:"11:00–20:00",why:"Quiet functional basics: Gore-Tex coats, chinos, knit polos.",lat:35.648699,lng:139.701054,src:"https://www.houyhnhnm.jp/en/news/299641/"},
 {id:"t12",city:"tokyo",cat:"clothing",style:["Gorpcore"],p:[2,3],name:"meanwhile (meanswhile)",area:"Shibuya 1-1-16, Wakakusa Bldg A 4F",hours:"12:00–19:00",why:"meanswhile's flagship, moved here in Nov 2025: utility clothes with clever function details, plus exhibitions.",lat:35.661344,lng:139.706984,src:"https://www.fashionsnap.com/article/2025-11-14/meanwhile/"},
 {id:"t13",city:"tokyo",cat:"clothing",style:["Gorpcore"],p:[2,3],name:"Goldwin Marunouchi",area:"Brick Square 1F, Marunouchi",hours:"11:00–20:00",why:"Japanese ski and outdoor maker; clean technical pieces and the experimental Goldwin 0 line.",lat:35.679067,lng:139.762683,src:"https://about.goldwin.co.jp/eng/news/page-11798"},
 {id:"t14",city:"tokyo",cat:"clothing",style:["Gorpcore"],p:[2,3],name:"Snow Peak Omotesando",area:"6-2-6 Jingumae",why:"The Niigata camping brand's clothing flagship: pieces that go from city to campsite.",lat:35.667590,lng:139.705974,src:"https://deeptokyo.jp/en/?p=7871"},
 {id:"t15",city:"tokyo",cat:"clothing",style:["Gorpcore"],p:[2,3],name:"Snow Peak LAND STATION TOKYO",area:"KITTE 4F, by Tokyo Station",hours:"11:00–20:00",why:"Biggest Snow Peak in Tokyo, with gear, a café and Tokyo-only items.",lat:35.679502,lng:139.765124,src:"https://cdn.gltjp.com/en/directory/item/15531"},
 {id:"t16",city:"tokyo",cat:"clothing",style:["Gorpcore"],p:[3,3],name:"and wander Marunouchi",area:"Shin-Tokyo Bldg 1F, 3-3-1 Marunouchi",why:"Founded by two ex-Issey Miyake designers; precise technical wear. Coats around ¥77,000, small bags ¥9,900.",lat:35.677534,lng:139.762249,src:"https://www.houyhnhnm.jp/en/news/405109/"},
 {id:"t17",city:"tokyo",cat:"clothing",style:["Yohji"],p:[3,3],name:"Ground Y Shibuya Parco",area:"Shibuya Parco",why:"Yohji Yamamoto's genderless, one-size line: the most accessible Yohji.",lat:35.662148,lng:139.698857,src:"https://theshopyohjiyamamoto.com/blogs/news/gyshoes"},
 {id:"t18",city:"tokyo",cat:"clothing",style:["Yohji"],p:[3,3],name:"Ground Y Ginza Six",area:"Ginza Six 4F",why:"Ground Y in Ginza, a few minutes from the Uniqlo and Issey flagships.",lat:35.669769,lng:139.764176,src:"https://theshopyohjiyamamoto.com/blogs/news/gyshoes"},
 {id:"t19",city:"tokyo",cat:"clothing",style:["Yohji"],p:[3,3],name:"Y's Omotesando",area:"Omotesando Hills 1F/B1F",why:"Yohji's own label in a large two-floor shop.",lat:35.667287,lng:139.708616,src:"https://theshopyohjiyamamoto.com/blogs/news/gy-taro-okamoto-clb"},
 {id:"t20",city:"tokyo",cat:"clothing",style:["Minimal"],p:[3,3],name:"Graphpaper Tokyo",area:"Yoyogi",why:"Boxy, precise made-in-Japan cuts in a gallery-like shop.",lat:35.681250,lng:139.693231,src:"https://monocle.com/travel-guides/tokyo/shopping/"},
 {id:"t21",city:"tokyo",cat:"clothing",style:["Minimal"],p:[3,3],name:"Auralee",area:"Minami-Aoyama, near the Nezu Museum",why:"The benchmark for fabric-led Japanese minimalism.",lat:35.661158,lng:139.716411,src:"https://monocle.com/fashion/retail/japanese-clothing-brands-to-know-and-love/"},
 {id:"t22",city:"tokyo",cat:"clothing",style:["Minimal"],p:[3,3],name:"Kaptain Sunshine",area:"Minami-Aoyama 5-18-10",hours:"12:00–20:00, closed Mon",why:"Refined, washable smart-casual, mainly menswear; flagship opened March 2025.",lat:35.660029,lng:139.713783,src:"https://www.fashionsnap.com/article/2025-02-28/kaptain-sunshine-flagship-store/"},
 // ---- Tokyo shoes
 {id:"t47",city:"tokyo",cat:"clothing",style:["yoshiokubo"],p:[2,3],name:"LOVELESS Aoyama",area:"Minami-Aoyama 3-16-1, near Omotesando Station A4",why:"Select shop that stocks both yoshiokubo (men) and muller of yoshiokubo (women): precise patterns, gathers and technical fabrics. Tees ¥18–26k, trousers ¥28–42k, jackets ¥75k+. Pin approximate.",lat:35.664900,lng:139.713800,src:"https://mullerofyoshiokubo.jp/pages/stockist"},
 {id:"t48",city:"tokyo",cat:"clothing",style:["yoshiokubo"],p:[2,3],name:"PARIGOT Ginza (Ginza Six)",area:"Ginza Six 4F",why:"Carries muller of yoshiokubo and sells yoshio kubo online; same floor as Ground Y.",lat:35.669669,lng:139.764076,src:"https://www.parigot.jp/c/brand/yoshiokubo"},
 {id:"t49",city:"tokyo",cat:"clothing",style:["yoshiokubo"],p:[2,3],name:"KEY TIMEZ Womens Omotesando",area:"Omotesando Hills B1F",why:"Stocks muller of yoshiokubo; one floor from Y's.",lat:35.667287,lng:139.708736,src:"https://mullerofyoshiokubo.jp/pages/stockist"},
 {id:"t23",city:"tokyo",cat:"shoes",style:["Minimal"],p:[1,1],name:"Moonstar Jiyugaoka",area:"Jiyugaoka",why:"Kurume maker since 1873; ‘Fine Vulcanized’ canvas sneakers, slip-ons and rain-proof high-tops.",lat:35.608820,lng:139.666856,src:"https://www.timeout.com/tokyo/shopping/best-places-to-buy-elevated-wardrobe-staples-in-tokyo"},
 {id:"t24",city:"tokyo",cat:"shoes",style:["Minimal"],p:[2,2],name:"Spingle Ginza",area:"Ginza 3-4-17",hours:"11:00–19:00, open daily",why:"Hand-made Hiroshima leather sneakers with the wrapped-up sole; flagship-only models.",lat:35.673082,lng:139.765752,src:"https://en.spingle.jp/blogs/news/spingle-ginza-open"},
 {id:"t25",city:"tokyo",cat:"shoes",style:["Minimal"],p:[2,2],name:"Spingle Harajuku",area:"6-18-3 Jingumae",why:"Second Spingle shop, between Shibuya and Harajuku.",lat:35.664565,lng:139.702991,src:"https://matcha-jp.com/en/place-master/16274"},
 {id:"t26",city:"tokyo",cat:"shoes",style:["Craft"],p:[2,2],name:"Hender Scheme sukima Kappabashi",area:"Motoasakusa 4-2-10",hours:"12:00–19:00, closed Mon",why:"Near their workshop; small leather goods (cheaper entry point) and name engraving.",lat:35.709695,lng:139.787545,src:"https://www.fashion-headline.com/article/19670"},
 {id:"t27",city:"tokyo",cat:"shoes",style:["Craft"],p:[2,2],name:"toe to knee",area:"Asakusabashi 3-5-1",why:"One artisan's soft, simple leather shoes and one-piece leather slippers.",lat:35.700557,lng:139.785591,src:"https://deeptokyo.jp/en/?p=11326"},
 {id:"t28",city:"tokyo",cat:"shoes",style:["Craft"],p:[2,3],name:"Hender Scheme sukima Ebisu",area:"Ebisu 2-17-20",why:"Full line of vegetable-tanned leather shoes, loafers and bags over two floors.",lat:35.647031,lng:139.719065,src:"https://www.houyhnhnm.jp/en/news/8571/"},
 // ---- Tokyo Issey
 {id:"t29",city:"tokyo",cat:"issey",style:[],p:[3,3],name:"Issey Miyake Ginza / 442",area:"Ginza 4-4-2",hours:"11:00–20:00",why:"The biggest Issey shop: Issey Miyake, IM Men, Pleats Please, Homme Plissé, A-POC ABLE, Bao Bao.",lat:35.672331,lng:139.765273,src:"https://www.houyhnhnm.jp/en/news/672394/"},
 {id:"t30",city:"tokyo",cat:"issey",style:[],p:[2,3],name:"Issey Miyake Ginza / 445",area:"Ginza 4-4-5",hours:"11:00–20:00",why:"The smaller lines: 132 5., me Issey Miyake and HaaT.",lat:35.672043,lng:139.765046,src:"https://superfuture.com/2023/02/new-shops/tokyo-issey-miyake-ginza-store-opening"},
 {id:"t31",city:"tokyo",cat:"issey",style:[],p:[3,3],name:"Homme Plissé Aoyama",area:"Minami-Aoyama 3-18-14",why:"Men's pleats flagship with a working pleating machine.",lat:35.664771,lng:139.713323,src:"https://www.wallpaper.com/fashion/issey-miyake-homme-plisse-store-tokyo"},
 {id:"t32",city:"tokyo",cat:"issey",style:[],p:[3,3],name:"Pleats Please Aoyama",area:"Minami-Aoyama, Miyuki-dori",why:"Women's pleats flagship; moved into a new three-floor building in Oct 2025.",lat:35.663093,lng:139.715504,src:"https://driftzine.com/the-art-of-lightness-pleats-please-issey-miyake-arrives-in-aoyama/"},
 {id:"t33",city:"tokyo",cat:"issey",style:[],p:[3,3],name:"Homme Plissé Daikanyama",area:"Daikanyama",why:"Fewer crowds and a better Homme Plissé selection than Aoyama.",lat:35.648696,lng:139.700848,src:"https://www.tokyoweekender.com/?p=262225"},
 // ---- Tokyo second-hand
 {id:"t34",city:"tokyo",cat:"second",style:[],p:null,name:"RAGTAG Harajuku",area:"Cat Street, 6-14-2 Jingumae",hours:"11:00–20:00",why:"Three floors of designer resale, strong on Issey, Yohji and Comme des Garçons; every piece graded A–D.",lat:35.665757,lng:139.705218,src:"https://www.tokyoweekender.com/?p=130659"},
 {id:"t35",city:"tokyo",cat:"second",style:[],p:null,name:"RAGTAG Shimokitazawa",area:"Shimokitazawa",why:"Good for Issey and Sacai; pairs with fog linen work.",lat:35.663027,lng:139.668476,src:"https://www.timeout.com/tokyo/shopping/how-and-where-to-sell-your-second-hand-and-used-clothing-in-tokyo"},
 {id:"t36",city:"tokyo",cat:"second",style:[],p:null,name:"Kindal Harajuku",area:"Harajuku",why:"Big designer consignment shop with a sizable Japanese-label section.",lat:35.668262,lng:139.706521,src:"https://www.timeout.com/tokyo/shopping/kindal-harajuku"},
 {id:"t37",city:"tokyo",cat:"second",style:[],p:null,name:"2nd Street Shibuya",area:"Shibuya",why:"Japan's biggest resale chain: cheaper and more mixed, with whole sections for Issey pleats.",lat:35.661358,lng:139.701052,src:"https://lifestyleasia-onemega.com/style/the-fashion-tourists-guide-to-tokyo-cool/"},
 // ---- Tokyo markets
 {id:"t38",city:"tokyo",cat:"market",style:[],p:null,name:"Oedo Antique Market",area:"Tokyo International Forum, Yurakucho",hours:"9:00–16:00, cancelled in rain",why:"Japan's largest outdoor antique market, about 250 dealers.",lat:35.676743,lng:139.763753,dates:["2026-11-23","2026-12-12","2026-12-20","2027-01-09","2027-01-17","2027-02-07","2027-02-21","2027-03-21","2027-03-28"],src:"https://www.antique-market.jp/english"},
 {id:"t39",city:"tokyo",cat:"market",style:[],p:null,name:"Setagaya Boro-ichi",area:"Setagaya 1-chome",hours:"9:00–20:00",why:"440-year-old street market with about 700 stalls; used clothing, antiques, food.",lat:35.641664,lng:139.648054,dates:["2026-12-15","2026-12-16","2027-01-15","2027-01-16"],src:"https://www.iwafu.com/en/events/1169730"},
 // ---- Tokyo basics & bags
 {id:"t40",city:"tokyo",cat:"basics",style:[],p:[1,1],name:"GU Ginza",area:"Ginza 5-7-7",hours:"11:00–21:00",why:"Uniqlo's cheaper, more fashion-led sister brand, five floors.",lat:35.670881,lng:139.764263,src:"https://www.timeout.com/tokyo/shopping/gu-ginza"},
 {id:"t41",city:"tokyo",cat:"basics",style:[],p:[1,1],name:"GU Marronnier Gate Ginza",area:"Marronnier Gate Ginza 2, 5F",hours:"11:00–21:00",why:"Second GU flagship, in the same building as Uniqlo Tokyo.",lat:35.673805,lng:139.765052,src:"https://jw-webmagazine.com/?p=278836"},
 {id:"t42",city:"tokyo",cat:"basics",style:["Minimal"],p:[1,1],name:"Uniqlo Ginza",area:"Ginza 6-9-5, Chuo-dori",hours:"11:00–21:00",why:"The biggest Uniqlo: 12 floors, the most complete range.",lat:35.670245,lng:139.763469,src:"https://www.timeout.com/tokyo/shopping/uniqlo-ginza"},
 {id:"t43",city:"tokyo",cat:"basics",style:["Minimal"],p:[1,1],name:"Uniqlo Tokyo",area:"Marronnier Gate Ginza 2, 1–4F",hours:"11:00–21:00",why:"Second Ginza flagship, designed by Herzog & de Meuron.",lat:35.673664,lng:139.765228,src:"https://japantravel.navitime.com/en/area/jp/guide/NTJnews0337-en/"},
 {id:"t44",city:"tokyo",cat:"basics",style:[],p:[2,2],name:"Porter Omotesando",area:"5-6-8 Jingumae, on a backstreet",hours:"12:00–20:00",why:"Porter's first flagship, styled like a hotel lobby, with craftspeople working in-store.",lat:35.666006,lng:139.709015,src:"https://deeptokyo.jp/en/?p=3906"},
 {id:"t45",city:"tokyo",cat:"basics",style:[],p:[2,2],name:"Porter Tokyo",area:"Tokyo Midtown Yaesu 1F",why:"Newest Porter flagship: full range plus a gallery for collaborations.",lat:35.679408,lng:139.768931,src:"https://www.timeout.com/tokyo/shopping/porter"},
 {id:"t46",city:"tokyo",cat:"basics",style:[],p:[2,2],name:"Porter Exchange Shibuya",area:"Shibuya Parco 1F",why:"All about the classic Tanker nylon bag, including shop-only versions; tax-free.",lat:35.661948,lng:139.698857,src:"https://deeptokyo.jp/en/?p=3746"},

 // ---- Kyoto clothing
 {id:"k1",city:"kyoto",cat:"clothing",style:["Minimal"],p:[1,1],name:"MUJI Kyoto BAL",area:"Kyoto BAL 5F, Kawaramachi-Sanjo",hours:"11:00–20:00",why:"The MUJI Labo line in Kyoto.",lat:35.007037,lng:135.769529,src:"https://www.muji.com/jp/ja/shop/detail/061717"},
 {id:"k2",city:"kyoto",cat:"clothing",style:["Gorpcore"],p:[1,1],name:"mont-bell Kyoto Ekimae",area:"South side of Kyoto Station (Hachijo exit)",why:"Japan's own outdoor brand at everyday prices; handy on arrival or departure.",lat:34.982445,lng:135.755051,src:"https://yamahack.com/1347"},
 {id:"k3",city:"kyoto",cat:"clothing",style:["Minimal"],p:[1,2],name:"nest Robe Kyoto",area:"Central Kyoto, near Sanjo · tel. 075-254-4500",why:"The linen brand's Kyoto shop. Confirm the address on nestrobe.com.",lat:35.008556,lng:135.762144,src:"https://www.houyhnhnm.jp/en/news/102052/"},
 {id:"k4",city:"kyoto",cat:"clothing",style:["Minimal"],p:[2,2],name:"evam eva Kyoto",area:"Yanaginobanba-dori, 100 Aburaya-cho",why:"Small shop for soft knits and dresses in whites and creams.",lat:35.008939,lng:135.764152,src:"https://indagare.com/shop/evam-eva"},
 {id:"k5",city:"kyoto",cat:"clothing",style:["Gorpcore","Minimal"],p:[2,2],name:"nanamica Kyoto",area:"647 Tearaimizu-cho, Shijo-Karasuma",hours:"11:00–19:00",why:"Opened April 2025; functional basics and Kyoto-only items.",lat:35.005982,lng:135.759839,src:"https://us.nanamica.com/blogs/journal/nanamica-launches-a-new-store-in-kyoto"},
 {id:"k6",city:"kyoto",cat:"clothing",style:["Minimal"],p:[2,2],name:"Minotaur Inst. Kyoto",area:"Yanaginobanba / Takoyakushi",hours:"13:00–20:00, mainly weekends",why:"Minimal unisex wear; a modern samue jacket made with a Kyoto temple. Check opening days first.",lat:35.006141,lng:135.763918,src:"https://openers.jp/en/fashion/fashion_news/K5aC3"},
 {id:"k7",city:"kyoto",cat:"clothing",style:["Gorpcore"],p:[2,3],name:"Goldwin Kyoto",area:"460 Sakai-cho, Nakagyo",hours:"Weekdays 12:00–19:00, weekends 11:00–19:00",why:"Space by Hiroshi Sugimoto's New Material Research Laboratory; full Goldwin 0 line and a Vibram-soled zori (¥63,800).",lat:35.006797,lng:135.765881,src:"https://www.fashion-headline.com/article/453825"},
 {id:"k8",city:"kyoto",cat:"clothing",style:["Gorpcore"],p:[2,3],name:"Snow Peak LAND STATION Arashiyama",area:"Arashiyama, 4 min from Saga-Arashiyama Station",hours:"10:00–19:00, closed 3rd Wed",why:"Shop and café in a renovated Taisho-era building. Pair with the bamboo grove.",lat:35.016891,lng:135.681318,src:"https://leafkyoto.net/en/store/210225_snow_peak_land_station"},
 {id:"k9",city:"kyoto",cat:"clothing",style:["Minimal"],p:[2,3],name:"1LDK Kyoto",area:"Shinpuhkan 1F, Karasuma-Oike",hours:"11:00–20:00",why:"Select shop for quiet Japanese labels; Beams Japan and John Smedley in the same building.",lat:35.009325,lng:135.759793,src:"https://www.fashion-press.net/maps/56162"},
 {id:"k10",city:"kyoto",cat:"clothing",style:["Gorpcore"],p:[3,3],name:"and wander Kyoto BAL",area:"Kyoto BAL 3F, Kawaramachi-Sanjo",why:"Opened Nov 2025; the brand's only own shop in Kyoto. Coats around ¥77,000, small bags ¥9,900.",lat:35.006837,lng:135.769529,src:"https://www.fashionsnap.com/article/2025-10-25/and-wander-kyoto-bal/"},
 {id:"k11",city:"kyoto",cat:"clothing",style:["Yohji"],p:[3,3],name:"FASCINATE Kyoto",area:"Gokomachi, 416-5 Dainichi-cho",why:"Kyoto stockist of Y's for men and Ground Y.",lat:35.004337,lng:135.766079,src:"https://fascinate-online.com/english/brand/ground-y"},
 {id:"k12",city:"kyoto",cat:"clothing",style:["Minimal"],p:[3,3],name:"Graphpaper Kyoto",area:"Rokkaku-dori / Tomikoji",hours:"12:00–20:00, closed Wed",why:"Townhouse with a small garden and tatami room; made-in-Japan cuts plus Kyoto-only pieces.",lat:35.007417,lng:135.765245,src:"https://www.houyhnhnm.jp/en/feature/360471"},
 // ---- Kyoto shoes
 {id:"k25",city:"kyoto",cat:"clothing",style:["yoshiokubo"],p:[2,3],name:"Kyoto Takashimaya",area:"Shijo-Kawaramachi · style&edit 3F, CASE STUDY 4F",why:"muller of yoshiokubo at style&edit (3F); the men's line was listed at CASE STUDY (4F) in 2022, so ask.",lat:35.003477,lng:135.768639,src:"https://mullerofyoshiokubo.jp/pages/stockist"},
 {id:"k26",city:"kyoto",cat:"clothing",style:["yoshiokubo"],p:[2,3],name:"DRESSTERIOR Kyoto BAL",area:"Kyoto BAL 4F, Kawaramachi-Sanjo",why:"Stocks muller of yoshiokubo, one floor above and wander.",lat:35.006937,lng:135.769650,src:"https://mullerofyoshiokubo.jp/pages/stockist"},
 {id:"k13",city:"kyoto",cat:"shoes",style:["Craft"],p:[1,2],name:"SOU・SOU Tabi",area:"Shinkyogoku side streets, near Nishiki Market",why:"Japan-made jika-tabi, new shop since July 2026. Bonded-sole tabi ¥12,870, leather ¥44,900. Ask for plain colours.",lat:35.004376,lng:135.768144,src:"https://haveagood-holiday.com/en/articles/sou-sou-tabi-kyoto-relocation-renewal-opening"},
 {id:"k14",city:"kyoto",cat:"shoes",style:["Craft"],p:[2,2],name:"Gion Naito",area:"Gion",why:"Hand-made zori sandals, traditional and modern, made to fit.",lat:35.002353,lng:135.772736,src:"https://highsnobiety.com/p/gion-naito-interview"},
 {id:"k15",city:"kyoto",cat:"shoes",style:["Craft"],p:[2,2],name:"Hakimono Sekizuka",area:"Iwakura, north Kyoto (Iwakura AA)",why:"A young craftsman's hand-made zori in a former timber warehouse; a destination trip.",lat:35.072102,lng:135.798271,src:"https://monocle.com/fashion/handmade-japanese-zouri-sandals-kyoto/"},
 {id:"k16",city:"kyoto",cat:"shoes",style:["Minimal"],p:[3,3],name:"OWN Kyoto",area:"10-17 Kyomachi, Fushimi",hours:"11:00–19:00, closed Wed–Thu",why:"Custom leather shoes from ¥50,000, 50+ leathers to choose from.",lat:34.944696,lng:135.765231,src:"https://www.leafkyoto.net/en/?p=148888"},
 // ---- Kyoto Issey
 {id:"k17",city:"kyoto",cat:"issey",style:[],p:[3,3],name:"Issey Miyake Kyoto",area:"89 Tsuchiya-cho, Yanaginobanba south of Sanjo",hours:"11:00–20:00",why:"132-year-old townhouse redesigned by Naoto Fukasawa, gallery in the storehouse; men's lines and Bao Bao, Pleats Please upstairs.",lat:35.007997,lng:135.763915,src:"https://insidekyoto.com/issey-miyake-kyoto"},
 {id:"k18",city:"kyoto",cat:"issey",style:[],p:[3,3],name:"HaaT Kyoto",area:"Aneyakoji-dori, 569 Kikuya-cho",why:"Issey's textile line in a former sugar shop, made with Kyoto craftspeople.",lat:35.009964,lng:135.764417,src:"https://www.wallpaper.com/fashion-beauty/kyoto-haat-issey-miyake-store"},
 // ---- Kyoto second-hand
 {id:"k19",city:"kyoto",cat:"second",style:[],p:null,name:"Kindal Kyoto",area:"Kawaramachi",why:"Kyoto's Kindal; strongest on designer bags and accessories.",lat:35.005366,lng:135.766658,src:"https://livejapan.com/en/in-kansai/in-pref-osaka/in-umeda_osaka-station_kitashinchi/article-a2000829"},
 // ---- Kyoto markets
 {id:"k20",city:"kyoto",cat:"market",style:[],p:null,name:"Kobo-san market",area:"Toji Temple, one stop from Kyoto Station",hours:"Early morning to afternoon",why:"Kyoto's biggest: 1,000+ stalls, vintage kimono and fabric, crafts. Still runs, smaller, in rain.",lat:34.980339,lng:135.747693,monthly:21,src:"https://kyoto.travel/en/news/flea_market_latest"},
 {id:"k21",city:"kyoto",cat:"market",style:[],p:null,name:"Tenjin-san market",area:"Kitano Tenmangu Shrine",hours:"7:00–16:00",why:"Antiques and vintage kimono in a shrine setting.",lat:35.031174,lng:135.735123,monthly:25,src:"https://kyoto.travel/en/news/20240129_Flea_Markets_in_Kyoto"},
 // ---- Kyoto basics & bags
 {id:"k22",city:"kyoto",cat:"basics",style:["Minimal"],p:[1,1],name:"Uniqlo Kyoto",area:"Kawaramachi-Sanjo",why:"Kyoto's first global flagship, opened 6 Nov 2026; Kyoto-only prints and an embroidery service.",lat:35.007862,lng:135.768760,src:"https://www.haveagood-holiday.com/en/articles/uniqlo-kyoto-yasaka-utme-re-uniqlo-studio-collaboration"},
 {id:"k23",city:"kyoto",cat:"basics",style:[],p:[2,2],name:"Porter Exchange Kyoto",area:"Higashiyama, near Ninenzaka and Kodai-ji",why:"Opened Oct 2025 with a moss courtyard; Tanker and Kyoto-only PX Tanker.",lat:34.998534,lng:135.780736,src:"https://www.fashion-press.net/maps/71091"},
 {id:"k24",city:"kyoto",cat:"basics",style:[],p:[2,2],name:"Porter Stand Kyoto",area:"Kiyomizu 2-222, Higashiyama",why:"Smaller shop on the way up to Kiyomizu-dera.",lat:34.996390,lng:135.780942,src:"https://www.fashion-press.net/maps/55683"}
];

var ROUTES = {
  tokyo: [
    {id:"r-t1",name:"Day 1 · Daikanyama, Ebisu, Shirokane",note:"Quiet backstreets; finish with a taxi to Yaeca.",stops:["t1","t33","t11","t4","t28","t7"]},
    {id:"r-t2",name:"Day 2 · Shibuya, Harajuku, Aoyama",note:"The big day: gorpcore and Yohji in Shibuya, resale on Cat Street, Issey and Auralee in Aoyama.",stops:["t12","t37","t10","t6","t17","t46","t25","t14","t34","t36","t19","t49","t5","t8","t44","t31","t32","t47","t22","t21"]},
    {id:"r-t3",name:"Half day · Marunouchi and Ginza",note:"Add the Oedo Antique Market on market days.",stops:["t45","t15","t13","t16","t38","t2","t43","t41","t24","t30","t29","t9","t40","t42","t18","t48"]},
    {id:"r-t4",name:"Short trips",note:"Shimokitazawa, Jiyugaoka and the east side each make an easy half day.",stops:["t3","t35","t23","t26","t27"]}
  ],
  kyoto: [
    {id:"r-k1",name:"Downtown walk",note:"Almost everything within 15 minutes on foot between Oike, Karasuma and Kawaramachi.",stops:["k9","k18","k17","k4","k7","k12","k6","k5","k11","k13","k19","k25","k1","k10","k26","k22"]},
    {id:"r-k2",name:"Higashiyama",note:"Combine with Kiyomizu-dera and Gion.",stops:["k14","k23","k24"]},
    {id:"r-k3",name:"Further out",note:"Pair each with sightseeing: Arashiyama bamboo grove, Toji, Kitano Tenmangu, Fushimi.",stops:["k2","k20","k21","k8","k16"]}
  ]
};

var AREAS = {
  tokyo: [
    {id:"all",label:"All Tokyo"},
    {id:"ginza",label:"Ginza & Marunouchi",b:[35.6665,35.6820,139.7590,139.7720]},
    {id:"aoyama",label:"Harajuku & Aoyama",b:[35.6590,35.6720,139.6990,139.7200]},
    {id:"shibuya",label:"Shibuya & Ebisu",b:[35.6400,35.6650,139.6940,139.7290]}
  ],
  kyoto: [
    {id:"all",label:"All Kyoto"},
    {id:"down",label:"Downtown",b:[35.0030,35.0115,135.7570,135.7720]},
    {id:"east",label:"Gion & Higashiyama",b:[34.9940,35.0080,135.7660,135.7860]}
  ]
};
