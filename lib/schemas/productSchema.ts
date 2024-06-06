import { z } from "zod";

const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

const ReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
  reviewerName: z.string(),
  reviewerEmail: z.string().email(),
});

const VariantSchema = z.object({
  color: z.array(z.string()).optional(),
  size: z.array(z.string()).optional(),
  capacity: z.array(z.number()).optional(),
  weight: z.array(z.number()).optional(),
});

const MetaSchema = z.object({
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
  barcode: z.string(),
  qrCode: z.string().url(),
});

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string(),
  sku: z.string(),
  weight: z.number(),
  dimensions: DimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(ReviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: MetaSchema,
  variant: VariantSchema.optional(),
  images: z.array(z.string().url()),
  thumbnail: z.string().url(),
  prices: z.array(z.number()).optional(),
});

type Product = z.infer<typeof ProductSchema>;

export { type Product, ProductSchema };
