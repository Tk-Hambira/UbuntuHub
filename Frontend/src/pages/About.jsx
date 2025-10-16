import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Globe, Award } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Cultural Heritage',
      description: 'We celebrate and preserve Namibian traditions, ensuring authentic products reach global markets while respecting their cultural significance.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Every purchase directly supports local artisans and farmers, creating sustainable livelihoods and strengthening communities.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'We connect Namibian craftsmanship with the world, sharing our unique culture and products with international audiences.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'We maintain the highest standards of quality, ensuring every product meets our rigorous criteria for authenticity and excellence.'
    }
  ]

  const teamMembers = [
    {
      name: 'Tk Hambira',
      role: 'Founder & CEO',
      image: 'Images/Tk Hambira.jpeg',
      bio: 'Passionate about connecting Namibian artisans with global markets.'
    },
    {
      name: 'Watanavi S Kaposambo ',
      role: 'Co-Founder & Head of Artisan Relations',
      image: 'Images/Co-Founder1.jpg',
      bio: 'Building strong relationships with local craftspeople and farmers.'
    },
    {
      name: 'Frank Benard',
      role: 'Co-Founder & Cultural Advisor',
      image: 'Images/Co-Founder2.jpg',
      bio: 'Ensuring cultural authenticity and respect in all our partnerships.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-desert-brown to-sunset-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              About Ubuntu Hub Namibia
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              We are more than a marketplace. We're a bridge connecting Namibian heritage 
              with the world, one authentic product at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-charcoal mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ubuntu Hub Namibia was born from a simple yet powerful idea: to create a platform 
                where authentic Namibian products could reach global markets while ensuring that 
                the artisans and farmers who create them receive fair compensation and recognition.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe in the Ubuntu philosophy. "I am because we are", which emphasizes 
                our interconnectedness and shared humanity. This philosophy drives everything we do, 
                from how we work with our artisan partners to how we serve our customers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every product on our platform tells a story of tradition, craftsmanship, and 
                cultural pride. We're not just selling products; we're sharing the rich heritage 
                of Namibia with the world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="Images/Ubuntu.jpg"
                alt="Namibian landscape"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-charcoal mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide every decision we make and every relationship we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sunset-orange text-white rounded-full mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-charcoal mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals working to connect Namibian artisans with the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-1">{member.name}</h3>
                <p className="text-sunset-orange font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-desert-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-sunset-orange mb-2">500+</div>
                <div className="text-lg">Artisans Supported</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sunset-orange mb-2">50+</div>
                <div className="text-lg">Communities Reached</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sunset-orange mb-2">N$ 2M+</div>
                <div className="text-lg">Paid to Artisans</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
