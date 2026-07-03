// ============================================================
// MIMI Mahjong – Cat Card Definitions (ScriptableObject analog)
// ============================================================

import { CatCard } from '../types/game';

export const CAT_CARDS: CatCard[] = [
  {
    id: 1,
    name: 'TOUTOU',
    nameKey: 'cat_toutou',
    rarity: 'rare',
    description: 'La petite chatte délicate au grand cœur.',
    descriptionLong:
      'Toutou est la plus petite de la famille, mais ce qu\'elle n\'a pas en taille, elle le compense en charme et en curiosité. Ses grands yeux brillants voient des paires là où personne d\'autre ne regarde.',
    unlockLevel: 10,
    unlockCondition: 'Compléter 10 niveaux',
    isUnlocked: false,
    bonusDescription: '+1 Indice bonus par niveau',
    emoji: '🐱',
    colorPrimary: '#F5F5F5',
    colorSecondary: '#A8A8A8',
    colorAccent: '#D4AF37',
    animationType: 'playful',
  },
  {
    id: 2,
    name: 'HBIBA',
    nameKey: 'cat_hbiba',
    rarity: 'rare',
    description: 'La chatte harmonieuse et apaisante.',
    descriptionLong:
      'Hbiba rayonne d\'une sérénité rare. Son pelage duveteux et ses yeux mi-clos apaisent l\'esprit de quiconque la regarde. Elle accompagne les joueurs dans leurs moments de méditation et de concentration.',
    unlockLevel: 25,
    unlockCondition: 'Compléter 25 niveaux',
    isUnlocked: false,
    bonusDescription: '+1 Annulation bonus par niveau',
    emoji: '😸',
    colorPrimary: '#FFFFFF',
    colorSecondary: '#C9A34E',
    colorAccent: '#E8B88A',
    animationType: 'gentle',
  },
  {
    id: 3,
    name: 'SISSA',
    nameKey: 'cat_sissa',
    rarity: 'rare',
    description: 'La chatte tricolore imposante et chaleureuse.',
    descriptionLong:
      'Sissa est grande, belle et pleine de vie. Sa robe tricolore unique — blanc, noir et orange — fait d\'elle une personnalité incontournable. Son sourire large est aussi contagieux qu\'une brise de printemps.',
    unlockLevel: 40,
    unlockCondition: 'Compléter 40 niveaux',
    isUnlocked: false,
    bonusDescription: '+1 Mélange bonus par niveau',
    emoji: '🐈',
    colorPrimary: '#F5F5F5',
    colorSecondary: '#E07B39',
    colorAccent: '#2C2C2C',
    animationType: 'joyful',
  },
  {
    id: 4,
    name: 'MIMI',
    nameKey: 'cat_mimi',
    rarity: 'legendary',
    description: 'La légendaire. L\'élégante. L\'inégalée.',
    descriptionLong:
      'MIMI est l\'âme du jeu. Chatte tigrée grise d\'une grâce et d\'une intelligence remarquables, elle incarne la perfection du Mahjong Solitaire. Ses yeux dorés semblent lire le plateau avant même que vous n\'y ayez réfléchi.',
    unlockLevel: 150,
    unlockCondition: 'Compléter 150 niveaux ou Mission Légendaire',
    isUnlocked: false,
    bonusDescription: 'Tous les bonus combinés + Indices illimités en mode Relax',
    emoji: '✨',
    colorPrimary: '#808080',
    colorSecondary: '#D4AF37',
    colorAccent: '#3A3A3A',
    animationType: 'graceful',
  },
];

export const CAT_CARD_MAP: Record<number, CatCard> =
  Object.fromEntries(CAT_CARDS.map(c => [c.id, c]));
