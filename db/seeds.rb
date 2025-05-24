# This file contains seed data for the 5th Season fashion platform
puts "Seeding database..."

# Clean up existing data
User.destroy_all
puts "Creating users..."

# Create sample users
aria_user = User.create!(
  email: "aria@example.com",
  password: "password123",
  first_name: "Aria",
  last_name: "Chen"
)

max_user = User.create!(
  email: "max@example.com",
  password: "password123",
  first_name: "Max",
  last_name: "Rivera"
)

puts "Creating designers..."

# Create designers linked to users
aria_designer = Designer.create!(
  user: aria_user,
  brand_name: "Aria Designs",
  brand_description: "Sustainable fashion designer with a focus on modern silhouettes and traditional techniques. Former @ParsonsFashion graduate creating clothes that tell stories.",
  location: "New York, NY",
  website: "https://ariadesigns.com",
  established_year: 2020,
  verification_status: "verified",
  average_rating: 4.8
)

max_designer = Designer.create!(
  user: max_user,
  brand_name: "MaxWear",
  brand_description: "Contemporary streetwear with a sustainable approach. Bringing art and fashion together in bold, wearable statements.",
  location: "Los Angeles, CA",
  website: "https://maxwear.co",
  established_year: 2019,
  verification_status: "verified",
  average_rating: 4.6
)

puts "Creating collections..."

# Create collections for Aria
spring_2024 = Collection.create!(
  designer: aria_designer,
  title: "Blooming Futures",
  season: "Spring",
  year: 2024,
  description: "A collection inspired by sustainable materials and traditional craftsmanship.",
  status: "published"
)

fall_2023 = Collection.create!(
  designer: aria_designer,
  title: "Urban Elegance",
  season: "Fall",
  year: 2023,
  description: "Where city meets sophistication with sustainable practices at the core.",
  status: "published"
)

# Create collection for Max
max_2024 = Collection.create!(
  designer: max_designer,
  title: "Street Dreams",
  season: "Summer",
  year: 2024,
  description: "Bold streetwear with artistic elements, sustainable materials, and unique silhouettes.",
  status: "published"
)

puts "Creating collaboration preferences..."

# Create collaboration preferences for Aria
CollaborationPreference::COMMON_TYPES.first(4).each do |pref_type|
  CollaborationPreference.create!(
    designer: aria_designer,
    preference_type: pref_type,
    description: "Open to #{pref_type.downcase} opportunities with like-minded brands and individuals.",
    is_active: true
  )
end

# Create collaboration preferences for Max
CollaborationPreference::COMMON_TYPES.last(4).each do |pref_type|
  CollaborationPreference.create!(
    designer: max_designer,
    preference_type: pref_type,
    description: "Interested in #{pref_type.downcase} partnerships with forward-thinking organizations.",
    is_active: true
  )
end

puts "Creating testimonials..."

# Create testimonials for Aria
Testimonial.create!([
  {
    designer: aria_designer,
    reviewer_name: "Elena Ross",
    reviewer_title: "Stylist",
    content: "Aria's pieces are truly unique - they photograph beautifully and always draw attention on set. The quality and attention to detail make them perfect for editorial work.",
    rating: 5.0,
    verified: true
  },
  {
    designer: aria_designer,
    reviewer_name: "Marcus Chen",
    reviewer_title: "Boutique Owner",
    content: "Our customers love Aria's sustainable approach and distinctive aesthetic. Her collections consistently sell out within weeks of arriving at our store.",
    rating: 4.8,
    verified: true
  },
  {
    designer: aria_designer,
    reviewer_name: "Jade Kim",
    reviewer_title: "Fashion Editor",
    content: "What stands out about Aria's work is how she balances innovation with wearability. Her designs push boundaries while remaining accessible.",
    rating: 4.5,
    verified: true
  }
])

# Create testimonials for Max
Testimonial.create!([
  {
    designer: max_designer,
    reviewer_name: "Zoe Taylor",
    reviewer_title: "Art Director",
    content: "Max's understanding of urban aesthetic and culture shines through in every piece. The collection brings fresh energy to streetwear.",
    rating: 4.7,
    verified: true
  },
  {
    designer: max_designer,
    reviewer_name: "Devon Wright",
    reviewer_title: "Musician",
    content: "I wear MaxWear for all my performances - comfortable, bold, and makes a statement that resonates with my audience.",
    rating: 4.5,
    verified: true
  }
])

puts "Creating designs..."

# Create designs for Aria's Spring 2024 collection
design_titles = [
  "Sakura Wrap Dress", 
  "Bamboo Weave Blouse", 
  "Upcycled Denim Jumpsuit", 
  "Hemp Canvas Jacket", 
  "Botanical Print Skirt", 
  "Organic Cotton Shirt", 
  "Recycled Polyester Raincoat", 
  "Natural Dye Maxi Dress"
]

design_titles.each_with_index do |title, index|
  Design.create!(
    collection: spring_2024,
    title: title,
    description: "Sustainable #{title.downcase} made with eco-friendly materials and ethical production processes.",
    status: "published",
    image_url: "https://example.com/designs/spring2024_#{index + 1}.jpg",
    featured: index < 3, # First 3 are featured
    materials: "Organic cotton, recycled polyester, natural dyes"
  )
end

# Create designs for Aria's Fall 2023 collection
fall_titles = [
  "Wool Blend Oversized Coat", 
  "Recycled Cashmere Sweater", 
  "Corduroy Wide-Leg Pants", 
  "Structured Silk Blouse"
]

fall_titles.each_with_index do |title, index|
  Design.create!(
    collection: fall_2023,
    title: title,
    description: "Elegant #{title.downcase} with sustainable materials and timeless design.",
    status: "published",
    image_url: "https://example.com/designs/fall2023_#{index + 1}.jpg",
    featured: index < 2, # First 2 are featured
    materials: "Recycled wool, organic cotton, peace silk"
  )
end

# Create designs for Max's Summer 2024 collection
street_titles = [
  "Urban Graffiti Hoodie", 
  "Recycled Tech Joggers", 
  "Art Collab Tee", 
  "Utility Pocket Vest", 
  "Vintage Remix Jacket", 
  "Canvas High-Top Sneakers"
]

street_titles.each_with_index do |title, index|
  Design.create!(
    collection: max_2024,
    title: title,
    description: "Bold #{title.downcase} celebrating street culture and sustainable fashion.",
    status: "published",
    image_url: "https://example.com/designs/street2024_#{index + 1}.jpg",
    featured: index < 3, # First 3 are featured
    materials: "Organic cotton, recycled polyester, repurposed fabrics"
  )
end

puts "Seeding complete!"
