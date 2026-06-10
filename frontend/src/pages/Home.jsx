
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
// import Newsletter from '../components/Newsletter'
// import CTASection from '../components/CTASection'

const Home = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  }

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  }

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  }

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  const categories = [
    {
      title: 'Safety Features',
      description: 'Modern vehicles come equipped with advanced safety systems that protect passengers in ways never before possible.',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&h=400&fit=crop',
      stats: ['ABS', 'Airbags', 'ESC', 'Traction Control'],
      link: '/category#safety'
    },
    {
      title: 'ADAS Technology',
      description: 'Advanced Driver Assistance Systems are revolutionizing how we drive, making roads safer for everyone.',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop',
      stats: ['Lane Assist', 'Adaptive Cruise', 'Auto Braking'],
      link: '/category#adas'
    },
    {
      title: 'Connected Cars',
      description: 'Your vehicle is now smarter than ever with real-time connectivity, remote access, and cloud integration.',
      image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&h=400&fit=crop',
      stats: ['Remote Start', 'GPS Tracking', 'Mobile Apps'],
      link: '/category#connected'
    },
    {
      title: 'Electric Vehicles',
      description: 'The future of mobility is electric. Understand battery tech, charging, and ownership benefits.',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
      stats: ['Battery Tech', 'Fast Charging', 'Range'],
      link: '/category#ev'
    }
  ]

  const latestArticles = [
    {
      title: 'How ABS Actually Saves Your Life',
      excerpt: 'Understanding Anti-lock Braking Systems and why every modern car needs them for emergency situations.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop',
      date: 'June 10, 2026',
      readTime: '5 min read',
      category: 'Safety'
    },
    {
      title: 'ADAS Explained: The Future is Now',
      excerpt: 'From automatic emergency braking to lane keeping assistance - how AI is transforming modern driving.',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
      date: 'June 9, 2026',
      readTime: '7 min read',
      category: 'Technology'
    },
    {
      title: 'Electric Vehicle Battery Guide',
      excerpt: 'Everything you need to know about EV batteries, charging infrastructure, and real-world range.',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
      date: 'June 8, 2026',
      readTime: '8 min read',
      category: 'EV'
    },
    {
      title: '360 Camera Technology Deep Dive',
      excerpt: 'How surround-view camera systems help drivers park safely and navigate tight spaces with confidence.',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
      date: 'June 7, 2026',
      readTime: '6 min read',
      category: 'Technology'
    }
  ]

  return (
    <>
      <Hero />
      
      {/* Stats Section - No Icons, Clean Numbers */}
      <section className="relative -mt-16 pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '100+', label: 'Feature Guides', description: 'Comprehensive explanations' },
              { number: '10K+', label: 'Monthly Readers', description: 'Growing community' },
              { number: '50+', label: 'Tech Articles', description: 'Expert insights' },
              { number: '4+', label: 'Categories', description: 'Complete coverage' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <div className="text-gray-800 font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories - Magazine Layout */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">Explore Technologies</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Modern Vehicle Features</h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              Discover the technologies shaping the future of automobiles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={idx % 2 === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-full overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {category.stats.map((stat, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                          {stat}
                        </span>
                      ))}
                    </div>
                    <a href={category.link} className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600 transition-colors group/link">
                      Learn More 
                      <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Feature Cards */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Trusted Knowledge Platform</h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              Helping Indian car buyers make informed decisions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Simple Language', description: 'We explain complex automotive technologies in plain language that anyone can understand.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop' },
              { title: 'Expert Research', description: 'Every guide is carefully researched to provide accurate and practical information.', image: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?w=400&h=300&fit=crop' },
              { title: 'Indian Market Focus', description: 'Our content is designed specifically for Indian vehicle buyers and driving conditions.', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop' },
              { title: 'Practical Advice', description: 'We focus on helping buyers make informed decisions rather than promoting products.', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12 flex-wrap gap-4"
          >
            <div>
              <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">Latest Guides</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">Popular Technology Articles</h2>
            </div>
            <a href="#" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors inline-flex items-center">
              View All Articles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestArticles.map((article, idx) => (
              <motion.article
                key={idx}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full tracking-wide">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <a href="#" className="inline-flex items-center text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
                    Read Article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-12">What Our Readers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { quote: "The detailed explanations of ADAS features helped me understand exactly what to look for when buying my new car. Made the decision so much easier!", name: "Rahul Mehta", role: "New Car Buyer" },
                { quote: "Finally a platform that explains EV battery technology in simple terms. The charging guides were especially helpful for my first electric vehicle purchase.", name: "Priya Singh", role: "EV Owner" },
                { quote: "As a first-time car buyer, I was overwhelmed by all the technical jargon. Vaahan International made everything crystal clear.", name: "Amit Sharma", role: "First Time Buyer" }
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 text-left border border-gray-100"
                >
                  <div className="flex text-orange-400 mb-4">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </div>
                  <p className="text-gray-600 italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1920&h=500&fit=crop"
            alt="Car Technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900/80"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Stay Ahead with Automotive Technology
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Get the latest guides, expert insights, and technology updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home