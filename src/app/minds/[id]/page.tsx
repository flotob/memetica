import { getMind } from '@/lib/github';
import { ChatInterface } from '@/components/ChatInterface';
import { notFound } from 'next/navigation';
import { MindStats } from '@/components/MindStats';
import Link from 'next/link';
import { TryMindFAB } from '@/components/TryMindFAB';
import { CodeBlock } from '@/components/CodeBlock';
import { MindHeaderActions } from '@/components/MindHeaderActions';

interface MindDetailsProps {
  params: {
    id: string;
  };
}

export default async function MindDetails({ params }: MindDetailsProps) {
  const mind = await getMind(params.id);
  
  if (!mind) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/minds" 
            className="inline-flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors"
          >
            ← Back to Minds
          </Link>
          
          <div className="flex items-center gap-2">
            <Link
              href="#try-mind-section"
              className="text-text-secondary hover:text-foreground transition-colors"
            >
              Try this mind
            </Link>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              API Docs
            </button>
          </div>
        </div>

        <h1 className="text-foreground text-3xl font-bold mb-4">Research Assistant</h1>
        <p className="text-text-secondary text-lg mb-6">
          A specialized mind for academic research, literature review, and hypothesis formation across scientific disciplines.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {['research', 'scientific', 'academic'].map(tag => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full bg-tag-background text-tag-text text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-card-background border border-border-color rounded-lg mb-8">
          <div>
            <span className="text-sm font-medium text-text-secondary block mb-1">Model</span>
            <p className="font-medium text-foreground">claude-2</p>
          </div>
          <div>
            <span className="text-sm font-medium text-text-secondary block mb-1">Creator</span>
            <p className="font-medium text-foreground">scientist_101</p>
          </div>
          <div>
            <span className="text-sm font-medium text-text-secondary block mb-1">Version</span>
            <p className="font-medium text-foreground">1.0.0</p>
          </div>
          <div>
            <span className="text-sm font-medium text-text-secondary block mb-1">Created</span>
            <p className="font-medium text-foreground">19.2.2024</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-foreground text-2xl font-bold mb-6">Specifications</h2>
          
          <div className="mb-6">
            <h3 className="text-foreground text-xl font-semibold mb-4">System Prompt</h3>
            <div className="bg-card-background border border-border-color rounded-lg p-4 font-mono text-text-secondary">
              {mind.prompt.system}
            </div>
          </div>
        </div>

        <section id="try-mind-section" className="mb-8">
          <h2 className="text-foreground text-2xl font-bold mb-6">Try this mind</h2>
          <div className="bg-card-background border border-border-color rounded-lg">
            <ChatInterface mind={mind} />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground text-2xl font-bold mb-6">API Integration</h2>
          
          <p className="text-text-secondary mb-6">
            Integrate this mind into your own applications using our API. Get your API key from the{' '}
            <Link href="/dashboard" className="text-blue-500 hover:text-blue-600 transition-colors">
              dashboard
            </Link>.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-foreground text-xl font-semibold mb-4">Endpoint</h3>
              <div className="bg-card-background border border-border-color rounded-lg p-4 font-mono text-text-secondary">
                POST https://api.memeti.ca/v1/minds/{mind.id}/chat
              </div>
            </div>

            <div>
              <h3 className="text-foreground text-xl font-semibold mb-4">Examples</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-foreground text-lg font-medium mb-2">cURL</h4>
                  <div className="bg-card-background border border-border-color rounded-lg p-4 font-mono text-text-secondary whitespace-pre-wrap">
                    {`curl -X POST https://api.memeti.ca/v1/minds/mind-005/chat \\
  -H "Authorization: Bearer <MEMETICA_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Your message here"}'`}
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground text-lg font-medium mb-2">Python</h4>
                  <div className="bg-card-background border border-border-color rounded-lg p-4 font-mono text-text-secondary whitespace-pre-wrap">
                    {`import requests

response = requests.post(
    "https://api.memeti.ca/v1/minds/mind-005/chat",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    },
    json={"message": "Your message here"}
)
print(response.json())`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 