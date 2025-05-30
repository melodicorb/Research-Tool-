document.addEventListener('DOMContentLoaded', function() {
  // Update copyright year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Handle tag generator form submission
  const tagGeneratorForm = document.getElementById('tagGeneratorForm');
  const tagDisplayContainer = document.getElementById('tagDisplayContainer');
  
  if (tagGeneratorForm) {
    tagGeneratorForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const input = document.getElementById('input').value;
      const categoryId = document.getElementById('category').value;
      const format = document.getElementById('format').value;
      
      // Validate input
      if (!input.trim()) {
        alert('Please enter a keyword, title, or description');
        return;
      }
      
      // Find the selected category
      const selectedCategory = categories.find(cat => cat.id === categoryId);
      
      if (!selectedCategory) {
        alert('Invalid category selected');
        return;
      }
      
      // Show loading state
      const generateButton = document.getElementById('generateButton');
      const originalButtonText = generateButton.textContent;
      generateButton.textContent = 'Generating...';
      generateButton.disabled = true;
      
      // Simulate API call delay
      setTimeout(() => {
        // Generate tags
        const tags = generateTags(input, selectedCategory);
        const formattedTags = formatTags(tags, format);
        
        // Display tags
        tagDisplayContainer.innerHTML = createTagDisplay(formattedTags, format);
        tagDisplayContainer.style.display = 'block';
        
        // Setup copy button functionality
        setupCopyButton(formattedTags);
        
        // Reset button state
        generateButton.textContent = originalButtonText;
        generateButton.disabled = false;
        
        // Scroll to tag display
        tagDisplayContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 800);
    });
  }
});

// Setup copy button functionality
function setupCopyButton(tags) {
  const copyButton = document.getElementById('copyTagsButton');
  const copySuccessAlert = document.getElementById('copySuccessAlert');
  
  if (copyButton) {
    copyButton.addEventListener('click', function() {
      try {
        // Try to use the clipboard API first
        if (navigator.clipboard) {
          navigator.clipboard.writeText(tags)
            .then(() => {
              showCopySuccess();
            })
            .catch(err => {
              console.error('Clipboard API failed:', err);
              fallbackCopyMethod();
            });
        } else {
          fallbackCopyMethod();
        }
      } catch (err) {
        console.error('Failed to copy:', err);
        fallbackCopyMethod();
      }
    });
  }
  
  // Fallback copy method using a temporary textarea
  function fallbackCopyMethod() {
    const textArea = document.createElement('textarea');
    textArea.value = tags;
    
    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    // Select and copy
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        showCopySuccess();
      } else {
        console.error('Fallback: Unable to copy');
      }
    } catch (err) {
      console.error('Fallback: Unable to copy', err);
      document.body.removeChild(textArea);
    }
  }
  
  // Show copy success message
  function showCopySuccess() {
    copyButton.textContent = '✓ Copied!';
    copyButton.classList.remove('btn-primary');
    copyButton.classList.add('btn-success');
    
    if (copySuccessAlert) {
      copySuccessAlert.style.display = 'block';
    }
    
    // Reset after 3 seconds
    setTimeout(() => {
      copyButton.textContent = 'Copy All Tags';
      copyButton.classList.remove('btn-success');
      copyButton.classList.add('btn-primary');
      
      if (copySuccessAlert) {
        copySuccessAlert.style.display = 'none';
      }
    }, 3000);
  }
}

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});