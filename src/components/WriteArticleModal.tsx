import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { sanityCreate } from '../sanity/client';

interface WriteArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export default function WriteArticleModal({ isOpen, onClose, onSubmitSuccess }: WriteArticleModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'write' | 'submit'>('write');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !authorName.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + `-${Date.now()}`;

    try {
      await sanityCreate({
        _type: 'article',
        title: title.trim(),
        slug: { _type: 'slug', current: slug },
        summary: content.trim().slice(0, 200) + (content.trim().length > 200 ? '...' : ''),
        type: 'article',
        body: [
          {
            _type: 'block',
            _key: `${Date.now()}-0`,
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: `${Date.now()}-0-0`,
                text: content.trim(),
                marks: [],
              },
            ],
          },
        ],
        author: undefined,
        subject: undefined,
        categories: [],
        tags: ['community-submission'],
        readTime: `${Math.max(1, Math.ceil(content.trim().split(' ').length / 200))} min read`,
        publishedAt: new Date().toISOString(),
        order: 999,
        isFeatured: false,
        isVisible: false,
        submissionType: 'community',
        submitterName: authorName.trim(),
        submitterEmail: email.trim(),
      });

      setSubmitSuccess(true);
      setTitle('');
      setContent('');
      setAuthorName('');
      setEmail('');
      setStep('write');

      setTimeout(() => {
        onClose();
        onSubmitSuccess?.();
      }, 1500);
    } catch (err) {
      console.error('Error submitting article:', err);
      setSubmitError('Failed to submit your essay. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setAuthorName('');
    setEmail('');
    setStep('write');
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-serif text-2xl text-agora-dark">Write a Community Essay</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="p-6">
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="font-medium">Thank you! Your essay has been submitted for review.</span>
              </div>
              <p className="text-sm mt-1">Our team will review and publish it soon.</p>
            </div>
          )}

          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="font-medium">{submitError}</span>
              </div>
            </div>
          )}

          {step === 'write' && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-agora-dark mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Your essay title"
                    className="w-full px-4 py-3 border border-agora-border rounded-lg focus:outline-none focus:ring-2 focus:ring-agora-accent/30 font-serif text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-agora-dark mb-2">
                    Your Essay
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your perspective on arts, humanities, and society..."
                    rows={12}
                    className="w-full px-4 py-3 border border-agora-border rounded-lg focus:outline-none focus:ring-2 focus:ring-agora-accent/30 resize-none font-serif text-base leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (title.trim() && content.trim()) setStep('submit');
                      else alert('Please enter a title and content first.');
                    }}
                    disabled={isSubmitting || !title.trim() || !content.trim()}
                    className="px-6 py-2.5 text-sm font-medium bg-agora-primary text-white rounded-lg hover:bg-agora-dark transition-colors disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 'submit' && (
            <>
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg text-agora-dark mb-2">Submit Your Essay</h3>
                  <p className="text-sm text-agora-muted mb-4">
                    Enter your name and email to submit. Your essay will be reviewed before publishing.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-agora-dark mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-agora-border rounded-lg focus:outline-none focus:ring-2 focus:ring-agora-accent/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-agora-dark mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-agora-border rounded-lg focus:outline-none focus:ring-2 focus:ring-agora-accent/30"
                  />
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-xs text-slate-600">
                    By submitting, you agree that your essay may be published on Agora after review. 
                    Your name will be attributed to the submission. You may be contacted regarding your submission.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setStep('write')}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !authorName.trim() || !email.trim() || !title.trim() || !content.trim()}
                    className="px-6 py-2.5 text-sm font-medium bg-agora-primary text-white rounded-lg hover:bg-agora-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Essay
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
