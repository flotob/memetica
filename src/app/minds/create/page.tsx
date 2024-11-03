export default function CreateMindPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-card-background border border-border-color rounded-lg p-6">
        <h1 className="text-foreground text-3xl font-bold mb-8">Create a Mind</h1>
        
        <div className="text-text-secondary mb-8">
          Contributing a new mind to Memetica is done through GitHub. Follow these steps to get started.
        </div>

        <div className="space-y-8">
          {/* Quick Start Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-lg text-foreground">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">1</span>
              Fork the repository
            </div>
            <div className="ml-11 bg-card-background border border-border-color rounded-lg p-4 flex items-center justify-between group">
              <code className="text-foreground">git clone https://github.com/flotob/memetica.git</code>
              <button className="text-text-secondary hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                Copy
              </button>
            </div>
          </div>

          {/* File Structure Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-lg text-foreground">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">2</span>
              Create your mind specification
            </div>
            <div className="ml-11 text-text-secondary mb-2">
              Create a new YAML file in <code className="bg-card-background px-2 py-1 rounded">src/data/minds/</code>
            </div>
            <div className="ml-11">
              <div className="bg-card-background border border-border-color rounded-lg">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border-color">
                  <span className="text-foreground">mind-template.yaml</span>
                  <button className="text-text-secondary hover:text-foreground">
                    Copy
                  </button>
                </div>
                <pre className="p-4 text-foreground overflow-x-auto">
                  <code>{`name: Mind Name
description: A detailed description of what this mind does
model:
  name: claude-2  # or gpt-4
  settings:
    temperature: 0.7
    # other model-specific settings
metadata:
  creator: your_username
  tags:
    - tag1
    - tag2
  version: 1.0.0
personality: |
  A detailed description of the mind's personality and behavior.
  This can be multiple lines and will be used as the system prompt.
capabilities:
  - Capability 1
  - Capability 2
limitations:
  - Limitation 1
  - Limitation 2`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Testing Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-lg text-foreground">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">3</span>
              Test your mind
            </div>
            <div className="ml-11">
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ensure consistent behavior with defined personality
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Verify handling of edge cases
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm stated limitations are respected
                </li>
              </ul>
            </div>
          </div>

          {/* Submit Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-lg text-foreground">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm">4</span>
              Submit your mind
            </div>
            <div className="ml-11">
              <a 
                href="https://github.com/flotob/memetica/pulls"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Create Pull Request
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t border-border-color">
          <h2 className="text-lg font-medium text-foreground mb-4">Need help?</h2>
          <div className="flex gap-6 text-text-secondary">
            <a href="https://github.com/flotob/memetica/issues" className="hover:text-foreground transition-colors">
              Open an issue
            </a>
            <a href="https://github.com/flotob/memetica/discussions" className="hover:text-foreground transition-colors">
              Join discussions
            </a>
            <a href="https://github.com/flotob/memetica/tree/main/src/data/minds" className="hover:text-foreground transition-colors">
              View examples
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 