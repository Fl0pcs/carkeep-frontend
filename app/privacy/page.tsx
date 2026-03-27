import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(196,181,253,0.10),_transparent_25%),linear-gradient(180deg,_#eef4fb_0%,_#e8f0f8_55%,_#eef4fb_100%)] px-6 py-12 text-slate-800 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.15),_transparent_25%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#020617_100%)] dark:text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to app
        </Link>

        <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 dark:bg-white/10">
              <Shield className="h-6 w-6 text-slate-700 dark:text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-white/60">
                How CarKeep collects, uses, and protects your information.
              </p>
            </div>
          </div>

          <div className="space-y-6 leading-7 text-slate-700 dark:text-white/80">
            <section>
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                1. Information We Collect
              </h2>
              <p>
                We may collect your email address, car information, maintenance
                records, mileage data, and any other details you choose to add
                inside the app.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                2. How We Use Information
              </h2>
              <p>
                We use your information to operate the service, store your car
                history, improve the experience, and provide core product
                functionality.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                3. Data Storage
              </h2>
              <p>
                Your data is stored using third-party infrastructure providers
                such as Supabase.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                4. Data Sharing
              </h2>
              <p>
                We do not sell your personal data. We only use the service
                providers needed to run the app.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                5. Your Rights
              </h2>
              <p>
                You may request access to or deletion of your data by contacting
                us.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                6. Contact
              </h2>
              <p>For privacy questions, contact: support@carkeep.app</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}