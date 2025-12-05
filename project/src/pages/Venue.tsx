import { MapPin, Plane, Train, ParkingCircle, Accessibility } from 'lucide-react';
import { SEOHead } from '../components/Layout/SEOHead';

export function Venue() {
  const metaDescription = 'AWS Community Day 2026 venue details, location at Gujarat University Convention and Exhibition Ahmedabad Centre, parking, accessibility, and transportation information.';

  return (
    <>
      <SEOHead
        title="Venue & Location | AWS Community Day 2026"
        description={metaDescription}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Venue & Location</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Find us at Gujarat University Convention and Exhibition Centre in Ahmedabad on Februray 28, 2026.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Location</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-orange-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Gujarat University Convention and Exhibition Centre</h3>
                      <p className="text-gray-600">Memnagar, Ahmedabad, Gujarat 380052</p>
                      <p className="text-gray-500 text-sm mt-1">India</p>
                    </div>
                  </div>
                  <div className="bg-white rounded p-3 mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Event Date:</strong> Februray 28, 2026
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Time:</strong> 8:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">About the Venue</h3>
                <p className="text-gray-700 mb-4">
                 Gujarat University Convention and Exhibition Centre is a premier Convention Center in Gujarat, featuring modern auditoriums, breakout spaces, and excellent connectivity. The campus is designed to accommodate large-scale events with world-class facilities.
                </p>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">Directions:</strong> From Vadodara Railway Station, take NH48 towards Limda. The university is well-signposted. GPS: 22.2237° N, 73.1949° E
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg overflow-hidden h-96 lg:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.4721567890000!2d73.19494!3d22.223700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5e5a5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sParul%20University!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Parul University Location"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Getting Here</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                  <Plane className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">By Air</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Sardar Vallabhbhai Patel International Airport</strong>
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Located in Ahmedabad, approximately 110 km from the venue
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Travel time:</strong> 2-2.5 hours by cab or bus
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                  <Train className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">By Train</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Vadodara Railway Station</strong>
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Major railway hub with connections from across India
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Travel time:</strong> 30-45 minutes by taxi/auto to venue
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                  <ParkingCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">By Car</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Well-connected by NH48 highway</strong>
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Easy access from Ahmedabad, Surat, and surrounding cities
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Parking:</strong> Ample free parking available at the venue
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Facilities & Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <ParkingCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Free Parking</h3>
                  <p className="text-gray-600">Ample free parking available for all attendees</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Accessibility className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Accessibility</h3>
                  <p className="text-gray-600">Wheelchair accessible building with accessible restrooms</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Public Transport</h3>
                  <p className="text-gray-600">Near bus stops with connections to the city</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Food & Beverages</h3>
                  <p className="text-gray-600">Cafeteria and snack areas throughout the venue</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Accommodation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Nearby Hotels</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Grand Bhagwati (3-star)</li>
                  <li>• Surya Palace (3-star)</li>
                  <li>• The Gateway Hotel (4-star)</li>
                  <li>• Taj Vadodara (5-star)</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Budget Options</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Various guest houses</li>
                  <li>• Budget hotels</li>
                  <li>• Hostels available</li>
                  <li>• Rooms start from ₹1,500/night</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Pro Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Book early for better rates</li>
                  <li>• Many hotels offer group discounts</li>
                  <li>• Consider staying in Ahmedabad</li>
                  <li>• Local taxi services available</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
