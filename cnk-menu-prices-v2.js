/* CHILL N' KNOCK — GUEST MENU DATA ONLY (curated directly from nightlife_venues_research_v2.xlsx).
   Max 3 priced items per category per venue. No 'สอบถามร้าน' cards; no ++.
   Pricing shown here is reference/estimate from the submitted spreadsheet, not checkout totals.
   Photo filenames are shared by menu name across venues. */
(() => {
  const menu = {
  "tic": {
    "sourceName": "Tic Tac Toe (EmSphere)",
    "items": [
      {
        "name": "Break the Ice",
        "priceLabel": "฿ 390",
        "category": "drinks"
      },
      {
        "name": "XO Bowl",
        "priceLabel": "฿ 2,900",
        "category": "drinks"
      },
      {
        "name": "Signature Cocktail",
        "priceLabel": "฿ 390–490",
        "category": "drinks"
      },
      {
        "name": "VIP package เริ่ม",
        "priceLabel": "฿ 19,900",
        "category": "table"
      },
      {
        "name": "ขวดเริ่มประมาณ",
        "priceLabel": "฿ 2,490",
        "category": "bottle"
      }
    ]
  },
  "mil": {
    "sourceName": "Mil Social Club",
    "items": [
      {
        "name": "เบียร์",
        "priceLabel": "฿ 250",
        "category": "drinks"
      },
      {
        "name": "ค็อกเทล",
        "priceLabel": "฿ 400",
        "category": "drinks"
      },
      {
        "name": "อาหาร",
        "priceLabel": "฿ 300–1,000",
        "category": "drinks"
      },
      {
        "name": "Sofa min",
        "priceLabel": "฿ 5,000",
        "category": "table"
      },
      {
        "name": "Regular min",
        "priceLabel": "฿ 10,000",
        "category": "table",
        "note": "+ 2 ขวด หรือ 1 premium bottle"
      },
      {
        "name": "VIP min",
        "priceLabel": "฿ 15,000",
        "category": "table"
      }
    ]
  },
  "upper": {
    "sourceName": "Upper House",
    "items": [
      {
        "name": "Pop My Cherry",
        "priceLabel": "฿ 450",
        "category": "drinks"
      },
      {
        "name": "One for the Road",
        "priceLabel": "฿ 450",
        "category": "drinks"
      },
      {
        "name": "shots x6",
        "priceLabel": "฿ 1,500",
        "category": "drinks"
      },
      {
        "name": "Sofa",
        "priceLabel": "฿ 10,000",
        "category": "table"
      },
      {
        "name": "Balcony",
        "priceLabel": "฿ 13,000",
        "category": "table"
      },
      {
        "name": "Centre/Elevated",
        "priceLabel": "฿ 15,000–25,000",
        "category": "table"
      },
      {
        "name": "JW Gold + mixers",
        "priceLabel": "฿ 8,251",
        "category": "bottle",
        "note": "(4 คน)"
      },
      {
        "name": "budget set",
        "priceLabel": "฿ 7,074",
        "category": "bottle"
      }
    ]
  },
  "what": {
    "sourceName": "What Happened? (EmSphere)",
    "items": [
      {
        "name": "Monkey Shoulder",
        "priceLabel": "฿ 3,900",
        "category": "drinks"
      },
      {
        "name": "Hennessy VSOP",
        "priceLabel": "฿ 5,900",
        "category": "drinks"
      },
      {
        "name": "Grey Goose",
        "priceLabel": "฿ 4,900",
        "category": "drinks"
      },
      {
        "name": "Package เริ่ม",
        "priceLabel": "฿ 12,000–15,000",
        "category": "table"
      },
      {
        "name": "VIP Package",
        "priceLabel": "฿ 28,400–68,000",
        "category": "table"
      }
    ]
  },
  "tderm": {
    "sourceName": "TDERM x 455",
    "items": [
      {
        "name": "ค็อกเทล",
        "priceLabel": "฿ 250–450",
        "category": "drinks"
      },
      {
        "name": "ช็อต",
        "priceLabel": "฿ 120–250",
        "category": "drinks"
      },
      {
        "name": "1 Bottle",
        "priceLabel": "฿ 4,900",
        "category": "bottle"
      },
      {
        "name": "2 Bottles",
        "priceLabel": "฿ 8,900",
        "category": "bottle"
      },
      {
        "name": "Chivas XV 3 ขวด",
        "priceLabel": "฿ 8,900",
        "category": "bottle"
      }
    ]
  },
  "rysh": {
    "sourceName": "RYSH Ratchayothin",
    "items": [
      {
        "name": "JW Black",
        "priceLabel": "฿ 1,999",
        "category": "drinks"
      },
      {
        "name": "JW Gold",
        "priceLabel": "฿ 3,050",
        "category": "drinks"
      },
      {
        "name": "Soju",
        "priceLabel": "฿ 169",
        "category": "drinks"
      },
      {
        "name": "ค่าเปิดขวด",
        "priceLabel": "฿ 500–700",
        "category": "bottle"
      },
      {
        "name": "pourer",
        "priceLabel": "฿ 30",
        "category": "bottle"
      }
    ]
  },
  "chupa": {
    "sourceName": "Chupa BKK",
    "items": [
      {
        "name": "Bee’s Knees",
        "priceLabel": "฿ 380",
        "category": "drinks"
      },
      {
        "name": "Chupa Chup",
        "priceLabel": "฿ 480",
        "category": "drinks"
      },
      {
        "name": "Tropical Punch",
        "priceLabel": "฿ 480",
        "category": "drinks"
      },
      {
        "name": "VIP packages",
        "priceLabel": "฿ 16,500–65,500",
        "category": "table"
      },
      {
        "name": "ขวดสปิริตเริ่ม",
        "priceLabel": "฿ 2,200",
        "category": "bottle"
      },
      {
        "name": "พรีเมียม เช่น Hennessy Paradis",
        "priceLabel": "฿ 92,500",
        "category": "bottle"
      }
    ]
  },
  "truth": {
    "sourceName": "Truth or Dare Langsuan",
    "items": [
      {
        "name": "HAPPY",
        "priceLabel": "฿ 380",
        "category": "drinks"
      },
      {
        "name": "NOT SURE",
        "priceLabel": "฿ 420",
        "category": "drinks"
      },
      {
        "name": "IN LOVE",
        "priceLabel": "฿ 420",
        "category": "drinks"
      }
    ]
  },
  "muin": {
    "sourceName": "MUIN Bangkok",
    "items": [
      {
        "name": "Mojito",
        "priceLabel": "฿ 380",
        "category": "drinks"
      },
      {
        "name": "JW Black Label",
        "priceLabel": "฿ 3,800",
        "category": "drinks"
      },
      {
        "name": "Hennessy VSOP",
        "priceLabel": "฿ 5,800",
        "category": "drinks"
      },
      {
        "name": "โต๊ะเริ่ม min",
        "priceLabel": "฿ 3,000",
        "category": "table"
      },
      {
        "name": "แพ็กเกจใหญ่ เช่น Elon Musk",
        "priceLabel": "฿ 799,000",
        "category": "bottle"
      },
      {
        "name": "Bill Gates Collection",
        "priceLabel": "฿ 458,000",
        "category": "bottle"
      },
      {
        "name": "Don Julio 1942 x3",
        "priceLabel": "฿ 79,000",
        "category": "bottle"
      }
    ]
  },
  "repeat": {
    "sourceName": "Repeat",
    "items": [
      {
        "name": "BUDWEISER (TOWER)",
        "priceLabel": "฿ 950",
        "category": "drinks"
      },
      {
        "name": "CORONA 5 BOTTLE",
        "priceLabel": "฿ 850",
        "category": "drinks"
      },
      {
        "name": "ปีกไก่ทอด",
        "priceLabel": "฿ 149",
        "category": "drinks"
      },
      {
        "name": "ขวด (ประมาณการ)",
        "priceLabel": "฿ 2,000–4,000",
        "category": "bottle"
      }
    ]
  },
  "savoy": {
    "sourceName": "House of Savoy",
    "items": [
      {
        "name": "Classic cocktails",
        "priceLabel": "฿ 450",
        "category": "drinks"
      },
      {
        "name": "JW Gold",
        "priceLabel": "฿ 5,900",
        "category": "drinks"
      },
      {
        "name": "Hennessy VSOP",
        "priceLabel": "฿ 7,000",
        "category": "drinks"
      },
      {
        "name": "Table minimum",
        "priceLabel": "฿ 10,000–20,000",
        "category": "table"
      },
      {
        "name": "JW Gold set",
        "priceLabel": "฿ 8,251",
        "category": "bottle",
        "note": "(4 คน)"
      },
      {
        "name": "budget Maker’s Mark set",
        "priceLabel": "฿ 7,074",
        "category": "bottle"
      }
    ]
  },
  "ratch": {
    "sourceName": "Ratch Hour",
    "items": [
      {
        "name": "Ballantine’s",
        "priceLabel": "฿ 1,490",
        "category": "drinks"
      },
      {
        "name": "Leo x5",
        "priceLabel": "฿ 680",
        "category": "drinks"
      },
      {
        "name": "Corona x6",
        "priceLabel": "฿ 690",
        "category": "drinks"
      },
      {
        "name": "ค่ามัดจำโต๊ะ",
        "priceLabel": "฿ 500",
        "category": "table",
        "note": "หักเข้าบิลวันจอง"
      },
      {
        "name": "Ballantine’s + mixer",
        "priceLabel": "฿ 1,590",
        "category": "bottle"
      },
      {
        "name": "Jack Daniel’s Honey + mixer x5",
        "priceLabel": "฿ 1,690",
        "category": "bottle"
      },
      {
        "name": "มีช็อตเซ็ต เช่น Ratch Hour 6 shots",
        "priceLabel": "฿ 330",
        "category": "bottle"
      }
    ]
  },
  "praao": {
    "sourceName": "Praao",
    "items": [
      {
        "name": "LEO",
        "priceLabel": "฿ 149",
        "category": "drinks"
      },
      {
        "name": "Singha",
        "priceLabel": "฿ 159",
        "category": "drinks"
      },
      {
        "name": "Praao Bucket",
        "priceLabel": "฿ 379",
        "category": "drinks"
      }
    ]
  },
  "thay": {
    "sourceName": "Thay",
    "items": [
      {
        "name": "Jameson Shot",
        "priceLabel": "฿ 150",
        "category": "drinks"
      },
      {
        "name": "Mojito",
        "priceLabel": "฿ 260",
        "category": "drinks"
      },
      {
        "name": "Jameson",
        "priceLabel": "฿ 1,600",
        "category": "drinks"
      }
    ]
  },
  "viral": {
    "sourceName": "Viral Kaset",
    "items": [
      {
        "name": "Singha Beer",
        "priceLabel": "฿ 140",
        "category": "drinks"
      },
      {
        "name": "Leo Beer",
        "priceLabel": "฿ 130",
        "category": "drinks"
      },
      {
        "name": "Jameson",
        "priceLabel": "฿ 1,490",
        "category": "drinks"
      },
      {
        "name": "ขวด (ประมาณการ)",
        "priceLabel": "฿ 1,500–3,500",
        "category": "bottle"
      }
    ]
  },
  "guest": {
    "sourceName": "GuestHouse Kaset",
    "items": [
      {
        "name": "เบียร์ 2 เหยือก",
        "priceLabel": "฿ 400",
        "category": "drinks"
      },
      {
        "name": "ยำมาม่ากุ้งสด",
        "priceLabel": "฿ 180",
        "category": "drinks"
      },
      {
        "name": "ปลาหมึกทอดกระเทียมพริกไทย",
        "priceLabel": "฿ 220",
        "category": "drinks"
      }
    ]
  },
  "mirror": {
    "sourceName": "Mirror Muse",
    "items": [
      {
        "name": "ค็อกเทลพรีเมียม",
        "priceLabel": "฿ 350–600",
        "category": "drinks"
      },
      {
        "name": "ขวด",
        "priceLabel": "฿ 3,000–6,000",
        "category": "drinks"
      },
      {
        "name": "ช็อต",
        "priceLabel": "฿ 150–300",
        "category": "drinks"
      },
      {
        "name": "แพ็กเกจเริ่ม",
        "priceLabel": "฿ 4,000",
        "category": "table"
      }
    ]
  },
  "onyx": {
    "sourceName": "Onyx",
    "items": [
      {
        "name": "JW Black 1L",
        "priceLabel": "฿ 3,300",
        "category": "drinks"
      },
      {
        "name": "JW Gold",
        "priceLabel": "฿ 3,900",
        "category": "drinks"
      },
      {
        "name": "Hennessy VSOP",
        "priceLabel": "฿ 6,500",
        "category": "drinks"
      },
      {
        "name": "Regular",
        "priceLabel": "฿ 5,000",
        "category": "table"
      },
      {
        "name": "Premium",
        "priceLabel": "฿ 9,000",
        "category": "table"
      },
      {
        "name": "VIP",
        "priceLabel": "฿ 20,000",
        "category": "table"
      },
      {
        "name": "Deluxe",
        "priceLabel": "฿ 20,000–24,000",
        "category": "bottle",
        "note": "(2 ขวด + 2 Chandon หรือ 1 Moët)"
      },
      {
        "name": "Premium",
        "priceLabel": "฿ 27,000–30,000",
        "category": "bottle"
      },
      {
        "name": "Luxury",
        "priceLabel": "฿ 50,000",
        "category": "bottle"
      }
    ]
  }
};

  const imageRules = [    
    [/ปีกไก่ทอด/i, "fried-chicken-wings.jpg"],
    [/ยำมาม่ากุ้งสด/i, "yam-mama-shrimp.jpg"],
    [/ปลาหมึกทอดกระเทียมพริกไทย/i, "garlic-squid.jpg"],
    [/hennessy\s*paradis/i, "hennessy-paradis.jpg"],
    [/hennessy\s*vsop/i, "hennessy-vsop.jpg"],
    [/hennessy\s*vs\b/i, "hennessy-vs.jpg"],
    [/(?:\bjw\b|johnnie\s*walker).*black/i, "jw-black.jpg"],
    [/(?:\bjw\b|johnnie\s*walker).*gold|gold\s*label/i, "jw-gold.jpg"],
    [/jack\s*daniel/i, "jack-daniels.jpg"],
    [/monkey\s*shoulder/i, "monkey-shoulder.jpg"],
    [/grey\s*goose/i, "grey-goose.jpg"],
    [/don\s*julio/i, "don-julio.jpg"],
    [/armand\s*de\s*brignac/i, "armand-de-brignac.jpg"],
    [/chandon/i, "chandon.jpg"],
    [/moët|moet/i, "moet.jpg"],
    [/ballantine/i, "ballantines.jpg"],
    [/chivas/i, "chivas.jpg"],
    [/jameson/i, "jameson.jpg"],
    [/regency/i, "regency.jpg"],
    [/sangsom/i, "sangsom.jpg"],
    [/maker.s\s*mark/i, "makers-mark.jpg"],
    [/budweiser/i, "budweiser.jpg"],
    [/corona/i, "corona.jpg"],
    [/leo\b|เลโอ/i, "leo.jpg"],
    [/singha|สิงห์/i, "singha.jpg"],
    [/soju/i, "soju.jpg"],
    [/mojito/i, "mojito.jpg"],
    [/margarita/i, "margarita.jpg"],
    [/red\s*bull\s*vodka/i, "red-bull-vodka.jpg"],
    [/whisky\s*sour/i, "whisky-sour.jpg"],
    [/shots?|ช็อต/i, "shots.jpg"],
    [/bucket|บัคเก็ต|โถแชร์/i, "bucket.jpg"],
    [/beer|เบียร์|bottle.*beer/i, "beer.jpg"],
    [/cocktail|ค็อกเทล|negroni|cosmopolitan|berry|punch|fizz|tropical|ice|heart\s*broken|not\s*sure|in\s*love|tired|happy/i, "cocktail.jpg"],
    [/อาหาร|ของว่าง|ข้าวผัด|สเต็ก|ปีกไก่|ของทอด|ทอด|ปลาหมึก|ของหวาน|ซุป|ยำ/i, "food.jpg"],
  ];

  function photoFor(name, category) {
    const text = String(name || '');
    const found = imageRules.find(([rule]) => rule.test(text));
    const filename = found ? found[1]
      : category === 'table' && /vip|vvip/i.test(text) ? 'vip-table.jpg'
      : category === 'table' ? 'table-package.jpg'
      : category === 'bottle' ? 'bottle-set.jpg'
      : 'drink.jpg';
    return 'assets/menus/' + filename;
  }

  for (const venue of Object.values(menu)) {
    for (const item of venue.items) item.image = photoFor(item.name, item.category);
  }
  window.CNK_MENU_V2 = menu;
})();
