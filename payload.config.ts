import path from "path";
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from "payload/i18n/en";
import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  HeadingFeature,
  IndentFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  //editor: slateEditor({}),
  editor: lexicalEditor(),
  globals: [
    {
      slug: "homepage",
      fields: [
        {
          name: "blockContent",
          type: "blocks",
          blocks: [
            {
              slug: "hero",
              fields: [
                {
                  name: "heading",
                  type: "text",
                },
                {
                  name: "subHeading",
                  type: "text",
                },
                {
                  name: "body",
                  type: "text",
                },
                {
                  name: "buttonText",
                  type: "text",
                },
                {
                  name: "buttonLink",
                  type: "text",
                },
                {
                  name: "cansImage",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "secondHeading",
                  type: "text",
                },
                {
                  name: "secondBody",
                  type: "text",
                },
              ],
            },
            {
              slug: "skyDrive",
              fields: [
                {
                  name: "sentence",
                  type: "text",
                },
                {
                  name: "flavor",
                  type: "select",
                  options: [
                    "lemonLime",
                    "grape",
                    "blackCherry",
                    "strawberryLemonade",
                    "watermelon",
                  ],
                },
              ],
            },
            {
              slug: "carousel",
              fields: [
                {
                  name: "heading",
                  type: "text",
                },
                {
                  name: "price",
                  type: "text",
                },
                {
                  name: "description",
                  type: "text",
                },
              ],
            },
            {
              slug: "textGroupBlock",
              fields: [
                {
                  name: "textGroup",
                  type: "array",
                  fields: [
                    {
                      name: "heading",
                      type: "text",
                    },
                    {
                      name: "subHeading",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              slug: "bigText",
              fields: [
                {
                  name: "title",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  collections: [
    {
      slug: "users",
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
    },
    {
      slug: "pages",
      admin: {
        useAsTitle: "title",
      },
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "content",
          type: "richText",
        },
      ],
    },
    {
      slug: "media",
      upload: true,
      fields: [
        {
          name: "text",
          type: "text",
        },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URI || ''
  //   }
  // }),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en },
  },

  admin: {
    autoLogin: {
      email: "dev@payloadcms.com",
      password: "test",
      prefillOnly: true,
    },
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: "users",
      limit: 1,
    });

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: "dev@payloadcms.com",
          password: "test",
        },
      });
    }
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
});
