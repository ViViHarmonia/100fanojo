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
  { label: "Black & White", tag: "bw" },
  { label: "Bonus Art", tag: "bonus" },
  { label: "Chibis", tag: "chibi" },
  {
    label: "Design Contest Winners",
    tag: "fan",
    desc: "To celebrate the release of the manga in 2020, 100 Kanojo ran an 'Ideal Girlfriend Search Campaign', and if you were selected as one of the five winners you could receive a signed illustration of your design by Nozawa. To date, these designs have not appeared in the manga, and only three of the five have been found. One of the winners was @oihdhwu39hrk1g on Twitter, but their account has been deleted.",
  },
  { label: "Merchandise/Collab", tag: "colab" },
  { label: "Pajamas", tag: "pj" },
  { label: "Puzzle Game", tag: "puzzle" },
  { label: "Swimsuits", tag: "swim" },
  { label: "Art by Others", tag: "other" },
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
