import { ref } from "vue";
export const sections = [
  { label: "Color Pages", tag: "color" },
  { label: "Covers/Backs", tag: "cover" },
  { label: "Date Artwork", tag: "date" },
  { label: "Character Sheets", tag: "sheet" },
  { label: "Sketches", tag: "sketch" },
  { label: "Anime Art", tag: "anime" },
  { label: "Promo Art", tag: "promo" },
  { label: "B-Day Art", tag: "bday" },
  { label: "Black & White", tag: "b&w" },
  { label: "Light Novel", tag: "light" },
  { label: "Bonus Art", tag: "bonus" },
  { label: "Chibis", tag: "chibi" },
  {
    label: "Design Contest Winners",
    tag: "fan",
    desc: "To celebrate the release of the manga in 2020, 100 Kanojo ran an 'Ideal Girlfriend Search Campaign', and if you were selected as one of the five winners you could receive a signed illustration of your design by Nozawa. To date, these designs have not appeared in the manga, and only three of the five have been found. One of the winners was @oihdhwu39hrk1g on Twitter, but their account has been deleted.",
  },
  { label: "Merchandise/Collab", tag: "colab" },
  { label: "Pajamas", tag: "pj" },
  { label: "Puzzle Game", tag: "game" },
  { label: "Swimsuits", tag: "swim" },
  { label: "Art by Others", tag: "other" },
];
export const subAnimeArts = [
  { label: "Season Covers", subtag: "base", desc: "" },
  { label: "Promo Arts", subtag: "promo", desc: "" },
  { label: "Baby Designs", subtag: "baby", desc: "" },
];
export const otherArtists = [
  {
    label: "Chet Art",
    desc: "One of the directors on the 100 Kanojo Anime staff",
    subtag: "chet",
  },
  { label: "Imomushi", desc: "The artist behind the outros", subtag: "imo" },
  {
    label: "Yano Akane",
    desc: "Character designer and chief animation director for the anime. Also voice actor for the rooftop cat.",
    subtag: "yano",
  },
  {
    label: "Ryu Ikuko",
    desc: "One of the illustrators on the 100 Kanojo anime staff.",
    subtag: "ryu",
  },
  {
    label: "Yanagita Rikao",
    desc: "Illustrations from the 100 kanojo x kuso kagaku dokuhan collab",
    subtag: "rikao",
  },
  { label: "Other Artists", desc: "", subtag: "etc" },
];
export const birthdayStuffs = [
  { label: "Banner", subtag: "banner", desc: "" },
  { label: "Icon", subtag: "icon", desc: "" },
]
export const chibiTypes = [
  { label: "Manga", subtag: "manga", desc: "" },
  { label: "Anime", subtag: "anime", desc: "" },
  { label: "Young Jump App", subtag: "jump", desc: "" },
]
export const dateVersions = [
  { label: "Manga", subtag: "manga", desc: "" },
  { label: "Anime", subtag: "anime", desc: "" },
  { label: "Matching Outfits", subtag: "match", desc: "" },
]
export const merchCollabEvents = [
  { label: "Don Quijote Pop Up Shop", subtag: "quijote", desc: "" },
  { label: "Dash Store (Xmas)", subtag: "xmas", desc: "" },
  { label: "Shinjuku Marui Men Pop Up Shop", subtag: "choco", desc: "" },
  { label: "cafe&bar MENU", subtag: "cafe", desc: "" },
  { label: "Tsutaya Pop Up Shop", subtag: "bunny", desc: "" },
  { label: "Web Kuji", subtag: "web", desc: "" },
  { label: "Web Kuji 2: Sweet Dream Party", subtag: "web2", desc: "" },
  { label: "Karaoke no Tetsujin", subtag: "band", desc: "" },
  { label: "Love for Family", subtag: "family", desc: "" },
  { label: "Animega x Sofmap Senkou Hanbai Fair", subtag: "animega", desc: "" },
  { label: "100 Kanojo x Sumie Shop", subtag: "sumie", desc: "" },
  { label: "AMOCAFE", subtag: "tea", desc: "" },
  { label: "Rebirth For You/Reバース for you", subtag: "re", desc: "" },
  { label: "Union Arena Card Set", subtag: "union", desc: "" },
]
export const promoArts = [
  { label: "Blu-Ray", subtag: "bluray", desc: "" },
  { label: "Characters (Anime Official Design)", subtag: "design", desc: "" },
  { label: "Characters (Anime Promotional)", subtag: "anipromo", desc: "" },
  { label: "Coaster ", subtag: "coaster", desc: "" },
  { label: "Kimono", subtag: "kimono", desc: "" },
  { label: "Soundtrack", subtag: "soundtrack", desc: "" },
  { label: "Image Song CD", subtag: "karaoke", desc: "" },
  { label: "Outfits", subtag: "sample", desc: "" },
  { label: "Others", subtag: "other", desc: "" },
]
export const gameEvents = [
  { label: "Promo Artwork", subtag: "promo", desc: "" },
  { label: "Main Char. Sprites", subtag: "main", desc: "" },
  { label: "MC Sprites (Easter Event)", subtag: "easter", desc: "" },
  { label: "MC Sprites (Lovezono Event)", subtag: "lovezono", desc: "" },
  { label: "MC Sprites (Cheerleader Event)", subtag: "cheer", desc: "" },
  { label: "Side Char. Sprites", subtag: "extras", desc: "" },
]
export const sheetKinds = [
  { label: "Concepts/Sheets", subtag: "char", desc: "" },
  { label: "Chibi+Side Chars.", subtag: "extra", desc: "" },
  { label: "Chapter Outfits", subtag: "outfits", desc: "" },
]

