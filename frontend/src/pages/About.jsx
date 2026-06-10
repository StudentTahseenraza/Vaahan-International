// // src/pages/About.jsx
// import React from 'react'
import { motion} from 'framer-motion'
import { Link } from 'react-router-dom'

const About = () => {
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

  return (
    <>
      {/* Hero Section - Magazine Style */}
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=800&fit=crop"
            alt="Luxury Performance Car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-orange-500 font-bold text-sm tracking-wider uppercase mb-4 block">About Vaahan International</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Premium Automotive<br />
              <span className="text-orange-500">Service Excellence</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              With over a decade of experience in servicing luxury vehicles, we bring main dealer expertise at competitive prices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision - Split Screen Layout */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
            {/* Mission */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gray-50 rounded-2xl p-8 lg:p-10 h-full">
                <div className="w-12 h-1 bg-orange-500 mb-6"></div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To provide premium automotive service that combines main dealer expertise with affordable pricing, ensuring every luxury vehicle owner gets the best care possible.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative group mt-6 lg:mt-0"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gray-50 rounded-2xl p-8 lg:p-10 h-full">
                <div className="w-12 h-1 bg-blue-500 mb-6"></div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become India's most trusted independent luxury vehicle service center, known for excellence, transparency, and customer satisfaction.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Image Background with Overlay */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1920&h=600&fit=crop"
            alt="Car Workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-orange-500 font-bold text-sm tracking-wider uppercase">Our Achievements</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">Numbers That Speak</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: '15+', label: 'Years Experience', description: 'Industry leadership' },
              { number: '5,000+', label: 'Vehicles Serviced', description: 'Happy customers' },
              { number: '100%', label: 'Satisfaction Rate', description: 'Guaranteed quality' },
              { number: '24/7', label: 'Support Available', description: 'Always here' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <div className="text-white font-semibold text-lg mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Modern Card Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-orange-500 font-bold text-sm tracking-wider uppercase">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">What We Cover</h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              Comprehensive automotive services for premium vehicles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Safety Technologies', 
                image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=300&fit=crop',
                items: ['ABS', 'Airbags', 'ESC', 'Traction Control'],
                bg: 'from-red-500'
              },
              { 
                title: 'Driver Assistance', 
                image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop',
                items: ['Lane Keep Assist', 'Adaptive Cruise', 'Emergency Braking'],
                bg: 'from-blue-500'
              },
              { 
                title: 'Connected Tech', 
                image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&h=300&fit=crop',
                items: ['Smartphone Connectivity', 'Navigation', 'Telematics'],
                bg: 'from-purple-500'
              },
              { 
                title: 'Electric Vehicles', 
                image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop',
                items: ['Battery Systems', 'Charging', 'EV Diagnostics'],
                bg: 'from-green-500'
              }
            ].map((category, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Full Width Image Background */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&h=600&fit=crop"
            alt="Luxury Car Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-orange-500 font-bold text-sm tracking-wider uppercase">Core Values</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">What Drives Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Excellence', description: 'We deliver nothing but the best service quality for premium vehicles.', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop' },
              { title: 'Transparency', description: 'Honest pricing and clear communication about every repair.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop' },
              { title: 'Innovation', description: 'Latest diagnostic tools and cutting-edge repair techniques.', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop' },
              { title: 'Trust', description: 'Building lasting relationships with every customer.', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop' }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={value.image} 
                    alt={value.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Magazine Style Layout */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-orange-500 font-bold text-sm tracking-wider uppercase">Expert Team</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Meet Our Specialists</h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              Certified professionals with years of experience in luxury automotive service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: 'Rajesh Kumar', 
                role: 'Founder & Master Technician', 
                specialty: 'BMW Specialist',
                experience: '20+ years',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop'
              },
              { 
                name: 'Priya Sharma', 
                role: 'Service Manager', 
                specialty: 'Customer Excellence',
                experience: '12+ years',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop'
              },
              { 
                name: 'Amit Patel', 
                role: 'Senior Diagnostic Engineer', 
                specialty: 'Jaguar & Land Rover',
                experience: '15+ years',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop'
              },
              { 
                name: 'Sneha Reddy', 
                role: 'Quality Control Head', 
                specialty: 'Quality Assurance',
                experience: '10+ years',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop'
              }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <div className="h-80 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-orange-400 text-sm font-semibold mb-1">{member.role}</p>
                    <p className="text-gray-300 text-xs">{member.specialty} • {member.experience}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Top Gear Style */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1920&h=500&fit=crop"
            alt="Performance Car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="w-16 h-1 bg-orange-500 mb-8"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready for a <span className="text-orange-500">Premium Experience</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Book your appointment today and let our experts take care of your vehicle with the attention it deserves.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Appointment
              </Link>
              <Link to="/category" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default About