import { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle,
  Users,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { SEOHead } from "../components/Layout/SEOHead";
import { volunteersApi } from "../lib/api";
import { Volunteer } from "../lib/supabase";

interface FormState {
  name: string;
  email: string;
  phone: string;
  role: string;
  experience_level: string;
  availability: string[];
  motivation: string;
}

const VOLUNTEER_ROLES = [
  "Event Day Support",
  "Registration Desk",
  "Speaker Support",
  "Venue Setup",
  "Photography/Video",
  "Social Media",
  "Logistics",
  "Accessibility Support",
];

const AVAILABILITY_OPTIONS = [
  "Event Day (Dec 13)",
  "Day Before (Dec 12)",
  "Day After (Dec 14)",
];

export function Volunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [volunteersLoading, setVolunteersLoading] = useState(true);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience_level: "",
    availability: [],
    motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await volunteersApi.getAll();
        //console.log("Volunteers:", data);
        setVolunteers(data);
      } catch (error) {
        console.error("Error loading volunteers:", error);
      } finally {
        setVolunteersLoading(false);
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      availability: prev.availability.includes(value)
        ? prev.availability.filter((item) => item !== value)
        : [...prev.availability, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const newVolunteer = await volunteersApi.create({
        name: formState.name,
        email: formState.email,
        phone: formState.phone || null,
        role: formState.role,
        experience_level: formState.experience_level || null,
        availability: formState.availability,
        motivation: formState.motivation,
      });

      setVolunteers((prev) => [newVolunteer, ...prev]);

      setSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        role: "",
        experience_level: "",
        availability: [],
        motivation: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const metaDescription =
    "Join our volunteer team at AWS Community Day 2026. Help us create an amazing experience for our community.";

  return (
    <>
      <SEOHead
        title="Volunteer | AWS Community Day 2026"
        description={metaDescription}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Help us create an amazing experience for AWS Community Day 2026.
              Volunteers get exclusive perks and get recognized as part of the
              organizing team.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  Exclusive
                </div>
                <p className="text-gray-600 text-sm">
                  Volunteer swag and t-shirts
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  VIP
                </div>
                <p className="text-gray-600 text-sm">
                  VIP meal and refreshments
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  Recognized
                </div>
                <p className="text-gray-600 text-sm">
                  Credited in program and socials
                </p>
              </div>
            </div>

            {/* Volunteers Display Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Volunteers
                </h2>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {volunteers.length} volunteers
                </span>
              </div>

              {volunteersLoading ? (
                <div className="text-center text-gray-500">
                  Loading volunteers...
                </div>
              ) : volunteers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {volunteers.map((volunteer) => (
                    <div
                      key={volunteer.id}
                      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all"
                    >
                      {volunteer.photo_url && (
                        <div className="aspect-square bg-gray-200 overflow-hidden">
                          <img
                            src={volunteer.photo_url}
                            alt={volunteer.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {volunteer.name}
                        </h3>
                        <p className="text-sm text-orange-600 font-medium mb-2">
                          {volunteer.role}
                        </p>
                        {volunteer.experience_level && (
                          <p className="text-xs text-gray-500 mb-2">
                            {volunteer.experience_level
                              ?.replace("-", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {volunteer.availability.map((day, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {day
                                .replace("Event Day (Dec 13)", "Event Day")
                                .replace("Day Before (Dec 12)", "Setup")
                                .replace("Day After (Dec 14)", "Cleanup")}
                            </span>
                          ))}
                        </div>
                        {(volunteer.linkedin_url ||
                          volunteer.twitter_url ||
                          volunteer.github_url) && (
                          <div className="flex gap-2">
                            {volunteer.linkedin_url && (
                              <a
                                href={volunteer.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-orange-600 transition-colors"
                                aria-label="LinkedIn"
                              >
                                <Linkedin className="w-4 h-4" />
                              </a>
                            )}
                            {volunteer.twitter_url && (
                              <a
                                href={volunteer.twitter_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-orange-600 transition-colors"
                                aria-label="Twitter"
                              >
                                <Twitter className="w-4 h-4" />
                              </a>
                            )}
                            {volunteer.github_url && (
                              <a
                                href={volunteer.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-orange-600 transition-colors"
                                aria-label="GitHub"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No volunteers yet. Be the first to join!
                </div>
              )}
            </div>

            {/* {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                <p className="text-gray-700 mb-4">
                  We've received your volunteer application. Our team will review it and contact you soon with next steps.
                </p>
                <p className="text-sm text-gray-600">
                  Check your email for updates and volunteer preparation details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                {error && (
                  <div className="mb-6 flex gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Experience Level
                    </label>
                    <select
                      name="experience_level"
                      value={formState.experience_level}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="first-time">First Time Volunteering</option>
                      <option value="experienced">Experienced Volunteer</option>
                      <option value="event-organizer">Event Organizer</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Volunteer Role *
                  </label>
                  <select
                    name="role"
                    value={formState.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  >
                    <option value="">Select a role...</option>
                    {VOLUNTEER_ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    When can you volunteer? *
                  </label>
                  <div className="space-y-2">
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <label key={option} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={formState.availability.includes(option)}
                          onChange={() => handleCheckboxChange(option)}
                          className="w-4 h-4 border border-gray-300 rounded accent-orange-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  {formState.availability.length === 0 && (
                    <p className="text-red-600 text-sm mt-2">Please select at least one day</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Why do you want to volunteer? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formState.motivation}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Tell us about your motivation..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || formState.availability.length === 0}
                  className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )} */}
          </div>
        </section>
      </main>
    </>
  );
}

function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-900 mb-1">{volunteer.name}</h3>
      <p className="text-sm text-orange-600 font-medium mb-2">
        {volunteer.role}
      </p>
      {volunteer.experience_level && (
        <p className="text-xs text-gray-500 mb-2">
          {volunteer.experience_level
            .replace("-", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </p>
      )}
      <div className="flex flex-wrap gap-1">
        {volunteer.availability.map((day, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
          >
            {day
              .replace("Event Day (Dec 13)", "Event Day")
              .replace("Day Before (Dec 12)", "Setup")
              .replace("Day After (Dec 14)", "Cleanup")}
          </span>
        ))}
      </div>
    </div>
  );
}
