// ── Agent UX/UI Comparison Data ──
// Features × Tools matrix with screenshot mappings

const AGENT_UX_TOOLS = [
  { id: 'Bolt',    name: 'Bolt' },
  { id: 'Builder', name: 'Builder' },
  { id: 'Claude',  name: 'Claude' },
  { id: 'Codex',   name: 'Codex' },
  { id: 'Cursor',  name: 'Cursor' },
  { id: 'Lovable', name: 'Lovable' },
  { id: 'Replit',  name: 'Replit' },
  { id: 'Vercel',  name: 'Vercel' },
  { id: 'VS Code', name: 'VS Code' },
];

const AGENT_UX_FEATURES = [
  { id: 'user-chat',       name: 'User Chat',         icon: '💬' },
  { id: 'insert',          name: 'Insert',             icon: '➕' },
  { id: 'thinking',        name: 'Thinking',           icon: '🧠' },
  { id: 'planning',        name: 'Planning',           icon: '📋' },
  { id: 'clarification',   name: 'Clarification Questions', icon: '❓' },
  { id: 'todo-progress',   name: 'Todo / Progress',    icon: '✅' },
  { id: 'working',         name: 'Working',            icon: '⚙️' },
  { id: 'reading-file',    name: 'Reading File',       icon: '📖' },
  { id: 'writing-code',    name: 'Writing Code',       icon: '✍️' },
  { id: 'user-approval',   name: 'User Approval',      icon: '🔐' },
  { id: 'completed',       name: 'Completed',          icon: '🏁' },
  { id: 'copy',            name: 'Copy',               icon: '📋' },
  { id: 'preview',         name: 'Preview',            icon: '👁️' },
  { id: 'error-handling',  name: 'Error Handling',     icon: '🚨' },
  { id: 'visual-edits',    name: 'Visual Edits',       icon: '🎨' },
  { id: 'feedback',        name: 'Feedback',           icon: '💡' },
  { id: 'multi-mode',      name: 'Multi-Mode',         icon: '🔀' },
  { id: 'speech-to-text',  name: 'Speech to Text',     icon: '🎙️' },
  { id: 'token-management',name: 'Token Management',   icon: '🪙' },
  { id: 'llm-model-selection', name: 'LLM Model Selection', icon: '🤖' },
  { id: 'starting-prompt',     name: 'Starting Prompt',      icon: '🚀' },
];

// Video filenames per tool
const AGENT_UX_VIDEOS = {
  'Bolt':    'Bolt.mp4',
  'Builder': 'Builder.mp4',
  'Claude':  'Claude.mp4',
  'Codex':   'Codex.mp4',
  'Cursor':  'Cursor.mp4',
  'Lovable': 'Lovable.mp4',
  'Replit':  'Replit.mp4',
  'Vercel':  'Vercel V0.mp4',
  'VS Code': 'VS Code.mp4',
};

