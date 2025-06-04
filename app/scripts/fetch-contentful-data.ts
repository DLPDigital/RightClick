/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */

const contentful = require("contentful")
const { mapContentfulEntry } = require("../utils/mapContentfulEntry.ts")
const fs = require("fs")
const path = require("path")
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") })

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master"
const HASHTAGS_ENTRY = process.env.CONTENTFUL_HASHTAGS_ENTRY
const SUBJECTS_ENTRY = process.env.CONTENTFUL_SUBJECTS_ENTRY

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  environment: ENVIRONMENT,
})

const OUTPUT_DIR = path.resolve(process.cwd(), "app", "data", "generated")
const SUBJECTS_FILE = path.join(OUTPUT_DIR, "subjects.ts")
const VERBS_FILE = path.join(OUTPUT_DIR, "verbCategories.ts")
const TARGETS_FILE = path.join(OUTPUT_DIR, "targetCategories.ts")
const TARGETS_GROUP_FILE = path.join(OUTPUT_DIR, "targetGroups.ts")
const HASHTAGS_FILE = path.join(OUTPUT_DIR, "hashtags.ts")

async function fetchAndSaveData() {
  if (!SPACE_ID || !ACCESS_TOKEN || !HASHTAGS_ENTRY || !SUBJECTS_ENTRY) {
    console.error("Error: One or more critical Contentful environment variables are missing.")
    console.error(
      "Required: CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HASHTAGS_ENTRY, CONTENTFUL_SUBJECTS_ENTRY"
    )
    process.exit(1)
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  try {
    console.log("--------------------")
    console.log("Fetching Game Hashtags from Contentful...")
    const hashtagEntries = await client.getEntry(HASHTAGS_ENTRY)
    const mappedHashtags = mapContentfulEntry(hashtagEntries)
    const hashtagsData = JSON.stringify(mappedHashtags.postHashtags, null, 2)
    const hashtagsString = `export const POST_HASHTAGS: string[] = ${hashtagsData}`

    fs.writeFileSync(HASHTAGS_FILE, hashtagsString)
    console.log(
      `Successfully wrote ${mappedHashtags.postHashtags.length} hashtags to ${HASHTAGS_FILE}`
    )

    console.log("--------------------")
    console.log("Fetching subjects data from Contentful...")
    const subjectEntries = await client.getEntry(SUBJECTS_ENTRY)
    const mappedSubjects = mapContentfulEntry(subjectEntries)
    const { singleSubjects, pluralSubjects } = mappedSubjects
    const singleData = singleSubjects.map((item: string) => {
      return {
        name: item,
        plural: false,
      }
    })
    const pluralData = pluralSubjects.map((item: string) => {
      return {
        name: item,
        plural: true,
      }
    })

    const allSubjects = [...singleData, ...pluralData]
    const allSubjectsString = JSON.stringify(allSubjects, null, 2)

    const subjectsString =
      `import { PostSubject } from "../../types"\n\n` +
      `export const POST_SUBJECTS: PostSubject[] = ${allSubjectsString}\n`

    fs.writeFileSync(SUBJECTS_FILE, subjectsString)
    console.log(`Successfully wrote ${allSubjects.length} hashtags to ${SUBJECTS_FILE}`)

    console.log("--------------------")
    console.log("Fetching targets grouping data from Contentful...")
    const targetGroups = await client.getEntries({
      content_type: "rightClickerPostTargetGroups",
      limit: 100,
    })
    if (targetGroups?.items && targetGroups?.items.length > 0) {
      const mappedTargetGroups = targetGroups.items.reduce(
        (acc: Record<string, any[]>, item: any) => {
          const map = mapContentfulEntry(item)
          acc[map.groupId] = map.groups
          return acc
        },
        {}
      )
      const targetsString =
        `import { TargetCategoryType, VerbCategoryType } from "../../types"\n\n` +
        `export const verbTargetCompatibility: Record<VerbCategoryType, TargetCategoryType[]> = ${JSON.stringify(mappedTargetGroups, null, 2)}`
      fs.writeFileSync(TARGETS_GROUP_FILE, targetsString)
      console.log(
        `Successfully wrote ${Object.keys(mappedTargetGroups).length} target groups to ${TARGETS_GROUP_FILE}`
      )
    }

    console.log("--------------------")
    console.log("Fetching targets data from Contentful...")
    const targets = await client.getEntries({
      content_type: "rightClickerPostTargets",
      limit: 100,
    })
    if (targets?.items && targets?.items.length > 0) {
      const mappedTargets = targets.items.map((item: any) => {
        const mapTarget = mapContentfulEntry(item)
        return {
          type: mapTarget.targetId,
          targets: mapTarget.targets,
        }
      })
      const mappedTargetsString =
        `import { PostTargets } from "../../types"\n\n` +
        `export const POST_TARGETS: PostTargets[] = ${JSON.stringify(mappedTargets, null, 2)}`
      fs.writeFileSync(TARGETS_FILE, mappedTargetsString)
      console.log(
        `Successfully wrote ${Object.keys(mappedTargets).length} targets to ${TARGETS_FILE}`
      )
    }

    console.log("--------------------")
    console.log("Fetching verbs data from Contentful...")
    const verbs = await client.getEntries({
      content_type: "rightClickerPostVerbs",
      limit: 100,
    })
    if (verbs?.items && verbs?.items.length > 0) {
      const mappedVerbs = verbs.items.map((item: any) => {
        const mapVerb = mapContentfulEntry(item)
        return {
          type: mapVerb.type,
          verbs: mapVerb.verbs,
        }
      })
      const mappedVerbsString =
        `import { PostVerbs } from "../../types"\n\n` +
        `export const POST_VERBS: PostVerbs[] = ${JSON.stringify(mappedVerbs, null, 2)}`

      fs.writeFileSync(VERBS_FILE, mappedVerbsString)
      console.log(`Successfully wrote ${Object.keys(mappedVerbs).length} targets to ${VERBS_FILE}`)
    }

    console.log("--------------------")
    console.log("All game data fetched and saved successfully!")
  } catch (error) {
    console.error("Error fetching data from Contentful:", error)
    process.exit(1) // Exit with error to fail the build if needed
  }
}

fetchAndSaveData()
