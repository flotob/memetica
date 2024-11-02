import { Octokit } from '@octokit/rest';
import yaml from 'js-yaml';
import { Mind } from '@/types/mind';
import { promises as fs } from 'fs';
import path from 'path';

const hasGitHubConfig = !!(
  process.env.GITHUB_TOKEN &&
  process.env.GITHUB_OWNER &&
  process.env.GITHUB_REPO
);

const octokit = hasGitHubConfig ? new Octokit({
  auth: process.env.GITHUB_TOKEN,
}) : null;

async function getLocalMinds(): Promise<Mind[]> {
  try {
    const mindsDir = path.join(process.cwd(), 'src/data/minds');
    const files = await fs.readdir(mindsDir);
    
    const minds = await Promise.all(
      files
        .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'))
        .map(async file => {
          const content = await fs.readFile(path.join(mindsDir, file), 'utf8');
          return yaml.load(content) as Mind;
        })
    );

    return minds.sort((a, b) => 
      new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime()
    );
  } catch (error) {
    console.error('Error reading local minds:', error);
    return [];
  }
}

async function getGitHubMinds(): Promise<Mind[]> {
  if (!octokit) throw new Error('GitHub client not initialized');

  const { data: files } = await octokit.repos.getContent({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    path: process.env.GITHUB_MINDS_PATH || 'minds',
  });

  if (!Array.isArray(files)) {
    throw new Error('Invalid response format from GitHub');
  }

  const minds = await Promise.all(
    files
      .filter(file => file.name.endsWith('.yaml') || file.name.endsWith('.yml'))
      .map(async file => {
        const { data: content } = await octokit.repos.getContent({
          owner: process.env.GITHUB_OWNER!,
          repo: process.env.GITHUB_REPO!,
          path: file.path,
        });

        if ('content' in content) {
          const decoded = Buffer.from(content.content, 'base64').toString();
          return yaml.load(decoded) as Mind;
        }
        throw new Error(`Invalid content format for file: ${file.path}`);
      })
  );

  return minds.sort((a, b) => 
    new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime()
  );
}

export async function getMinds(): Promise<Mind[]> {
  try {
    return hasGitHubConfig ? await getGitHubMinds() : await getLocalMinds();
  } catch (error) {
    console.error('Error fetching minds:', error);
    // Fallback to local minds if GitHub fails
    return hasGitHubConfig ? await getLocalMinds() : [];
  }
}

export async function getMind(id: string): Promise<Mind | null> {
  try {
    if (hasGitHubConfig) {
      const { data: content } = await octokit!.repos.getContent({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        path: `${process.env.GITHUB_MINDS_PATH || 'minds'}/${id}.yaml`,
      });

      if ('content' in content) {
        const decoded = Buffer.from(content.content, 'base64').toString();
        return yaml.load(decoded) as Mind;
      }
    } else {
      const filePath = path.join(process.cwd(), 'src/data/minds', `${id}.yaml`);
      const content = await fs.readFile(filePath, 'utf8');
      return yaml.load(content) as Mind;
    }
    return null;
  } catch (error) {
    if (hasGitHubConfig) {
      // Fallback to local file if GitHub fails
      try {
        const filePath = path.join(process.cwd(), 'src/data/minds', `${id}.yaml`);
        const content = await fs.readFile(filePath, 'utf8');
        return yaml.load(content) as Mind;
      } catch (localError) {
        return null;
      }
    }
    return null;
  }
}

export async function getLineage(mindId: string): Promise<Mind[]> {
  const mind = await getMind(mindId);
  if (!mind) return [];

  const lineage: Mind[] = [];
  const parentIds = [...mind.metadata.parentMinds];
  
  while (parentIds.length > 0) {
    const parentId = parentIds.shift()!;
    const parent = await getMind(parentId);
    
    if (parent) {
      lineage.push(parent);
      parentIds.push(...parent.metadata.parentMinds);
    }
  }

  return lineage;
}

export async function getMindHistory(id: string): Promise<CommitInfo[]> {
  if (!hasGitHubConfig) {
    // Return mock history for local development
    return [{
      sha: 'local-development',
      message: 'Local development version',
      date: new Date().toISOString(),
      author: {
        name: 'Local Developer',
        email: 'local@developer.com',
      },
    }];
  }

  try {
    const { data: commits } = await octokit!.repos.listCommits({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path: `${process.env.GITHUB_MINDS_PATH || 'minds'}/${id}.yaml`,
    });

    return commits.map(commit => ({
      sha: commit.sha,
      message: commit.commit.message,
      date: commit.commit.author?.date || '',
      author: {
        name: commit.commit.author?.name || '',
        email: commit.commit.author?.email || '',
      },
    }));
  } catch (error) {
    console.error(`Error fetching mind history ${id}:`, error);
    return [];
  }
}

interface CommitInfo {
  sha: string;
  message: string;
  date: string;
  author: {
    name: string;
    email: string;
  };
}

const REPO_OWNER = 'flotob';
const REPO_NAME = 'memetica';
const BASE_URL = 'https://api.github.com';

export async function fetchMindsFromGitHub() {
  // Fetch all files from the src/data/minds directory
  const response = await fetch(
    `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/src/data/minds`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    }
  );

  if (!response.ok) {
    console.error('GitHub API Error:', await response.text());
    throw new Error('Failed to fetch minds from GitHub');
  }

  const files = await response.json();
  
  // Fetch content of each .yaml/.yml file
  const minds = await Promise.all(
    files
      .filter((file: any) => file.name.endsWith('.yaml') || file.name.endsWith('.yml'))
      .map(async (file: any) => {
        const contentResponse = await fetch(file.download_url);
        const yamlContent = await contentResponse.text();
        return yaml.load(yamlContent) as Mind;
      })
  );

  return minds;
}