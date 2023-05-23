import path from "path"
import fs from "fs"

export async function getPostNames(): Promise<{ id: string }[]> {
  // Read from the /posts directory.
  const postsDirectory = path.join(process.cwd(), 'posts')

  // Get the file names.
  const fileNames = fs.readdirSync(postsDirectory)

  // Return a list of params containing the id for each post.
  const params = fileNames.map(fileName => {
    return {
      id: fileName.replace(/\.mdx$/, '')
    }
  })

  return params;
}

export async function getPostContent(params: { id: string }): Promise<string | null> {
  // Read from the /posts directory.
  const postsDirectory = path.join(process.cwd(), 'posts')

  try {
    const fileName = `${params.id}.mdx`
    const fullPath = path.join(postsDirectory, fileName)

    // Read and parse the file.
    const contents = fs.readFileSync(fullPath, 'utf8')

    return contents;  
  } catch (e) {
    console.log(e)
    return null;
  }
}