// Status: "YES" | "LIMITED" | "NO"
// Screenshots: array of filenames (inside AI Agent UI/<ToolId>/)
const AGENT_UX_MATRIX = {
  // ── Bolt ──
  'Bolt': {
    'user-chat':       { status: 'YES', screenshots: ['1. User chat.png'] },
    'insert':          { status: 'YES', screenshots: ['20. Insert - 1.png', '21. Insert - 2.png', '22. Insert - 3.png'] },
    'thinking':        { status: 'YES', screenshots: ['2. Thinking - 1.png', '3. Thinking - 2.png'] },
    'planning':        { status: 'YES', screenshots: ['4. Plan - 1.png', '5. Plan - 2.png', '6. Plan - 3.png', '7. Plan - 4.png', '8. Plan - 5.png', '9. Plan - 6.png'] },
    'todo-progress':   { status: 'NO',  screenshots: [] },
    'working':         { status: 'NO',  screenshots: [] },
    'reading-file':    { status: 'YES', screenshots: ['17. Reading File.png'] },
    'writing-code':    { status: 'NO',  screenshots: [] },
    'user-approval':   { status: 'NO',  screenshots: [] },
    'completed':       { status: 'YES', screenshots: ['10. Completed - 1.png', '11. Completed - 2.png'] },
    'copy':            { status: 'YES', screenshots: ['18. Copy - 1.png', '19. Copy - 2.png'] },
    'preview':         { status: 'YES', screenshots: ['12. Preview.png'] },
    'error-handling':  { status: 'NO',  screenshots: [] },
    'visual-edits':    { status: 'YES', screenshots: ['16. Visual Edits.png'] },
    'clarification':   { status: 'NO',  screenshots: [] },
    'feedback':        { status: 'NO',  screenshots: [] },
    'multi-mode':      { status: 'YES', screenshots: ['14. Multi-Mode - 1.png', '15. Multi-Mode - 2.png'] },
    'speech-to-text':  { status: 'NO',  screenshots: [] },
    'token-management':{ status: 'YES', screenshots: ['13. Token Management - 1.png', '13. Token Management - 2.png'] },
    'llm-model-selection': { status: 'YES', screenshots: [], note: 'Model switching available with 5 options:<ul><li>Claude Haiku 4.5</li><li>Sonnet 4.5 (default)</li><li>Sonnet 4.6</li><li>Opus 4.5</li><li>Opus 4.6</li></ul>' },
    'starting-prompt':     { status: 'YES', screenshots: ['screenshots/bolt-starting-prompt-1.png', 'screenshots/bolt-starting-prompt-2.png', 'screenshots/bolt-starting-prompt-3.png', 'screenshots/bolt-starting-prompt-4.png', 'screenshots/bolt-starting-prompt-5.png', 'screenshots/bolt-starting-prompt-6.png', 'screenshots/bolt-starting-prompt-7.png'] },
  },

  // ── Builder ──
  'Builder': {
    'user-chat':       { status: 'YES', screenshots: ['2. User chat.png', '4. User chat - 2.png'] },
    'insert':          { status: 'YES', screenshots: ['32. Insert - 1.png', '33. Insert - 2.png', '34. Insert - 3.png', '35. Insert - 4.png'] },
    'thinking':        { status: 'YES', screenshots: ['5. Thinking - 1.png', '8. Thinking - 2.png', '15. Thinking - 4.png'] },
    'planning':        { status: 'YES', screenshots: ['6. Planning - 1.png'] },
    'todo-progress':   { status: 'YES', screenshots: ['7. Todo List - 1.png', '10. Todo List - 2.png', '12. Todo List - 3.png'] },
    'working':         { status: 'YES', screenshots: ['1. Creating project.png', '3. Working - 1.png', '9. Working - 2.png', '11. Working - 3.png', '13. Working - 4.png', '14. Working - 5.png'] },
    'reading-file':    { status: 'YES', screenshots: ['28. Reading File - 1.png', '29. Reading File - 2.png', '30. Reading File - 3.png'] },
    'writing-code':    { status: 'NO',  screenshots: [] },
    'user-approval':   { status: 'NO',  screenshots: [] },
    'completed':       { status: 'YES', screenshots: ['16. Completed - 1.png', '17. Completed - 2.png'] },
    'copy':            { status: 'YES', screenshots: ['31. Copy.png'] },
    'preview':         { status: 'YES', screenshots: ['21. Preview.png'] },
    'error-handling':  { status: 'YES', screenshots: ['18. Error - 1.png', '19. Error - 2.png', '20. Error - 3.png'] },
    'visual-edits':    { status: 'YES', screenshots: ['22. Visual Edits.png'] },
    'clarification':   { status: 'NO',  screenshots: [] },
    'feedback':        { status: 'YES', screenshots: ['Builder - Feedback 1.png', 'Builder - Feedback 2.png'] },
    'multi-mode':      { status: 'YES', screenshots: ['23. Multi-Mode - 1.png', '24. Multi-Mode - 2.png', '25. Multi-Mode - 3.png'] },
    'speech-to-text':  { status: 'NO',  screenshots: [] },
    'token-management':{ status: 'YES', screenshots: ['26. Token Management - 1.png', '27. Token Management - 2.png'] },
    'llm-model-selection': { status: 'NO', screenshots: [], note: 'Uses its own proprietary model routing (Visual Copilot). Enterprise plans may offer model configuration but not documented as user-facing choice.' },
    'starting-prompt':     { status: 'YES', screenshots: ['screenshots/builder-starting-prompt-1.png', 'screenshots/builder-starting-prompt-2.png', 'screenshots/builder-starting-prompt-3.png', 'screenshots/builder-starting-prompt-4.png', 'screenshots/builder-starting-prompt-5.png', 'screenshots/builder-starting-prompt-6.png', 'screenshots/builder-starting-prompt-7.png', 'screenshots/builder-starting-prompt-8.png'] },
  },

  // ── Claude ──
  'Claude': {
    'user-chat':       { status: 'YES', screenshots: ['1. User Chat - 1.png'] },
    'insert':          { status: 'YES', screenshots: ['18. Insert - 1.png', '19. Insert - 2.png'] },
    'thinking':        { status: 'NO',  screenshots: [] },
    'planning':        { status: 'YES', screenshots: ['3. Planning - 1.png'] },
    'todo-progress':   { status: 'NO',  screenshots: [] },
    'working':         { status: 'YES', screenshots: ['2. Working - 1.png', '4. Working - 2.png', '5. Working - 3.png'] },
    'reading-file':    { status: 'NO',  screenshots: [] },
    'writing-code':    { status: 'NO',  screenshots: [] },
    'user-approval':   { status: 'NO',  screenshots: [] },
    'completed':       { status: 'YES', screenshots: ['8. Completed - 1.png', '9. Completed - 2.png'] },
    'copy':            { status: 'YES', screenshots: ['12. Copy - 1.png', '13. Copy - 2.png', '14. Copy - 3.png', '15. Copy - 4.png', '16. Copy - 5.png', '17. Copy - 6.png'] },
    'preview':         { status: 'YES', screenshots: ['6. Open Preview.png', '7. Open Preview - 2.png'] },
    'error-handling':  { status: 'NO',  screenshots: [] },
    'visual-edits':    { status: 'NO',  screenshots: [] },
    'clarification':   { status: 'NO',  screenshots: [] },
    'feedback':        { status: 'YES', screenshots: ['11. Feedback.png'] },
    'multi-mode':      { status: 'NO',  screenshots: [] },
    'speech-to-text':  { status: 'NO',  screenshots: [] },
    'token-management':{ status: 'YES', screenshots: ['10. Token Management.png'] },
    'llm-model-selection': { status: 'YES', screenshots: [], note: 'Model picker in chat with 3 options:<ul><li>Opus 4.6</li><li>Sonnet 4.6</li><li>Haiku 4.5</li></ul>' },
    'starting-prompt':     { status: 'YES', screenshots: ['screenshots/claude-starting-prompt-1.png', 'screenshots/claude-starting-prompt-2.png', 'screenshots/claude-starting-prompt-3.png', 'screenshots/claude-starting-prompt-4.png', 'screenshots/claude-starting-prompt-5.png', 'screenshots/claude-starting-prompt-6.png', 'screenshots/claude-starting-prompt-7.png', 'screenshots/claude-starting-prompt-8.png', 'screenshots/claude-starting-prompt-9.png', 'screenshots/claude-starting-prompt-10.png'] },
  },

  // ── Codex ──
  'Codex': {
    'user-chat':       { status: 'YES', screenshots: ['2. User chat.png', '6. User Chat - 2.png', '12. User Chat - 3 (Add comment).png', '14. User chat - 3.png'] },
    'insert':          { status: 'YES', screenshots: ['18. Insert - 1.png', '19. Insert - 2.png'] },
    'thinking':        { status: 'NO',  screenshots: [] },
    'planning':        { status: 'YES', screenshots: ['5. Planning - 1.png'] },
    'todo-progress':   { status: 'NO',  screenshots: [] },
    'working':         { status: 'YES', screenshots: ['1. Creating task.png', '3. Working - 1.png', '4. Working - 2.png', '7. Working - 3.png', '8. Working - 4.png', '9. Working - 5.png'] },
    'reading-file':    { status: 'NO',  screenshots: [] },
    'writing-code':    { status: 'NO',  screenshots: [] },
    'user-approval':   { status: 'NO',  screenshots: [] },
    'completed':       { status: 'YES', screenshots: ['10. Completed - 1.png', '11. Completed - 2.png', '13. Completed - 2 (Details).png'] },
    'copy':            { status: 'YES', screenshots: ['17. Copy.png'] },
    'preview':         { status: 'NO',  screenshots: [] },
    'error-handling':  { status: 'NO',  screenshots: [] },
    'visual-edits':    { status: 'NO',  screenshots: [] },
    'clarification':   { status: 'NO',  screenshots: [] },
    'feedback':        { status: 'NO',  screenshots: [] },
    'multi-mode':      { status: 'YES', screenshots: ['20. Multi-Mode.png'] },
    'speech-to-text':  { status: 'YES', screenshots: ['16. Speech to Text.png'] },
    'token-management':{ status: 'YES', screenshots: ['15. Token Management.png'] },
    'llm-model-selection': { status: 'LIMITED', screenshots: [], note: 'OpenAI models only — no third-party providers:<ul><li>GPT-5.3 Codex (default)</li><li>GPT-5.2 Codex</li></ul>' },
    'starting-prompt':     { status: 'YES', screenshots: ['screenshots/codex-starting-prompt-1.png', 'screenshots/codex-starting-prompt-2.png', 'screenshots/codex-starting-prompt-3.png', 'screenshots/codex-starting-prompt-4.png', 'screenshots/codex-starting-prompt-5.png', 'screenshots/codex-starting-prompt-6.png'] },
  },

  // ── Cursor ──
  'Cursor': {
    'user-chat':       { status: 'YES', screenshots: ['1. User Chat - 1.png', '24. User Chat - 2.png', '25. User Chat - 3.png'] },
    'insert':          { status: 'YES', screenshots: ['37. Insert - 1.png', '38. Insert - 2.png', '39. Insert - 3.png'] },
    'thinking':        { status: 'YES', screenshots: ['3. Thinking - 1.png', '13. Thinking - 2.png', '14. Thinking - 3.png', '18. Thinking - 4.png', '26. Thinking - 5.png', '27. Thinking - 6.png'] },
    'planning':        { status: 'YES', screenshots: ['2. Planning - 1.png', '9. Planning - 1.png', '10. Planning - 2.png', '11. Planning - 3.png', '17. Planning - 4.png'] },
    'todo-progress':   { status: 'YES', screenshots: ['15. Todo progress - 1.png', '20. Todo progress - 2.png'] },
    'working':         { status: 'YES', screenshots: ['4. Working - 1 (Searching web).png', '6. Working - 2 (Searching web).png', '8. Working - 3.png', '12. Working - 4.png', '28. Working - 5.png'] },
    'reading-file':    { status: 'YES', screenshots: ['33. Reading File - 1.png', '34. Reading FIle - 2.png'] },
    'writing-code':    { status: 'YES', screenshots: ['16. Writing code - 1.png', '21. Writing code - 2.png'] },
    'user-approval':   { status: 'YES', screenshots: ['5. User approval - 1.png', '7. User approval - 2.png', '19. User approval - 3.png'] },
    'completed':       { status: 'YES', screenshots: ['22. Completed - 1.png', '23. Completed - 2.png', '29. Completed - 3 (changes).png'] },
    'copy':            { status: 'YES', screenshots: ['35. Copy - 1.png', '36. Copy - 2.png'] },
    'preview':         { status: 'YES', screenshots: ['31. Preview.png'] },
    'error-handling':  { status: 'NO',  screenshots: [] },
    'visual-edits':    { status: 'NO',  screenshots: [] },
    'clarification':   { status: 'NO',  screenshots: [] },
    'feedback':        { status: 'YES', screenshots: ['Cursor - Feedback 1.png', 'Cursor - Feedback 2.png'] },
    'multi-mode':      { status: 'YES', screenshots: ['30. Multi-Mode.png'] },
    'speech-to-text':  { status: 'YES', screenshots: ['32. Speech to Text.png'] },
    'token-management':{ status: 'NO',  screenshots: [] },
    'llm-model-selection': { status: 'YES', screenshots: [], note: 'Extensive model picker + bring-your-own-model (BYOM) support:<ul><li>Auto</li><li>Composer 1.5</li><li>GPT-5.2</li><li>Opus 4.6</li><li>Gemini 3 Pro</li><li>Grok Code</li></ul>Also supports custom API keys for additional providers.' },
    'starting-prompt':     { status: 'YES', screenshots: [] },
  },

  // ── Lovable ──
  'Lovable': {
    'user-chat':       { status: 'YES', screenshots: ['1. User Chat - 1.png'] },
    'insert':          { status: 'YES', screenshots: ['21. Insert - 1.png', '22. Insert - 2.png', '23. Insert - 3.png'] },
    'thinking':        { status: 'YES', screenshots: ['2. Thinking - 1.png'] },
    'planning':        { status: 'YES', screenshots: ['3. Planning - 1.png'] },
    'todo-progress':   { status: 'YES', screenshots: ['4. Todo Progress - 1.png', '6. Todo Progress - 2.png', '7. Todo Progress - 3.png'] },
    'working':         { status: 'NO',  screenshots: [] },
    'reading-file':    { status: 'YES', screenshots: ['19. Reading File - 1.png'] },
    'writing-code':    { status: 'YES', screenshots: ['5. Writring code - 1.png'] },
    'user-approval':   { status: 'NO',  screenshots: [] },
    'completed':       { status: 'YES', screenshots: ['8. Completed - 1.png', '9. Details - 1.png'] },
    'copy':            { status: 'YES', screenshots: ['20. Copy.png'] },
    'preview':         { status: 'YES', screenshots: ['14. Preview.png'] },
    'error-handling':  { status: 'NO',  screenshots: [] },
    'visual-edits':    { status: 'YES', screenshots: ['10. Changes - 1 (theme).png', '11. Changes - 2 (visual edits).png', '12. Changes - 3 (select component).png', '13. Changes - 4 (working).png'] },
    'clarification':   { status: 'NO',  screenshots: [] },
    'feedback':        { status: 'NO',  screenshots: [] },
    'multi-mode':      { status: 'YES', screenshots: ['16. Multi-Mode.png'] },
    'speech-to-text':  { status: 'YES', screenshots: ['15. Speech to Text.png'] },
    'token-management':{ status: 'YES', screenshots: ['17. Token Management - 1.png', '18. Token Management - 2.png'] },
    'llm-model-selection': { status: 'NO', screenshots: [], note: 'No user-facing model selector. Internally uses:<ul><li>Claude Opus 4.5/4.6</li><li>Claude Sonnet 4.5</li></ul>Lovable AI (in-app chatbot) uses:<ul><li>GPT-5.2</li><li>Gemini 3 Flash/Pro</li></ul>' },
    'starting-prompt':     { status: 'YES', screenshots: ['screenshots/lovable-starting-prompt-1.png', 'screenshots/lovable-starting-prompt-2.png', 'screenshots/lovable-starting-prompt-3.png', 'screenshots/lovable-starting-prompt-4.png'] },
  },

  // ── Replit ──
  'Replit': {
    'user-chat':       { status: 'YES', screenshots: ['6. User chat - 1.png', '17. User Chat - 2.png'] },
    'insert':          { status: 'YES', screenshots: ['27. Insert - 1.png', '28. Insert - 2.png', '29. Insert - 3.png'] },
    'thinking':        { status: 'NO',  screenshots: [] },
    'planning':        { status: 'YES', screenshots: ['8. Planning - 1.png'] },
    'todo-progress':   { status: 'YES', screenshots: ['9. Todo Progress - 1.png', '10. Todo Progress - 2.png'] },
    'working':         { status: 'YES', screenshots: ['1. Working - 1 (loading project).png', '2. Working - 2 (creating app).png', '3. Working - 3 (configuring app).png', '4. Working - 4 (opening).png', '7. Working - 5.png', '18. Working - 6.png', '19. Working - 7.png'] },
    'reading-file':    { status: 'YES', screenshots: ['24. Reading File.png', '24. Reading File - 2.png'] },
    'writing-code':    { status: 'NO',  screenshots: [] },
    'user-approval':   { status: 'NO',  screenshots: [] },
    'completed':       { status: 'YES', screenshots: ['11. Completed - 1.png', '20. Completed - 2.png'] },
    'copy':            { status: 'YES', screenshots: ['25. Copy - 1.png', '26. Copy - 2.png'] },
    'preview':         { status: 'YES', screenshots: ['13. Preview - 1.png', '14. Preview - 2.png'] },
    'error-handling':  { status: 'NO',  screenshots: [] },
    'visual-edits':    { status: 'YES', screenshots: ['15. Changes (select component) - 1.png', '16. Changes (select component) - 2.png'] },
    'clarification':   { status: 'NO',  screenshots: [] },
    'feedback':        { status: 'YES', screenshots: ['12. Feedback.png'] },
    'multi-mode':      { status: 'YES', screenshots: ['22. Multi-Mode - 1.png', '23. Multi-Mode - 2.png'] },
    'speech-to-text':  { status: 'NO',  screenshots: [] },
    'token-management':{ status: 'YES', screenshots: ['21. Tokens - 1.png'] },
    'llm-model-selection': { status: 'NO', screenshots: [], note: 'No model selection. Uses a fixed undisclosed model for all AI operations.' },
    'starting-prompt':     { status: 'YES', screenshots: ['screenshots/replit-starting-prompt-1.png', 'screenshots/replit-starting-prompt-2.png', 'screenshots/replit-starting-prompt-3.png'] },
  },

  // ── Vercel ──
  'Vercel': {
    'user-chat':       { status: 'YES', screenshots: ['1. User Chat - 1.png'] },
    'insert':          { status: 'YES', screenshots: ['22. Insert - 1.png', '23. Insert - 2.png', '24. Insert - 3.png'] },
    'thinking':        { status: 'YES', screenshots: ['2. Thinking - 1.png', '3. Thinking - 2.png', '4. Thinking - 3.png', '5. Thinking - 4.png', '6. Thinking - 5.png', '7. Thinking - 6.png', '8. Thinking - 7.png', '9. Thinking - 8.png'] },
    'planning':        { status: 'YES', screenshots: ['10. Planning - 1.png', '11. Detailed View - 1.png'] },
    'todo-progress':   { status: 'NO',  screenshots: [] },
    'working':         { status: 'YES', screenshots: ['17. Working - 1 (preview).png', '18. Working - 2 (preview).png'] },
    'reading-file':    { status: 'NO',  screenshots: [] },
    'writing-code':    { status: 'YES', screenshots: ['12. Writing Code - 1.png', '13. Writing Code - 2.png', '14. Writing Code - 3.png'] },
    'user-approval':   { status: 'NO',  screenshots: [] },
    'completed':       { status: 'YES', screenshots: ['15. Completed - 1.png', '16. Completed - 2.png'] },
    'copy':            { status: 'YES', screenshots: ['21. Copy.png'] },
    'preview':         { status: 'YES', screenshots: ['19. Preview.png'] },
    'error-handling':  { status: 'NO',  screenshots: [] },
    'visual-edits':    { status: 'YES', screenshots: ['20. Design Edits.png'] },
    'clarification':   { status: 'NO',  screenshots: [] },
    'feedback':        { status: 'YES', screenshots: ['Vercel - Feedback 1.png', 'Vercel - Feedback 2.png'] },
    'multi-mode':      { status: 'NO',  screenshots: [] },
    'speech-to-text':  { status: 'NO',  screenshots: [] },
    'token-management':{ status: 'NO',  screenshots: [] },
    'llm-model-selection': { status: 'NO', screenshots: [], note: 'Undisclosed model via Vercel AI Gateway. No user-facing model selection.' },
    'starting-prompt':     { status: 'NO', screenshots: [], note: 'Vercel v0 uses a different workflow — no traditional starting prompt. Users interact through a chat-based interface without a dedicated initial prompt screen.' },
  },

  // ── VS Code ──
  'VS Code': {
    'user-chat':       { status: 'YES', screenshots: ['1. User Chat - 1.png'] },
    'insert':          { status: 'YES', screenshots: ['31. Insert - 1.png', '32. Insert - 2.png', '33. Insert - 3.png'] },
    'thinking':        { status: 'YES', screenshots: ['3. Thinking - 1.png', '4. Thinking - 2.png'] },
    'planning':        { status: 'YES', screenshots: ['5. Planning - 1.png'] },
    'todo-progress':   { status: 'NO',  screenshots: [] },
    'working':         { status: 'YES', screenshots: ['2. Working - 1.png', '9. Working - 2.png', '10. Working - 3.png', '11. Working - 4.png'] },
    'reading-file':    { status: 'YES', screenshots: ['26. Reading File - 1.png', '27. Reading File - 2.png', '28. Reading File - 3.png'] },
    'writing-code':    { status: 'YES', screenshots: ['14. Writing Code - 1.png', '15. Writing Code - 2.png', '16. Writing Code - 3.png', '17. Writing Code - 4.png'] },
    'user-approval':   { status: 'YES', screenshots: ['6. User Approval - 1.png', '7. User Approval - 2.png', '8. User Approval - 3.png', '12. User Approval - 4.png', '13. User Approval - 5.png'] },
    'completed':       { status: 'YES', screenshots: ['18. Completed - 1.png', '19. Completed - 2.png'] },
    'copy':            { status: 'YES', screenshots: ['29. Copy - 1.png', '30. Copy - 2.png'] },
    'preview':         { status: 'YES', screenshots: ['20. Preview (browser - localhost).png', '21. Open Folder (open project).png', '22. Open Folder - 2.png'] },
    'error-handling':  { status: 'NO',  screenshots: [] },
    'visual-edits':    { status: 'NO',  screenshots: [] },
    'clarification':   { status: 'YES', screenshots: ['23. Clarification Questions.png'] },
    'feedback':        { status: 'YES', screenshots: ['VS Code - Feedback.png'] },
    'multi-mode':      { status: 'YES', screenshots: ['24. Multi-Mode.png'] },
    'speech-to-text':  { status: 'NO',  screenshots: [] },
    'token-management':{ status: 'YES', screenshots: ['25. Token Management - 1.png'] },
    'llm-model-selection': { status: 'YES', screenshots: [], note: 'Broadest model selection with 20+ options and BYOM support:<ul><li>GPT-4.1 / GPT-5.2 / GPT-5.3 Codex</li><li>Claude Opus 4.6 / Sonnet 4.6 / Haiku 4.5</li><li>Gemini 2.5 Pro / Gemini 3 Pro / Flash</li><li>Grok</li></ul>Also supports bring-your-own-model via custom API keys.' },
    'starting-prompt':     { status: 'YES', screenshots: ['screenshots/vscode-starting-prompt-1.png', 'screenshots/vscode-starting-prompt-2.png', 'screenshots/vscode-starting-prompt-3.png', 'screenshots/vscode-starting-prompt-4.png', 'screenshots/vscode-starting-prompt-5.png', 'screenshots/vscode-starting-prompt-6.png', 'screenshots/vscode-starting-prompt-7.png'] },
  },
};

// Helper: get cell data
function getUxCell(toolId, featureId) {
  const toolData = AGENT_UX_MATRIX[toolId];
  if (!toolData || !toolData[featureId]) return { status: 'NO', screenshots: [] };
  return toolData[featureId];
}

// Helper: get all screenshots for a feature across all tools
function getFeatureScreenshots(featureId) {
  const results = [];
  for (const tool of AGENT_UX_TOOLS) {
    const cell = getUxCell(tool.id, featureId);
    for (const filename of cell.screenshots) {
      results.push({ toolId: tool.id, toolName: tool.name, filename });
    }
  }
  return results;
}

// Helper: count how many tools have a feature
function getFeatureToolCount(featureId) {
  let count = 0;
  for (const tool of AGENT_UX_TOOLS) {
    const cell = getUxCell(tool.id, featureId);
    if (cell.status === 'YES' || cell.status === 'LIMITED') count++;
  }
  return count;
}
