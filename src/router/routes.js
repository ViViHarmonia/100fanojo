const routes = [
  {
    path: "/",
    children: [{ path: "", component: () => import("src/pages/Entrance.vue") }],
  },
  {
    path: "/media/:category",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/MediaGallery.vue") },
    ],
  },
  {
    path: "/character/:characterid",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/CharacterGallery.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
