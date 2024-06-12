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

// VariantSchema with support for various shapes
const VariantObjectSchema = z.object({
  color: z
    .union([z.string(), z.object({ id: z.string(), color: z.string() })])
    .nullable(),
  size: z
    .union([z.string(), z.object({ id: z.string(), size: z.string() })])
    .nullable(),
  productId: z.number().optional(),
});

const VariantArraySchema = z.array(
  z.object({
    color: z.object({ id: z.string(), color: z.string() }),
    size: z.object({ id: z.string(), size: z.string() }),
    productId: z.number(),
  })
);

const CurrentSchema = z.union([
  z.null(),
  z.string(),
  z.object({
    color: z
      .union([z.string(), z.object({ id: z.string(), color: z.string() })])
      .nullable(),
    size: z
      .union([z.string(), z.object({ id: z.string(), size: z.string() })])
      .nullable(),
    productId: z.union([z.number(), z.string()]),
  }),
]);

const VariantSchema = z.union([VariantObjectSchema, VariantArraySchema]);

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
  // variantInfo: z.union([VariantSchema, z.array(VariantSchema)]).optional(),
  variantInfo: VariantSchema.optional(),
  images: z.array(z.string().url()),
  thumbnail: z.string().url(),
  prices: z.array(z.number()).optional(),
  current: CurrentSchema,
  currentPrice: z.number().optional()
});

export type Product = z.infer<typeof ProductSchema>;

export { ProductSchema };
