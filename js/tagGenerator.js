// Helper function to extract keywords from input
function extractKeywords(input) {
  if (!input) return [];
  
  // Convert to lowercase and remove special characters
  const cleanInput = input.toLowerCase().replace(/[^\w\s]/gi, '');
  
  // Split by spaces and filter out common words and short words
  const commonWords = ['a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'can', 'could', 'will', 'would', 'should', 'may', 'might', 'must', 'shall'];
  
  const keywords = cleanInput.split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word));
  
  // Return unique keywords
  return Array.from(new Set(keywords));
}

// Function to generate tags based on input and category
function generateTags(input, category) {
  // Extract keywords from input
  const inputKeywords = extractKeywords(input);
  
  // Get base keywords for the category
  const { baseKeywords } = category;
  
  // Create tag array
  const tags = [];
  
  // Add direct category name as a tag
  tags.push({ text: category.name.toLowerCase(), weight: 10 });
  
  // Add input keywords as tags
  inputKeywords.forEach(keyword => {
    if (keyword.length > 2) {
      tags.push({ text: keyword, weight: 8 });
    }
  });
  
  // Add combinations of input keywords and category keywords
  inputKeywords.forEach(inputKeyword => {
    if (inputKeyword.length <= 2) return;
    
    baseKeywords.forEach(baseKeyword => {
      // Only create sensible combinations
      if (inputKeyword !== baseKeyword && baseKeyword.length > 2) {
        // Ensure we don't repeat words in combinations
        if (!inputKeyword.includes(baseKeyword) && !baseKeyword.includes(inputKeyword)) {
          tags.push({ text: `${inputKeyword} ${baseKeyword}`, weight: 7 });
        }
      }
    });
  });
  
  // Add category base keywords as tags
  baseKeywords.forEach(keyword => {
    if (keyword.length > 2) {
      // Add with a lower weight so they appear after more specific combinations
      tags.push({ text: keyword, weight: 5 });
    }
  });
  
  // Add some trending and popular variations
  const trendingPrefixes = ['trending', 'popular', 'best', 'top', 'latest'];
  const longTailSuffixes = ['tips', 'guide', 'ideas', 'how to', 'tutorial', 'review', 'for beginners'];
  
  // Add some trending variations
  inputKeywords.forEach(keyword => {
    if (keyword.length <= 2) return;
    
    // Add some trending prefix combinations
    const randomTrendingPrefix = trendingPrefixes[Math.floor(Math.random() * trendingPrefixes.length)];
    tags.push({ text: `${randomTrendingPrefix} ${keyword}`, weight: 6 });
    
    // Add some long-tail suffix combinations
    const randomLongTailSuffix = longTailSuffixes[Math.floor(Math.random() * longTailSuffixes.length)];
    tags.push({ text: `${keyword} ${randomLongTailSuffix}`, weight: 6 });
  });
  
  // Deduplicate tags
  const uniqueTags = Array.from(new Set(tags.map(tag => tag.text)))
    .map(text => {
      const tag = tags.find(t => t.text === text);
      return { text, weight: tag ? tag.weight : 5 };
    });
  
  // Sort tags by weight (higher first) and then alphabetically
  uniqueTags.sort((a, b) => {
    if (b.weight !== a.weight) {
      return b.weight - a.weight;
    }
    return a.text.localeCompare(b.text);
  });
  
  // Limit to a reasonable number (15-30 tags)
  const maxTags = Math.min(30, Math.max(15, uniqueTags.length));
  return uniqueTags.slice(0, maxTags);
}

// Format tags based on user preference
function formatTags(tags, format) {
  const tagTexts = tags.map(tag => tag.text);
  
  if (format === 'comma') {
    return tagTexts.join(', ');
  } else {
    return tagTexts.join('\n');
  }
}

// Create tag display HTML
function createTagDisplay(tags, format) {
  // Parse the tags to display them as individual tags
  const tagList = format === 'comma' ? tags.split(', ') : tags.split('\n');
  
  return `
    <div class="card shadow-lg border-0">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h3 mb-0 fw-bold">Generated Tags</h2>
          <button id="copyTagsButton" class="btn btn-primary">Copy All Tags</button>
        </div>
        
        <div id="copySuccessAlert" class="alert alert-success mb-3" style="display: none;">
          Tags copied to clipboard successfully!
        </div>
        
        <div class="p-4 bg-light rounded shadow-sm mb-4">
          <h5 class="text-muted mb-3">Tagged Output:</h5>
          <div class="d-flex flex-wrap">
            ${tagList.map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}
          </div>
        </div>
        
        <div>
          <h5 class="text-muted mb-3">Raw Output:</h5>
          <pre class="bg-white p-3 rounded shadow-sm overflow-auto" style="max-height: 200px;">${tags}</pre>
        </div>
        
        <div class="mt-4 text-muted">
          <p>
            <span class="fw-semibold">${tagList.length} colorful tags</span> generated based on your input and selected category.
          </p>
          <p class="mb-0">
            Use these vibrant tags to improve the SEO of your content on YouTube, blogs, or social media.
          </p>
        </div>
      </div>
    </div>
  `;
}