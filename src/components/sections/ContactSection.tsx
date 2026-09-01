import React from 'react';
import { ProfileData, ContactMessage } from '../../types';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  MapPin, 
  ShieldCheck
} from 'lucide-react';

interface ContactSectionProps {
  profile: ProfileData;
  onSendMessage?: (msg: ContactMessage) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile
}) => {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-800 text-xs font-bold mb-2 border border-purple-200/80">
          <Mail className="w-3.5 h-3.5" />
          Direct Contacts & Channels
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Let’s Connect & Build Together
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mt-1">
          Open to software engineering opportunities, AI automation initiatives, full-stack systems engineering, and research collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information & Official Channels */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 shadow-sm space-y-6 bg-white/80">
          <h3 className="font-extrabold text-slate-900 text-lg">
            Direct Contact Details
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center gap-3 p-3.5 rounded-2xl glass-button text-slate-800 hover:text-purple-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-purple-200/80">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-semibold uppercase">Email Direct</div>
                <div className="font-bold">{profile.contact.email}</div>
              </div>
            </a>

            <a
              href={`tel:${profile.contact.phone}`}
              className="flex items-center gap-3 p-3.5 rounded-2xl glass-button text-slate-800 hover:text-purple-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-purple-200/80">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-semibold uppercase">Call / WhatsApp</div>
                <div className="font-bold">{profile.contact.phone}</div>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl glass-button text-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 border border-purple-200/80">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-semibold uppercase">Location</div>
                <div className="font-bold">{profile.contact.location}</div>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Official Profiles
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a
                id="contact-github-link"
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl glass-button text-purple-950 hover:text-purple-700 text-xs font-bold transition-all shadow-sm"
              >
                <Github className="w-4 h-4 text-purple-700" />
                <span>GitHub</span>
              </a>

              <a
                id="contact-linkedin-link"
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Academic & Industry References Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 shadow-sm space-y-4 bg-white/80">
          <div className="font-bold text-slate-900 flex items-center gap-2 text-base">
            <ShieldCheck className="w-5 h-5 text-purple-700" />
            <span>Academic & Industry References</span>
          </div>
          <p className="text-xs text-slate-600">
            Verified academic mentors and workplace supervisors from official documentation.
          </p>
          <div className="space-y-3 pt-2">
            {profile.references.map((ref) => (
              <div key={ref.id} className="p-3.5 rounded-2xl glass-panel-subtle border border-purple-200/70 hover:border-purple-300 transition-colors bg-white/90">
                <div className="font-bold text-slate-900 text-sm">{ref.name}</div>
                <div className="text-xs text-purple-800 font-medium">{ref.role}</div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  {ref.phone} • {ref.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
