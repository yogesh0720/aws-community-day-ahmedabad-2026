import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Twitter, Github } from 'lucide-react';
import { SEOHead } from '../components/Layout/SEOHead';
import { Speaker } from '../lib/supabase';
import { speakersApi } from '../lib/api';

export function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await speakersApi.getAll();
        setSpeakers(data);
      } catch (error) {
        console.error('Error loading speakers:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const metaDescription = 'Meet the speakers at AWS Community Day 2026. Learn from industry experts sharing their knowledge on AWS and cloud technologies.';

  return (
    <>
      <SEOHead
        title="Speakers | AWS Community Day 2026"
        description={metaDescription}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Speakers</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Learn from industry experts and thought leaders in the AWS community.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center text-gray-500">Loading speakers...</div>
            ) : speakers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {speakers.map((speaker) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">More speakers coming soon...</div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Link
      to={`/speakers/${speaker.id}`}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all"
    >
      <div className="aspect-square bg-gray-200 overflow-hidden">
        {speaker.photo_url && (
          <img
            src={speaker.photo_url}
            alt={speaker.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
          {speaker.name}
        </h3>
        <p className="text-sm text-gray-600">{speaker.title}</p>
        <p className="text-xs text-gray-500 mt-1">{speaker.organization}</p>
        <p className="text-sm font-medium text-orange-600 mt-3 group-hover:text-orange-700">
          {speaker.talk_title}
        </p>
        {(speaker.linkedin_url || speaker.twitter_url || speaker.github_url) && (
          <div
            className="flex gap-2 mt-4"
            onClick={(e) => e.preventDefault()}
          >
            {speaker.linkedin_url && (
              <a
                href={speaker.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {speaker.twitter_url && (
              <a
                href={speaker.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {speaker.github_url && (
              <a
                href={speaker.github_url}
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
    </Link>
  );
}

export function SpeakerDetail() {
  const { id } = useParams<{ id: string }>();
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await speakersApi.getById(id!);
        setSpeaker(data);
      } catch (error) {
        console.error('Error loading speaker:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!speaker) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600">Speaker not found</p>
        <Link to="/speakers" className="text-orange-600 hover:text-orange-700 mt-4">
          Back to Speakers
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${speaker.name} | AWS Community Day 2026`}
        description={speaker.abstract}
        image={speaker.photo_url}
      />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Speakers
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              {speaker.photo_url && (
                <img
                  src={speaker.photo_url}
                  alt={speaker.name}
                  className="w-full rounded-lg shadow-lg mb-4"
                />
              )}
              {(speaker.linkedin_url || speaker.twitter_url || speaker.github_url) && (
                <div className="flex gap-4">
                  {speaker.linkedin_url && (
                    <a
                      href={speaker.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-600 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                  {speaker.twitter_url && (
                    <a
                      href={speaker.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-600 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                  )}
                  {speaker.github_url && (
                    <a
                      href={speaker.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-600 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{speaker.name}</h1>
              <p className="text-lg text-gray-600 mb-1">{speaker.title}</p>
              <p className="text-gray-500 mb-6">{speaker.organization}</p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Talk: {speaker.talk_title}</h2>
                <p className="text-gray-700 mb-4">{speaker.abstract}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2 font-medium text-gray-900">{speaker.talk_length_minutes} minutes</span>
                  </div>
                </div>
              </div>

              {speaker.bio && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About {speaker.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{speaker.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
