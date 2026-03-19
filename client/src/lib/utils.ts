// ✅ Récupère les deux premières lettres du username
export const getInitials = (username: string): string => {
  return username.charAt(0).toUpperCase();
};

// ✅ Couleur unique par username pour différencier les avatars
export const getAvatarColor = (username: string): string => {
  const colors = [
    'rgba(0, 212, 255, 0.15)',   // cyan
    'rgba(255, 58, 58, 0.15)',   // rouge
    'rgba(168, 85, 247, 0.15)',  // violet
    'rgba(255, 215, 0, 0.15)',   // or
  ];
  // const borderColors = [
  //   '#00d4ff',
  //   '#ff3a3a',
  //   '#a855f7',
  //   '#FFD700',
  // ];
  const index = username.charCodeAt(0) % colors.length;
  return colors[index];
};

export const getAvatarBorder = (username: string): string => {
  const borderColors = [
    '#00d4ff',
    '#ff3a3a',
    '#a855f7',
    '#FFD700',
  ];
  const index = username.charCodeAt(0) % borderColors.length;
  return borderColors[index];
};

export const getInitialColor = (username: string): string => {
  const textColors = [
    '#00d4ff',
    '#ff3a3a',
    '#a855f7',
    '#FFD700',
  ];
  const index = username.charCodeAt(0) % textColors.length;
  return textColors[index];
};