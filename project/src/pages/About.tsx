// import { Linkedin } from 'lucide-react';
import { SEOHead } from '../components/Layout/SEOHead';

export function About() {
  // const organizers = [
  //   {
  //     name: 'Aric Pandya',
  //     role: 'Community Lead',
  //     organization: 'AWS User Group Ahmedabad',
  //     bio: 'Cloud architect with 8+ years of AWS experience. Passionate about community building.',
  //     linkedin: 'https://linkedin.com/in/priya-sharma',
  //     image: '/src/data/images/Aric.png',
  //   },
  //   {
  //     name: 'Nilesh SIR',
  //     role: 'Co-organizer',
  //     organization: 'Tech Innovations Ltd',
  //     bio: 'DevOps specialist and AWS Solutions Architect. Speaker at 15+ tech events.',
  //     linkedin: 'https://linkedin.com/in/rajesh-kumar',
  //     image: 'https://images.pexels.com/photos/3785933/pexels-photo-3785933.jpeg?auto=compress&cs=tinysrgb&w=400',
  //   },
  //   {
  //     name: 'Aisha Patel',
  //     role: 'Program Manager',
  //     organization: 'AWS User Group Ahmedabad',
  //     bio: 'Event organizer and community advocate. Ensures amazing attendee experiences.',
  //     linkedin: 'https://linkedin.com/in/aisha-patel',
  //     image: 'https://images.pexels.com/photos/3807510/pexels-photo-3807510.jpeg?auto=compress&cs=tinysrgb&w=400',
  //   },
  // ];

  const metaDescription = 'Learn about AWS Community Day 2026 and the AWS User Group Ahmedabad. Meet the organizers and understand our mission to build the cloud community.';

  return (
    <>
      <SEOHead
        title="About | AWS Community Day 2026"
        description={metaDescription}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Who We Are</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Building the AWS community in Gujarat, one event at a time.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                AWS Community Day 2026 is organized by the AWS User Group Ahmedabad to bring together cloud professionals, students, and enthusiasts in Gujarat. We're committed to:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Fostering a welcoming and inclusive community for all skill levels</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Sharing knowledge and best practices in cloud computing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Connecting students with industry professionals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Accelerating cloud adoption and innovation in the region</span>
                </li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AWS User Group Ahmedabad</h2>
              <p className="text-gray-700 mb-4">
                The AWS User Group Ahmedabad is a community of developers, architects, and cloud enthusiasts passionate about Amazon Web Services. Founded in 2014, we've grown to over 10,000+ members who regularly attend our meetups, webinars, and annual community day.
              </p>
              <p className="text-gray-700">
                Our group meets monthly to discuss AWS trends, share experiences, and collaborate on real-world cloud projects. Whether you're just starting your cloud journey or a seasoned AWS expert, there's a place for you in our community.
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get Involved</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Attend Our Meetups</h3>
                <p className="text-gray-700 mb-4">
                  Join our regular monthly meetups to network with fellow AWS enthusiasts and learn about the latest AWS services and best practices.
                </p>
                <a href="#" className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
                  Find meetups →
                </a>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Become a Speaker</h3>
                <p className="text-gray-700 mb-4">
                  Share your AWS knowledge and experience with our community. We're always looking for speakers at all levels.
                </p>
                <a href="#" className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
                  Submit talk proposal →
                </a>
              </div>
            </div>
          </div>
        </section>
         {/* organizer */}
        {/* <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet the Organizers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {organizers.map((organizer, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden bg-gray-200">
                    <img
                      src={organizer.image}
                      alt={organizer.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{organizer.name}</h3>
                    <p className="text-orange-600 font-semibold text-sm mb-2">{organizer.role}</p>
                    <p className="text-gray-600 text-sm mb-3">{organizer.organization}</p>
                    <p className="text-gray-700 text-sm mb-4">{organizer.bio}</p>
                    <a
                      href={organizer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        
      </main>
    </>
  );
}
