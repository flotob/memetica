export interface Mind {
  id: string;
  name: string;
  description: string;
  version: string;
  model: {
    name: string;
    version: string;
  };
  prompt: {
    system: string;
    initialization?: string;
  };
  metadata: {
    creator: string;
    created: string;
    tags: string[];
    parentMinds: string[];
  };
  execution: {
    type: 'chat' | 'video' | 'audio';
    parameters: {
      temperature: number;
      [key: string]: any;
    };
  };
} 