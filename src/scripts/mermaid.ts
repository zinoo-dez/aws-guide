let mermaidLoadedPromise: Promise<any> | null = null;

export function loadMermaidScript(): Promise<any> {
  if (typeof window === 'undefined') return Promise.reject();
  if ((window as any).mermaid) {
    return Promise.resolve((window as any).mermaid);
  }
  if (mermaidLoadedPromise) {
    return mermaidLoadedPromise;
  }

  mermaidLoadedPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="mermaid"]');
    if (existing) {
      if ((window as any).mermaid) {
        resolve((window as any).mermaid);
      } else {
        existing.addEventListener('load', () => resolve((window as any).mermaid));
        existing.addEventListener('error', reject);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
    script.onload = () => resolve((window as any).mermaid);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return mermaidLoadedPromise;
}

export function cleanMermaidCode(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/→/g, '-->')
    .replace(/-\.→/g, '-.->')
    .replace(/- \. →/g, '-.->')
    .replace(/───>/g, '-->')
    .replace(/──>/g, '-->')
    .replace(/←/g, '<--')
    .replace(/↔/g, '<-->')
    .trim();
}

export function convertMarkdownMermaidBlocks(): void {
  if (typeof document === 'undefined') return;

  // Search for any code blocks representing mermaid diagrams
  const codeBlocks = Array.from(document.querySelectorAll<HTMLElement>(
    'pre.astro-code[data-language="mermaid"], pre[data-language="mermaid"], pre code.language-mermaid, pre.mermaid, div.mermaid'
  ));

  codeBlocks.forEach((node) => {
    // If it's already inside an architecture-diagram-card, skip
    if (node.closest('.architecture-diagram-card')) return;

    let rawCode = '';
    let targetPre: HTMLElement | null = null;

    if (node.tagName === 'CODE') {
      rawCode = node.textContent || '';
      targetPre = node.closest('pre') || node;
    } else {
      rawCode = node.textContent || '';
      targetPre = node;
    }

    if (!rawCode.trim()) return;

    // Build the rich architecture diagram card
    const card = document.createElement('div');
    card.className = 'architecture-diagram-card glass-card';
    card.innerHTML = `
      <div class="diagram-toolbar">
        <div class="diagram-title-group">
          <svg class="diagram-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
          <span class="diagram-title">Architecture Topology</span>
        </div>
        <div class="diagram-actions">
          <button type="button" class="diagram-btn zoom-in-btn" title="Zoom In" aria-label="Zoom In">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
          <button type="button" class="diagram-btn zoom-out-btn" title="Zoom Out" aria-label="Zoom Out">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
          <button type="button" class="diagram-btn zoom-reset-btn" title="Reset View" aria-label="Reset View">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          </button>
          <button type="button" class="diagram-btn copy-mermaid-btn" title="Copy Mermaid Definition" aria-label="Copy Mermaid Definition">
            <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span class="btn-text">Copy</span>
          </button>
        </div>
      </div>
      <div class="diagram-viewport">
        <div class="mermaid-target" data-raw="${encodeURIComponent(rawCode)}">
          <div class="diagram-loading-placeholder">
            <div class="diagram-spinner"></div>
            <span>Rendering Architecture Topology...</span>
          </div>
        </div>
      </div>
      <p class="diagram-caption">Interactive Architecture Diagram (Use controls to zoom & pan)</p>
    `;

    targetPre?.parentNode?.replaceChild(card, targetPre);
  });
}

