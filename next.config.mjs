/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ], // Add the domain of the images you want to use in your app (its a security feature of Next.js)
  },
};

export default nextConfig;
