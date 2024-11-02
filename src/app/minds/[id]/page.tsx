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

  const apiExamples = {
    curl: `curl -X POST https://api.memeti.ca/v1/minds/${mind.id}/chat \\
  -H "Authorization: Bearer $MEMETICA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Your message here"}'`,
    
    python: `import requests

response = requests.post(
    f"https://api.memeti.ca/v1/minds/${mind.id}/chat",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    },
    json={"message": "Your message here"}
)

print(response.json())`,
    
    typescript: `const response = await fetch(
    \`https://api.memeti.ca/v1/minds/${mind.id}/chat\`, {
    method: 'POST',
    headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: 'Your message here' })
});

const data = await response.json();`
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <MindHeaderActions mindId={mind.id} />

          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">{mind.name}</h1>
            <p className="text-xl text-gray-400 mb-6 leading-relaxed">{mind.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {mind.metadata.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1.5 text-sm font-medium bg-white/10 text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-white/5 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-400 block mb-1">Model</span>
                <p className="font-medium text-white">{mind.model.name} <span className="text-gray-400 text-sm">v{mind.model.version}</span></p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-400 block mb-1">Creator</span>
                <p className="font-medium text-white">{mind.metadata.creator}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-400 block mb-1">Version</span>
                <p className="font-medium text-white">{mind.version}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-400 block mb-1">Created</span>
                <p className="font-medium text-white">{new Date(mind.metadata.created).toLocaleDateString()}</p>
              </div>
            </div>
          </header>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Specifications</h2>
            <div className="bg-white/5 rounded-lg p-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">System Prompt</h3>
                <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-gray-300 text-sm leading-relaxed">
                  {mind.prompt.system}
                </div>
              </div>
              
              {mind.prompt.initialization && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Initialization</h3>
                  <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-gray-300 text-sm leading-relaxed">
                    {mind.prompt.initialization}
                  </div>
                </div>
              )}
            </div>
          </section>

          {mind.metadata.parentMinds.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Lineage</h2>
              <div className="bg-white/5 rounded-lg p-6">
                <ul className="space-y-2">
                  {mind.metadata.parentMinds.map(parentId => (
                    <li key={parentId} className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <Link 
                        href={`/minds/${parentId}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {parentId}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section id="try-mind-section" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Try this mind</h2>
            <ChatInterface mind={mind} />
          </section>

          <section id="api-section" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white">API Integration</h2>
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-gray-300 mb-6">
                Integrate this mind into your own applications using our API. 
                Get your API key from the <a href="/dashboard" className="text-blue-400 hover:text-blue-300">dashboard</a>.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Endpoint</h3>
                  <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-gray-300 text-sm">
                    POST https://api.memeti.ca/v1/minds/{mind.id}/chat
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Examples</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium mb-2 text-gray-200">cURL</h4>
                      <CodeBlock 
                        code={apiExamples.curl}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2 text-gray-200">Python</h4>
                      <CodeBlock 
                        code={apiExamples.python}
                        language="python"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2 text-gray-200">TypeScript</h4>
                      <CodeBlock 
                        code={apiExamples.typescript}
                        language="typescript"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Response Format</h3>
                  <CodeBlock 
                    code={`{
  "id": "msg_123abc",
  "response": "The assistant's response...",
  "created": "2024-02-19T08:20:15Z",
  "model": {
    "name": "${mind.model.name}",
    "version": "${mind.model.version}"
  }
}`}
                    language="json"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <TryMindFAB />
    </>
  );
} 