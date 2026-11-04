// আপলোডের আগে ছবি যাচাই, আর ব্যর্থ হলে আসল কারণ দেখানোর জন্য ছোট helper।
// (Backend-এর নিয়মের সাথে মিল রাখা হয়েছে: JPG/PNG/WEBP/GIF, সর্বোচ্চ 5 MB)

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_MB = 5;

// সমস্যা থাকলে বাংলায় কারণ ফেরত দেয়, ঠিক থাকলে null
export const checkImageFile = (file) => {
  if (!file) return null;
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `শুধু JPG, PNG, WEBP বা GIF ছবি দেওয়া যাবে। এই ফাইলের ধরন: ${file.type || 'অজানা'}`;
  }
  const sizeMb = file.size / (1024 * 1024);
  if (sizeMb > MAX_MB) {
    return `ছবিটি ${sizeMb.toFixed(1)} MB। সর্বোচ্চ ${MAX_MB} MB দেওয়া যাবে, ছোট ছবি দিন।`;
  }
  return null;
};

// axios error থেকে আসল কারণ (Error নম্বরসহ) বের করে
export const uploadErrorMessage = (error) => {
  const res = error?.response;
  if (!res) {
    return 'সার্ভারে পৌঁছানো যায়নি (Network/CORS)। ইন্টারনেট চেক করুন। ঠিক থাকলে cPanel-এ backend চালু আছে কিনা আর FRONTEND_URL-এ এই সাইটের ঠিকানা আছে কিনা দেখুন।';
  }
  const serverMessage = res.data && typeof res.data === 'object' ? res.data.message : '';
  if (res.status === 401) return '(Error 401) Login-এর মেয়াদ শেষ। আবার login করুন।';
  if (res.status === 413) return '(Error 413) ফাইলটি সার্ভারের সীমার চেয়ে বড়। ছোট ছবি দিন।';
  return `(Error ${res.status}) ${serverMessage || 'সার্ভারে সমস্যা হয়েছে।'}`;
};
