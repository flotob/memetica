import { getMinds } from '@/lib/minds';

export default async function TestMindsPage() {
  const minds = await getMinds();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Minds Test Page</h1>
      
      <div className="space-y-4">
        <p className="text-gray-400">
          Loaded {minds.length} minds
        </p>
        
        {minds.map(mind => (
          <div key={mind.id} className="p-4 bg-white/5 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{mind.name}</h2>
            <p className="text-gray-400 mb-2">{mind.description}</p>
            <div className="flex gap-2">
              {mind.metadata.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-sm bg-white/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 