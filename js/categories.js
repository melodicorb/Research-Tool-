// Define categories data
const categories = [
  {
    id: 'technology',
    name: 'Technology',
    baseKeywords: [
      'tech', 'gadget', 'innovation', 'digital', 'software', 'hardware', 'programming',
      'coding', 'developer', 'computer', 'ai', 'artificial intelligence', 'machine learning',
      'data science', 'cyber security', 'blockchain', 'cryptocurrency', 'web development',
      'app development', 'mobile', 'iot', 'internet of things', 'cloud computing',
      'tech news', 'tech review', 'tech tutorial', 'tech tips', 'tech trends'
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    baseKeywords: [
      'fashion', 'style', 'clothing', 'outfit', 'trend', 'designer', 'model',
      'accessory', 'beauty', 'makeup', 'skincare', 'hairstyle', 'dress', 'shoes',
      'bag', 'jewelry', 'luxury', 'streetwear', 'sustainable fashion', 'vintage',
      'fashion tips', 'fashion inspiration', 'fashion lookbook', 'fashion haul',
      'fashion review', 'fashion tutorial', 'fashion week', 'fashion trend'
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness',
    baseKeywords: [
      'fitness', 'workout', 'exercise', 'gym', 'training', 'weight loss', 'muscle',
      'strength', 'cardio', 'yoga', 'pilates', 'nutrition', 'diet', 'health',
      'wellness', 'bodybuilding', 'crossfit', 'running', 'cycling', 'swimming',
      'hiit', 'fitness tips', 'fitness motivation', 'fitness challenge', 'fitness routine',
      'fitness journey', 'fitness transformation', 'fitness goals', 'healthy lifestyle'
    ]
  },
  {
    id: 'food',
    name: 'Food & Cooking',
    baseKeywords: [
      'food', 'cooking', 'recipe', 'cuisine', 'baking', 'chef', 'meal', 'ingredient',
      'restaurant', 'kitchen', 'dinner', 'lunch', 'breakfast', 'dessert', 'snack',
      'healthy eating', 'vegan', 'vegetarian', 'gluten-free', 'keto', 'paleo',
      'food review', 'cooking tutorial', 'recipe idea', 'food trend', 'food photography',
      'food styling', 'food blog', 'food vlog', 'cooking tips', 'cooking tricks'
    ]
  },
  {
    id: 'travel',
    name: 'Travel',
    baseKeywords: [
      'travel', 'destination', 'vacation', 'trip', 'tourism', 'adventure', 'explore',
      'journey', 'wanderlust', 'backpacking', 'sightseeing', 'hotel', 'resort', 'beach',
      'mountain', 'city', 'countryside', 'road trip', 'flight', 'cruise', 'travel guide',
      'travel tips', 'travel vlog', 'travel photography', 'travel blog', 'travel review',
      'budget travel', 'luxury travel', 'solo travel', 'family travel'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    baseKeywords: [
      'business', 'entrepreneur', 'startup', 'marketing', 'finance', 'investment',
      'management', 'leadership', 'strategy', 'innovation', 'success', 'growth',
      'career', 'job', 'workplace', 'remote work', 'freelance', 'side hustle',
      'e-commerce', 'digital marketing', 'social media marketing', 'content marketing',
      'seo', 'email marketing', 'business tips', 'business strategy', 'business growth'
    ]
  }
];

// Populate category select dropdown when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const categorySelect = document.getElementById('category');
  
  if (categorySelect) {
    // Clear any existing options
    categorySelect.innerHTML = '';
    
    // Add options for each category
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  }
});