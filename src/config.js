// Backend (API) এর ঠিকানা এক জায়গায় রাখা হলো।
// লোকালে: .env ফাইল না থাকলে http://localhost:5000 ব্যবহার হয়।
// লাইভে: .env.production ফাইলের VITE_API_URL ব্যবহার হয় (npm run build করার সময়)।
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

// ডাটাবেসে ছবির ঠিকানা কয়েক রকমভাবে আছে:
//   "act_123.png", "uploads/123.png", "uploads\\123.png",
//   অথবা পুরনো "http://localhost:5000/uploads/123.png"।
// এই function সবগুলোকে বর্তমান server-এর সঠিক ঠিকানায় বদলে দেয়।
export const mediaUrl = (path) => {
  if (!path) return '';

  const legacy = path.match(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/(.*)$/);
  if (legacy) return `${API_URL}/${legacy[3]}`;

  if (/^https?:\/\//.test(path)) return path;

  const clean = path.replace(/\\/g, '/').replace(/^\/+/, '');
  return clean.startsWith('uploads/') ? `${API_URL}/${clean}` : `${API_URL}/uploads/${clean}`;
};