export async function renderAllDiagrams(): Promise<void> {
  if (typeof window === 'undefined') return;

  convertMarkdownMermaidBlocks();

  const targets = document.querySelectorAll<HTMLElement>('.mermaid-target');
  if (targets.length === 0) return;

  try {
    const mermaid = await loadMermaidScript();
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    mermaid.initialize({
      startOnLoad: false,
      theme: isLight ? 'default' : 'dark',
      themeVariables: {
        fontFamily: 'Inter, system-ui, sans-serif',
        primaryColor: isLight ? '#FFFBEB' : '#18223B',
        primaryTextColor: isLight ? '#0F172A' : '#F1F5F9',
        primaryBorderColor: isLight ? '#EA580C' : '#FF9900',
        lineColor: isLight ? '#0284C7' : '#38BDF8',
        secondaryColor: isLight ? '#F8FAFC' : '#101728',
        tertiaryColor: isLight ? '#FFFFFF' : '#0B101C',
        background: 'transparent',
        nodeTextColor: isLight ? '#0F172A' : '#F1F5F9',
        mainBkg: isLight ? '#FFFFFF' : '#18223B',
        nodeBorder: isLight ? '#CBD5E1' : '#38BDF8',
        clusterBkg: isLight ? '#F8FAFC' : '#0B101C',
        clusterBorder: isLight ? '#E2E8F0' : '#1E2A4A',
        edgeLabelBackground: isLight ? '#FFFFFF' : '#101728',
      },
      securityLevel: 'loose',
    });

    const renderPromises = Array.from(targets).map(async (el, index) => {
      let raw = el.getAttribute('data-raw') || '';
      try {
        if (raw.startsWith('%') || raw.includes('%20') || raw.includes('%0A')) {
          raw = decodeURIComponent(raw);
        }
      } catch (_) {}

      if (!raw) raw = el.textContent || '';
      if (!raw.trim()) return;

      const cleanCode = cleanMermaidCode(raw);
      const uniqueId = `mermaid_svg_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 7)}`;

      try {
        const { svg } = await mermaid.render(uniqueId, cleanCode);
        el.innerHTML = svg;
        el.setAttribute('data-rendered', 'true');
      } catch (err) {
        console.warn('Mermaid render warning, applying label quoting fallback:', err);
        try {
          const fallbackCode = cleanCode
            .replace(/-->\|([^"]*?)\|/g, (_, p1) => `-->|"${p1.trim()}"|`)
            .replace(/-\.->\|([^"]*?)\|/g, (_, p1) => `-.->|"${p1.trim()}"|`);
          const { svg } = await mermaid.render(uniqueId + '_fb', fallbackCode);
          el.innerHTML = svg;
          el.setAttribute('data-rendered', 'true');
        } catch (fbErr) {
          console.error('Mermaid render failed permanently:', fbErr);
          el.innerHTML = `<div class="diagram-error-box"><pre><code>${cleanCode}</code></pre></div>`;
        }
      }
    });

    await Promise.allSettled(renderPromises);
    setupDiagramControls();
  } catch (e) {
    console.error('Failed to initialize Mermaid:', e);
  }
}

export function setupDiagramControls(): void {
  if (typeof document === 'undefined') return;

  document.querySelectorAll<HTMLElement>('.architecture-diagram-card').forEach((card) => {
    if (card.getAttribute('data-controls-bound')) return;
    card.setAttribute('data-controls-bound', 'true');

    const target = card.querySelector('.mermaid-target') as HTMLElement;
    if (!target) return;

    let zoom = 1;
    const zoomInBtn = card.querySelector('.zoom-in-btn');
    const zoomOutBtn = card.querySelector('.zoom-out-btn');
    const resetBtn = card.querySelector('.zoom-reset-btn');
    const copyBtn = card.querySelector('.copy-mermaid-btn');

    zoomInBtn?.addEventListener('click', () => {
      zoom = Math.min(zoom + 0.2, 2.5);
      target.style.transform = `scale(${zoom})`;
    });

    zoomOutBtn?.addEventListener('click', () => {
      zoom = Math.max(zoom - 0.2, 0.5);
      target.style.transform = `scale(${zoom})`;
    });

    resetBtn?.addEventListener('click', () => {
      zoom = 1;
      target.style.transform = `scale(1)`;
    });

    copyBtn?.addEventListener('click', () => {
      let raw = target.getAttribute('data-raw') || '';
      try {
        if (raw.startsWith('%') || raw.includes('%20') || raw.includes('%0A')) {
          raw = decodeURIComponent(raw);
        }
      } catch (_) {}

      navigator.clipboard.writeText(cleanMermaidCode(raw)).then(() => {
        const textSpan = copyBtn?.querySelector('.btn-text');
        if (textSpan) {
          textSpan.textContent = 'Copied!';
          setTimeout(() => { textSpan.textContent = 'Copy'; }, 2000);
        }
      });
    });
  });
}

export function initMermaid(): void {
  if (typeof window === 'undefined') return;
  renderAllDiagrams();
}
