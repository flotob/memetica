import yaml from 'js-yaml';
import { Mind } from '@/types/mind';

export function parseYAML(content: string): Mind {
  try {
    return yaml.load(content) as Mind;
  } catch (error) {
    console.error('Failed to parse YAML:', error);
    throw new Error('Invalid mind YAML format');
  }
} 