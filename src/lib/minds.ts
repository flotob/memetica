import { Mind } from '@/types/mind';
import { fetchMindsFromGitHub } from './github';
import path from 'path';
import fs from 'fs/promises';
import yaml from 'js-yaml';

export async function getMinds(): Promise<Mind[]> {
  if (process.env.NODE_ENV === 'development') {
    // In development, read local YAML files
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
      
      console.log('Loaded minds from local files:', minds.length);
      return minds;
    } catch (error) {
      console.error('Failed to read local minds:', error);
      return [];
    }
  } else {
    // In production, fetch from GitHub
    try {
      const minds = await fetchMindsFromGitHub();
      console.log('Loaded minds from GitHub:', minds.length);
      return minds;
    } catch (error) {
      console.error('Failed to fetch minds from GitHub:', error);
      return [];
    }
  }
} 