export type Shot = { src: string; alt: string };

/** The practice — interiors, objects, the texture of the room. */
export const practiceShots: Shot[] = [
  { src: "/media/g-window-seat.webp", alt: "A deep window seat with a folded wool throw and a stoneware cup" },
  { src: "/media/g-shelf.webp", alt: "A low oak shelf with worn books, a stoneware vessel and a smooth stone" },
  { src: "/media/g-vase.webp", alt: "A hand-thrown vase holding three stems of dried grass" },
  { src: "/media/g-blanket.webp", alt: "A folded undyed wool blanket in raking window light" },
  { src: "/media/g-handle.webp", alt: "An aged brass door handle patinated by decades of hands" },
  { src: "/media/g-stair.webp", alt: "Worn stone stairs curving upward through a shaft of daylight" },
  { src: "/media/g-kettle.webp", alt: "A cast-iron kettle and two stoneware cups in morning light" },
  { src: "/media/g-chair.webp", alt: "A single low armchair against a warm plaster wall" },
  { src: "/media/entry.webp", alt: "The entry nook — an oak bench, dried botanicals, warm plaster" },
  { src: "/media/room.webp", alt: "The consulting room with two facing armchairs" },
];

/** Grounding — the natural world, texture, scale. */
export const groundingShots: Shot[] = [
  { src: "/media/g-moss.webp", alt: "Moss and lichen across a weathered granite boulder" },
  { src: "/media/g-sand.webp", alt: "Wind-rippled sand forming even parallel ridges" },
  { src: "/media/g-dune.webp", alt: "Pale dune grass bending in a light coastal wind" },
  { src: "/media/g-river.webp", alt: "Ribbons of reflected light across a slow river surface" },
  { src: "/media/g-bark.webp", alt: "Deeply fissured pine bark in low raking light" },
  { src: "/media/g-feather.webp", alt: "A pale feather resting on a smooth dark wet stone" },
  { src: "/media/g-salt.webp", alt: "A vast salt plain mirroring the horizon at dawn" },
  { src: "/media/g-ridges.webp", alt: "Layered hill ridges receding into morning fog" },
  { src: "/media/g-wheat.webp", alt: "Pale wheat moving in a gentle wind under late light" },
  { src: "/media/g-pool.webp", alt: "A shallow rock pool holding a soft reflection of pale sky" },
  { src: "/media/g-snow.webp", alt: "Fresh snow resting along a bare dark branch" },
  { src: "/media/stones.webp", alt: "Seven graduated river stones in a single row on pale sand" },
];

/** Human — warmth, presence, the body. */
export const humanShots: Shot[] = [
  { src: "/media/g-beach-walk.webp", alt: "A figure walking slowly along a wide empty beach at dawn" },
  { src: "/media/g-window-man.webp", alt: "A man seated by a tall window holding a stoneware cup" },
  { src: "/media/g-friends.webp", alt: "Two friends walking side by side on a quiet woodland path" },
  { src: "/media/g-hands-lap.webp", alt: "A pair of hands resting open and still on the lap" },
  { src: "/media/g-writing.webp", alt: "A hand writing in an open notebook in morning light" },
  { src: "/media/g-breath.webp", alt: "A young adult standing outdoors mid-exhale in early light" },
  { src: "/media/g-doorway-figure.webp", alt: "A silhouetted figure standing in a bright open doorway" },
  { src: "/media/g-chest.webp", alt: "A hand resting flat on the centre of the chest" },
  { src: "/media/g-grass-hand.webp", alt: "A hand trailing through tall pale meadow grass" },
  { src: "/media/young-adult.webp", alt: "A young adult seated on a window ledge looking out at daylight" },
  { src: "/media/hands.webp", alt: "Hands cradling a warm stoneware mug" },
];

/** Light — the brand's abstract register. */
export const lightShots: Shot[] = [
  { src: "/media/g-seven-bands.webp", alt: "Seven soft bands of muted colour falling across a plaster wall" },
  { src: "/media/g-prism-edge.webp", alt: "White light entering the edge of a glass prism and beginning to split" },
  { src: "/media/g-curtain-floor.webp", alt: "Sunlight through linen throwing a soft rectangle onto an oak floor" },
  { src: "/media/g-caustic-glass.webp", alt: "A glass of water throwing a warm caustic pattern onto plaster" },
  { src: "/media/g-branch-shadow.webp", alt: "The shadow of a leafy branch cast across a warm plaster wall" },
  { src: "/media/g-rain.webp", alt: "Rain running down an old window pane, the world beyond dissolved" },
  { src: "/media/g-dusk.webp", alt: "A soft gradient sky from slate through amethyst to a bone horizon" },
  { src: "/media/prism.webp", alt: "A prism refracting daylight into seven muted bands" },
  { src: "/media/plaster.webp", alt: "Hand-troweled limewash plaster in raking light" },
  { src: "/media/curtain.webp", alt: "Linen curtain diffusing late morning sunlight" },
];

export const allShots: Shot[] = [
  ...practiceShots,
  ...groundingShots,
  ...humanShots,
  ...lightShots,
];
