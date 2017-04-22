export default {
  database: {
    url: process.env.DATABASE_URL,
  },
  aws: {
    id: process.env.AWS_ID,
    secret: process.env.AWS_SECRET,
  },
  stripe: {
    secret: process.env.STRIPE_SECRET,
    public: process.env.STRIPE_PUBLIC,
  }
}
